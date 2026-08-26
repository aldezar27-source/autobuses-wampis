from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field
import mysql.connector
import sqlite3

app = FastAPI(
    title="API Autobuses Wampis",
    description="Sistema web para venta de boletos de Autobuses Wampis",
    version="1.0.0",
)

app.mount("/static", StaticFiles(directory="static"), name="static")

DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "autobuses_wampis",
}


def obtener_conexion():
    try:
        return mysql.connector.connect(**DB_CONFIG)
    except mysql.connector.Error:
        conexion = sqlite3.connect("wampis.db")
        conexion.row_factory = sqlite3.Row
        conexion.executescript(
            """
            CREATE TABLE IF NOT EXISTS rutas (
                id_ruta INTEGER PRIMARY KEY,
                origen TEXT NOT NULL,
                destino TEXT NOT NULL,
                precio REAL NOT NULL,
                duracion TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS tickets (
                id_ticket INTEGER PRIMARY KEY AUTOINCREMENT,
                id_ruta INTEGER NOT NULL,
                cantidad_boletos INTEGER NOT NULL,
                total REAL NOT NULL
            );
            INSERT OR IGNORE INTO rutas VALUES
                (1, 'CDMX', 'Cuernavaca', 150, '1 h 30 min'),
                (2, 'CDMX', 'Veracruz', 500, '5 horas'),
                (3, 'CDMX', 'Toluca', 300, '2 horas'),
                (4, 'CDMX', 'Puebla', 250, '2 h 30 min');
            """
        )
        conexion.commit()
        return conexion


class CompraBoleto(BaseModel):
    id_ruta: int
    cantidad_boletos: int = Field(gt=0)


@app.get("/", include_in_schema=False)
def inicio():
    return FileResponse("static/index.html")


@app.get("/rutas", tags=["Rutas"])
def ver_rutas():
    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True) if conexion.__class__.__module__.startswith("mysql") else conexion.cursor()
    try:
        cursor.execute("SELECT * FROM rutas")
        return {"rutas_disponibles": cursor.fetchall()}
    finally:
        cursor.close()
        conexion.close()


@app.post("/comprar", tags=["Ventas"])
def comprar_boleto(compra: CompraBoleto):
    conexion = obtener_conexion()
    usa_mysql = conexion.__class__.__module__.startswith("mysql")
    cursor = conexion.cursor(dictionary=True) if usa_mysql else conexion.cursor()
    try:
        marcador = "%s" if usa_mysql else "?"
        cursor.execute(
            f"SELECT * FROM rutas WHERE id_ruta = {marcador}",
            (compra.id_ruta,),
        )
        ruta = cursor.fetchone()

        if not ruta:
            raise HTTPException(status_code=404, detail="Ruta no encontrada")

        precio = float(ruta["precio"])
        total = precio * compra.cantidad_boletos
        cursor.execute(
            f"INSERT INTO tickets (id_ruta, cantidad_boletos, total) VALUES ({marcador}, {marcador}, {marcador})",
            (compra.id_ruta, compra.cantidad_boletos, total),
        )
        conexion.commit()

        return {
            "mensaje": "¡Compra exitosa! Gracias por viajar con Autobuses Wampis",
            "ticket": {
                "folio": cursor.lastrowid,
                "origen": ruta["origen"],
                "destino": ruta["destino"],
                "cantidad_boletos": compra.cantidad_boletos,
                "precio_unitario": precio,
                "total_pagado": total,
            },
        }
    finally:
        cursor.close()
        conexion.close()
