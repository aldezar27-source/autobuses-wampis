# Documentación de API - Autobuses Wampis

## Descripción General

API REST para la venta de boletos de autobuses desarrollada con **FastAPI**.

**URL Base:** `http://127.0.0.1:8000`

**Documentación interactiva:** `http://127.0.0.1:8000/docs`

## Endpoints

### 1. Obtener Página Principal

**Endpoint:** `GET /`

**Descripción:** Retorna la página HTML principal.

**Respuesta:** HTML (status 200)

---

### 2. Obtener Todas las Rutas

**Endpoint:** `GET /rutas`

**Descripción:** Retorna la lista de todas las rutas disponibles.

**Parámetros:** Ninguno

**Respuesta Exitosa (200):**
```json
{
  "rutas_disponibles": [
    {
      "id_ruta": 1,
      "origen": "CDMX",
      "destino": "Cuernavaca",
      "precio": 150.0,
      "duracion": "1 h 30 min"
    },
    {
      "id_ruta": 2,
      "origen": "CDMX",
      "destino": "Veracruz",
      "precio": 500.0,
      "duracion": "5 horas"
    },
    {
      "id_ruta": 3,
      "origen": "CDMX",
      "destino": "Toluca",
      "precio": 300.0,
      "duracion": "2 horas"
    },
    {
      "id_ruta": 4,
      "origen": "CDMX",
      "destino": "Puebla",
      "precio": 250.0,
      "duracion": "2 h 30 min"
    }
  ]
}
```

**Errores:** Ninguno

---

### 3. Comprar Boletos

**Endpoint:** `POST /comprar`

**Descripción:** Procesa la compra de boletos para una ruta específica.

**Parámetros (Body - JSON):**
```json
{
  "id_ruta": 1,
  "cantidad_boletos": 2
}
```

**Validaciones:**
- `id_ruta`: Debe existir en la tabla `rutas`
- `cantidad_boletos`: Debe ser mayor que 0, máximo 10

**Respuesta Exitosa (200):**
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

**Errores:**

- **404 - Ruta no encontrada:**
```json
{
  "detail": "Ruta no encontrada"
}
```

- **422 - Validación fallida:**
```json
{
  "detail": [
    {
      "loc": ["body", "cantidad_boletos"],
      "msg": "ensure this value is greater than 0",
      "type": "value_error.number.not_gt"
    }
  ]
}
```

---

## Modelos de Datos

### Ruta
```json
{
  "id_ruta": "integer (PK)",
  "origen": "string",
  "destino": "string",
  "precio": "float",
  "duracion": "string"
}
```

### Ticket
```json
{
  "id_ticket": "integer (PK, autoincrement)",
  "id_ruta": "integer (FK)",
  "cantidad_boletos": "integer",
  "total": "float"
}
```

### CompraBoleto (Request)
```json
{
  "id_ruta": "integer (requerido)",
  "cantidad_boletos": "integer (requerido, > 0)"
}
```

---

## Códigos de Estado HTTP

| Código | Significado |
|--------|------------|
| 200 | OK - Solicitud exitosa |
| 304 | Not Modified - Recurso sin cambios |
| 404 | Not Found - Ruta no encontrada |
| 422 | Unprocessable Entity - Datos inválidos |
| 500 | Internal Server Error - Error del servidor |

---

## Ejemplos de Uso

### Con cURL

**Obtener rutas:**
```bash
curl -X GET "http://127.0.0.1:8000/rutas"
```

**Comprar boletos:**
```bash
curl -X POST "http://127.0.0.1:8000/comprar" \
  -H "Content-Type: application/json" \
  -d '{"id_ruta": 1, "cantidad_boletos": 2}'
```

### Con Python (requests)

```python
import requests

# Obtener rutas
response = requests.get("http://127.0.0.1:8000/rutas")
rutas = response.json()
print(rutas)

# Comprar boletos
data = {
    "id_ruta": 1,
    "cantidad_boletos": 2
}
response = requests.post("http://127.0.0.1:8000/comprar", json=data)
compra = response.json()
print(compra)
```

### Con JavaScript (fetch)

```javascript
// Obtener rutas
fetch('http://127.0.0.1:8000/rutas')
  .then(response => response.json())
  .then(data => console.log(data));

// Comprar boletos
const data = {
  id_ruta: 1,
  cantidad_boletos: 2
};

fetch('http://127.0.0.1:8000/comprar', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
  .then(response => response.json())
  .then(data => console.log(data));
```

---

## Características de Seguridad

- ✅ Validación de entrada (Pydantic)
- ✅ Manejo de errores centralizado
- ✅ Consultas parametrizadas (SQL Injection prevention)
- ✅ Soporte para MySQL y SQLite

---

## Deployments

Para usar la aplicación:

1. **Desarrollo local:**
   ```bash
   python -m uvicorn main:app --reload
   ```

2. **Acceder a la documentación interactiva:**
   ```
   http://127.0.0.1:8000/docs
   ```

3. **Acceder a la aplicación:**
   ```
   http://127.0.0.1:8000/
   ```
