# Manual de Usuario - Autobuses Wampis

## Índice

1. [Introducción](#introducción)
2. [Requisitos del Sistema](#requisitos-del-sistema)
3. [Instalación](#instalación)
4. [Uso de la Aplicación](#uso-de-la-aplicación)
5. [Proceso de Compra](#proceso-de-compra)
6. [Solución de Problemas](#solución-de-problemas)
7. [Preguntas Frecuentes](#preguntas-frecuentes)

---

## Introducción

**Autobuses Wampis** es una plataforma web para la compra de boletos de autobús de forma rápida, clara y segura.

### Características principales:
- ✅ Consulta de rutas disponibles
- ✅ Compra de boletos online
- ✅ Comprobante digital inmediato
- ✅ Interfaz intuitiva y responsive

---

## Requisitos del Sistema

### Para ejecutar localmente:

- **Sistema Operativo:** Windows, macOS o Linux
- **Python:** 3.8 o superior
- **Navegador:** Chrome, Edge, Firefox o Safari reciente
- **RAM:** Mínimo 2GB
- **Conexión:** Acceso a `localhost:8000`

### Paquetes Python requeridos:
```
fastapi
uvicorn
mysql-connector-python
```

---

## Instalación

### Paso 1: Descargar el proyecto

1. Ve a GitHub: https://github.com/aldezar27-source/autobuses-wampis
2. Presiona el botón **Code** → **Download ZIP**
3. Extrae el archivo en tu computadora

O clona con Git:
```bash
git clone https://github.com/aldezar27-source/autobuses-wampis.git
cd autobuses-wampis
```

### Paso 2: Instalar dependencias

Abre PowerShell o Terminal en la carpeta del proyecto:

```powershell
python -m pip install fastapi uvicorn mysql-connector-python
```

### Paso 3: Iniciar el servidor

Escribe en la terminal:

```powershell
python -m uvicorn main:app --reload
```

Deberías ver:
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
```

### Paso 4: Acceder a la aplicación

Abre tu navegador y ve a:

```
http://127.0.0.1:8000/
```

---

## Uso de la Aplicación

### Pantalla Principal

Al abrir la aplicación, verás:

1. **Encabezado (Topbar):**
   - Logo "W Wampis"
   - Links: "Rutas" y "API"

2. **Sección Hero:**
   - Título: "Tu próximo destino empieza aquí"
   - Información sobre el servicio
   - Indicador: "04 rutas disponibles"

3. **Panel de Selección (Izquierda):**
   - Título: "PASO 01 - Elige tu ruta"
   - Lista de 4 rutas disponibles

4. **Panel de Compra (Derecha):**
   - Título: "RESERVA RÁPIDA - Completa tu viaje"
   - Controles y resumen

5. **Pie de página (Footer):**
   - Copyright y slogan

---

## Proceso de Compra

### Paso 1: Seleccionar una ruta

1. En el panel izquierdo, verás las rutas disponibles:
   - CDMX → Cuernavaca ($150 · 1h30min)
   - CDMX → Veracruz ($500 · 5 horas)
   - CDMX → Toluca ($300 · 2 horas)
   - CDMX → Puebla ($250 · 2h30min)

2. Haz clic en la ruta que desees

3. La ruta se destacará en el panel

### Paso 2: Seleccionar cantidad de boletos

1. En el panel derecho ("RESERVA RÁPIDA"), verás el control de cantidad
2. Presiona el botón **+** para aumentar boletos
3. Presiona el botón **−** para disminuir boletos
4. O escribe directamente el número (máximo 10)

### Paso 3: Revisar el resumen

El panel mostrará:
- **Ruta:** Origen → Destino
- **Precio por boleto:** El precio individual
- **Total:** Cantidad × Precio

Ejemplo:
```
Ruta: CDMX - Cuernavaca
Precio por boleto: $150.00
Total: $300.00  (para 2 boletos)
```

### Paso 4: Confirmar compra

1. Presiona el botón **"Comprar boletos →"**
2. Espera a que se procese (verás un indicador de carga)
3. Si todo es correcto, aparecerá tu comprobante

### Paso 5: Ver comprobante

Después de comprar, la página mostrará:

```
COMPRA CONFIRMADA
Tu boleto está listo.

Folio: 1
Viaje: CDMX - Cuernavaca
Boletos: 2
Total pagado: $300.00
```

**Conserva estos datos para tu referencia.**

---

## Solución de Problemas

### Problema 1: "No se puede conectar a http://127.0.0.1:8000"

**Solución:**
1. Verifica que el servidor esté corriendo (deberías ver "Uvicorn running" en la terminal)
2. Presiona Ctrl + C en la terminal y reinicia:
   ```bash
   python -m uvicorn main:app --reload
   ```
3. Espera 3-5 segundos antes de recargar el navegador

### Problema 2: "Módulo no encontrado" (ImportError)

**Solución:**
1. Instala las dependencias nuevamente:
   ```bash
   python -m pip install --upgrade fastapi uvicorn mysql-connector-python
   ```
2. Verifica que estés en la carpeta correcta:
   ```bash
   cd "C:\Users\tu_usuario\Downloads\autobuses-wampis"
   ```

### Problema 3: "Ruta no encontrada" (error 404)

**Solución:**
1. Verifica que hayas seleccionado una ruta
2. Recarga la página (F5)
3. Si persiste, reinicia el servidor

### Problema 4: "Cantidad de boletos inválida"

**Solución:**
1. La cantidad debe ser de 1 a 10 boletos
2. No dejes el campo vacío
3. Solo números, sin texto

### Problema 5: No aparecen las rutas

**Solución:**
1. Verifica la conexión de red (aunque es local)
2. Abre la consola del navegador (F12)
3. Recarga la página
4. Si aún no aparecen, reinicia el servidor

---

## Preguntas Frecuentes

### ¿Cuánto tiempo tarda en procesar una compra?
Menos de 1 segundo. Si tarda más, puede haber un problema con la conexión.

### ¿Dónde se guardan los datos de compra?
Se guardan en la base de datos `wampis.db` ubicada en la carpeta del proyecto.

### ¿Puedo comprar sin internet?
Sí, siempre y cuando el servidor FastAPI esté corriendo localmente.

### ¿Cuántas rutas hay disponibles?
Actualmente hay 4 rutas fijas, todas con salida desde CDMX.

### ¿Puedo modificar una compra después de hacerla?
No. Una vez procesada, la compra es final. Para cambiar, deberías contactar con soporte.

### ¿Hay un límite de compras?
No hay límite en la cantidad de compras que puedas hacer.

### ¿Qué pasa si cierro el navegador después de comprar?
Tu comprobante se muestra en pantalla. Guarda la información si la necesitas.

### ¿Cómo accedo a la documentación técnica del API?
Ve a: `http://127.0.0.1:8000/docs`

Ahí podrás probar todos los endpoints interactivamente.

### ¿Puedo usar esto sin Python?
No. Necesitas Python y FastAPI para ejecutar el servidor.

### ¿Es seguro usar localhost:8000?
Sí, es completamente seguro. Es un servidor local en tu computadora.

---

## Contacto y Soporte

Para reportar problemas o sugerir mejoras:

- 📧 Email: aldezar27@gmail.com
- 🔗 GitHub: https://github.com/aldezar27-source/autobuses-wampis

---

**Última actualización:** Agosto 2026

**Versión:** 1.0

**Desarrollador:** Aldebaran Duran
