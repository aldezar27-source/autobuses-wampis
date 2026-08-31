# Autobuses Wampis - Sistema de Venta de Boletos

## 📋 Índice

1. [Planteamiento del Problema](#planteamiento-del-problema)
2. [Objetivo General](#objetivo-general)
3. [Objetivos Específicos](#objetivos-específicos)
4. [Descripción General](#descripción-general)
5. [Características](#características)
6. [Tecnologías Utilizadas](#tecnologías-utilizadas)
7. [Estructura del Proyecto](#estructura-del-proyecto)
8. [Instalación y Configuración](#instalación-y-configuración)
9. [Uso](#uso)
10. [Documentación](#documentación)
11. [Base de Datos](#base-de-datos)
12. [API REST](#api-rest)
13. [Autores](#autores)

---

## Planteamiento del Problema

La venta de boletos de autobús actualmente requiere que los usuarios se trasladen a las oficinas físicas de Autobuses Wampis para comprar sus boletos, lo que genera:

- ⏳ Pérdida de tiempo en desplazamientos
- 👥 Saturación en las oficinas
- 💰 Costos operacionales elevados
- 🌍 Limitación geográfica para potenciales clientes

**Solución propuesta:** Desarrollar una plataforma web que permita a los usuarios consultar rutas disponibles y comprar boletos en línea desde cualquier lugar y en cualquier momento.

---

## Objetivo General

Implementar un sistema web para la venta de boletos de transporte terrestre de Autobuses Wampis que facilite el acceso a la información de rutas y permita a los usuarios realizar compras en línea de manera ágil, segura y transparente.

---

## Objetivos Específicos

1. **Permitir consulta de rutas:**
   - Los usuarios pueden visualizar todas las rutas disponibles
   - Información incluye: origen, destino, precio y duración
   - Actualización en tiempo real

2. **Facilitar la compra de boletos:**
   - Interfaz intuitiva para seleccionar ruta y cantidad
   - Cálculo automático del total
   - Confirmación inmediata de la compra

3. **Generar comprobantes digitales:**
   - Folio único para cada compra
   - Información completa de la transacción
   - Disponibilidad inmediata

4. **Reducir carga operacional:**
   - Disminuir congestionamiento en oficinas
   - Automatizar procesos de venta
   - Generar reportes automáticos

5. **Garantizar disponibilidad:**
   - Acceso 24/7 desde cualquier navegador
   - Respuesta rápida del sistema
   - Manejo robusto de errores

---

## Descripción General

**Autobuses Wampis** es una aplicación web desarrollada con **FastAPI** (Python) que permite a los usuarios:

- Consultar rutas de autobús disponibles
- Seleccionar cantidad de boletos
- Procesar compras en línea
- Recibir comprobante digital inmediato

La aplicación utiliza una base de datos SQLite/MySQL para almacenar información de rutas y transacciones.

### Flujo Principal

```
Usuario accede a web
       ↓
Visualiza rutas disponibles (GET /rutas)
       ↓
Selecciona ruta y cantidad de boletos
       ↓
Presiona "Comprar"
       ↓
Servidor valida datos (POST /comprar)
       ↓
Registra compra en BD
       ↓
Devuelve comprobante con folio
       ↓
Usuario ve su boleto confirmado
```

---

## Características

✅ **Interfaz moderna y responsive** - Funciona en desktop, tablet y mobile
✅ **Consulta de rutas en tiempo real** - Información actualizada
✅ **Compra segura** - Validación de datos en backend
✅ **Comprobante digital** - Folio único e inmediato
✅ **Base de datos relacional** - SQLite o MySQL
✅ **API documentada** - Swagger/OpenAPI disponible
✅ **Manejo de errores** - Respuestas claras al usuario
✅ **Control de cantidad** - Mínimo 1, máximo 10 boletos

---

## Tecnologías Utilizadas

### Backend
- **FastAPI** - Framework web moderno y rápido
- **Uvicorn** - Servidor ASGI
- **Pydantic** - Validación de datos
- **MySQL Connector / SQLite** - Base de datos

### Frontend
- **HTML 5** - Estructura
- **CSS 3** - Estilos modernos
- **JavaScript vanilla** - Interactividad
- **Fetch API** - Comunicación con servidor

### Herramientas
- **Python 3.8+** - Lenguaje de programación
- **Git** - Control de versiones
- **GitHub** - Repositorio

---

## Estructura del Proyecto

```
autobuses-wampis/
│
├── main.py                      # Aplicación FastAPI principal
├── database.sql                 # Script de creación de BD
├── wampis.db                    # Base de datos SQLite
│
├── static/                      # Archivos estáticos
│   ├── index.html              # Página principal
│   ├── styles.css              # Estilos CSS
│   └── app.js                  # Lógica JavaScript
│
├── DIAGRAMAS.md                 # Diagramas ER, UML, flujos
├── API_DOCUMENTATION.md         # Documentación de API
├── UIX_DESIGN.md               # Guía de diseño
├── MANUAL_USUARIO.md           # Manual de usuario
├── README.md                    # Este archivo
└── .gitignore                   # Archivos a ignorar en Git
```

---

## Instalación y Configuración

### Requisitos Previos
- Python 3.8 o superior
- pip (gestor de paquetes de Python)
- Navegador web moderno

### Paso 1: Clonar el repositorio

```bash
git clone https://github.com/aldezar27-source/autobuses-wampis.git
cd autobuses-wampis
```

### Paso 2: Crear entorno virtual (opcional pero recomendado)

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### Paso 3: Instalar dependencias

```bash
pip install fastapi uvicorn mysql-connector-python
```

### Paso 4: Ejecutar la aplicación

```bash
python -m uvicorn main:app --reload
```

Verás:
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
```

### Paso 5: Acceder a la aplicación

Abre tu navegador en: `http://127.0.0.1:8000/`

---

## Uso

### Como Usuario Final

1. Abre la aplicación en tu navegador
2. Visualiza las rutas disponibles
3. Selecciona una ruta haciendo clic
4. Elige la cantidad de boletos (1-10)
5. Presiona "Comprar boletos"
6. Recibe tu comprobante con folio único

### Como Desarrollador

**Acceder a la documentación interactiva (Swagger):**
```
http://127.0.0.1:8000/docs
```

**Acceder a la documentación alternativa (ReDoc):**
```
http://127.0.0.1:8000/redoc
```

---

## Documentación

### 📊 Diagramas
Ver: [DIAGRAMAS.md](DIAGRAMAS.md)
- Diagrama Entidad-Relación
- Diagrama de Flujo
- Diagrama de Arquitectura
- Diagrama UML
- Diagramas de Secuencia

### 🔌 API REST
Ver: [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- Endpoints disponibles
- Parámetros y respuestas
- Códigos de error
- Ejemplos de uso

### 🎨 Diseño UIX
Ver: [UIX_DESIGN.md](UIX_DESIGN.md)
- Paleta de colores
- Tipografía
- Componentes
- Responsive design
- Accesibilidad

### 📖 Manual de Usuario
Ver: [MANUAL_USUARIO.md](MANUAL_USUARIO.md)
- Instalación paso a paso
- Guía de uso
- Solución de problemas
- FAQ

---

## Base de Datos

### Tablas

#### rutas
```sql
CREATE TABLE rutas (
    id_ruta INTEGER PRIMARY KEY,
    origen TEXT NOT NULL,
    destino TEXT NOT NULL,
    precio REAL NOT NULL,
    duracion TEXT NOT NULL
);
```

**Datos iniciales:**
| id_ruta | origen | destino | precio | duracion |
|---------|--------|---------|--------|----------|
| 1 | CDMX | Cuernavaca | 150.0 | 1 h 30 min |
| 2 | CDMX | Veracruz | 500.0 | 5 horas |
| 3 | CDMX | Toluca | 300.0 | 2 horas |
| 4 | CDMX | Puebla | 250.0 | 2 h 30 min |

#### tickets
```sql
CREATE TABLE tickets (
    id_ticket INTEGER PRIMARY KEY AUTOINCREMENT,
    id_ruta INTEGER NOT NULL,
    cantidad_boletos INTEGER NOT NULL,
    total REAL NOT NULL
);
```

### Script de Inicialización

Ver: [database.sql](database.sql)

Para crear la BD manualmente:
```bash
sqlite3 wampis.db < database.sql
```

---

## API REST

### Endpoints Principales

#### GET /
Retorna la página HTML principal

#### GET /rutas
Obtiene todas las rutas disponibles

**Respuesta:**
```json
{
  "rutas_disponibles": [
    {
      "id_ruta": 1,
      "origen": "CDMX",
      "destino": "Cuernavaca",
      "precio": 150.0,
      "duracion": "1 h 30 min"
    }
  ]
}
```

#### POST /comprar
Procesa la compra de boletos

**Parámetros:**
```json
{
  "id_ruta": 1,
  "cantidad_boletos": 2
}
```

**Respuesta exitosa:**
```json
{
  "mensaje": "¡Compra exitosa! Gracias por viajar con Autobuses Wampis",
  "ticket": {
    "folio": 1,
    "origen": "CDMX",
    "destino": "Cuernavaca",
    "cantidad_boletos": 2,
    "precio_unitario": 150.0,
    "total_pagado": 300.0
  }
}
```

Ver documentación completa en: [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

---

## Autores

**Estudiante:** Aldebaran Duran (aldezar27)

**Unidad de Aprendizaje:** Sistemas de Información Web

**Institución:** [Tu institución]

**Fecha:** Agosto 2026

---

## Licencia

Este proyecto se proporciona con fines educativos.

---

## Contacto

📧 Email: aldezar27@gmail.com
🔗 GitHub: https://github.com/aldezar27-source/autobuses-wampis

---

**¡Bienvenido a Autobuses Wampis! Viaja a tu ritmo.** ✈️🚌
