# Documento de Diseño UIX - Autobuses Wampis

## 1. Paleta de Colores

| Color | Código | Uso |
|-------|--------|-----|
| Primario | `#1a1a1a` | Fondo y encabezado |
| Secundario | `#FF6B35` | Botones y acentos |
| Texto | `#333333` | Texto principal |
| Fondo | `#FFFFFF` | Fondo blanco |
| Error | `#E74C3C` | Mensajes de error |
| Éxito | `#27AE60` | Mensajes de éxito |

## 2. Tipografía

- **Fuente principal:** Sistema por defecto (Arial, Helvetica, sans-serif)
- **Heading 1:** 32px, bold (Hero)
- **Heading 2:** 24px, bold (Secciones)
- **Heading 3:** 18px, bold (Subsecciones)
- **Párrafo:** 14px, regular
- **Pequeño:** 12px, regular

## 3. Estructura General

```
┌─────────────────────────────────────────┐
│ ENCABEZADO (Topbar)                     │
│ Logo "W" + Navegación                   │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ SECCIÓN HERO                            │
│ "Tu próximo destino empieza aquí"       │
│ Descripción breve + 04 rutas disponibles│
└─────────────────────────────────────────┘

┌────────────────────┬──────────────────┐
│ PANEL IZQUIERDO    │ PANEL DERECHO    │
│ Elige tu ruta      │ Reserva Rápida   │
│ - Lista de rutas   │ - Cantidad       │
│ - Seleccionar      │ - Resumen        │
│                    │ - Comprar        │
└────────────────────┴──────────────────┘

┌─────────────────────────────────────────┐
│ TICKET (Mostrado después de comprar)    │
│ Folio, Viaje, Boletos, Total Pagado     │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ FOOTER                                  │
│ © Autobuses Wampis | Hecho para viajar │
└─────────────────────────────────────────┘
```

## 4. Componentes Principales

### Topbar (Encabezado)
- Altura: 60px
- Fondo: Oscuro (#1a1a1a)
- Contenido:
  - Logo: "W" + "Wampis" + "Viaja a tu ritmo"
  - Navegación: "Rutas" | "API"
- Posición: Fixed, sticky top

### Hero Section
- Altura: 400px
- Fondo: Gradiente o color sólido
- Contenido:
  - Título H1 centrado
  - Descripción de servicios
  - Indicador de rutas disponibles (04)

### Route Panel (Izquierda)
- Ancho: 60% en escritorio
- Lista de rutas con:
  - Origen y destino
  - Precio
  - Duración
  - Botón para seleccionar

### Checkout Panel (Derecha)
- Ancho: 40% en escritorio
- Sticky scroll
- Contiene:
  - Label: "RESERVA RÁPIDA"
  - Título: "Completa tu viaje"
  - Control de cantidad (-, número, +)
  - Resumen: Ruta, Precio unitario, Total
  - Botón "Comprar boletos"
  - Área de mensajes

### Ticket Section
- Solo visible después de compra
- Muestra:
  - Título: "COMPRA CONFIRMADA"
  - Subtítulo: "Tu boleto está listo"
  - Detalles: Folio, Viaje, Boletos, Total
  - Diseño de tarjeta estilo comprobante

### Footer
- Altura: 60px
- Fondo: Oscuro
- Contenido: Copyright y slogan

## 5. Responsive Design

### Desktop (≥1024px)
- Layout: 2 columnas (60% - 40%)
- Topbar fijo
- Checkout sticky

### Tablet (768px - 1023px)
- Layout: Flexible
- Checkout debajo
- Rutas con scroll horizontal

### Mobile (<768px)
- Layout: 1 columna
- Full width
- Topbar compacto
- Botones más grandes
- Scroll vertical

## 6. Estados de Interfaz

### Estado Inicial
- Lista de rutas cargando
- Botón "Comprar" deshabilitado
- Total en $0.00
- Mensaje: "Conectando..."

### Estado Seleccionado
- Ruta resaltada
- Total calculado
- Botón "Comprar" habilitado
- Cantidad modifiable

### Estado Cargando
- Spinner/Loader
- Mensaje: "Procesando..."

### Estado Éxito
- Ticket visible
- Mensaje verde: "¡Compra exitosa!"
- Detalles del ticket

### Estado Error
- Mensaje rojo: "Error en la compra"
- Opción para reintentar
- Formulario visible para corrección

## 7. Interacciones

### Seleccionar Ruta
1. Usuario hace clic en una ruta
2. Ruta se destaca (border o fondo)
3. Panel derecho actualiza con precio
4. Total se calcula automáticamente

### Cambiar Cantidad
1. Usuario presiona + o -
2. Número en input cambia
3. Total se recalcula en tiempo real
4. Botón "Comprar" se habilita/deshabilita

### Comprar Boletos
1. Usuario presiona "Comprar boletos"
2. Spinne de carga
3. Si éxito → Mostrar ticket
4. Si error → Mostrar mensaje y mantener formulario

## 8. Accesibilidad

- ✅ Contraste suficiente (WCAG AA)
- ✅ Labels claros en inputs
- ✅ Botones con aria-label
- ✅ Colores no como único indicador
- ✅ Navegación con teclado
- ✅ Focus visible en elementos interactivos

## 9. Animaciones

- **Fade-in:** Elementos al cargar
- **Hover:** Cambio de color/escala en botones
- **Transiciones:** 0.3s ease-in-out
- **Loading spinner:** Rotación continua

## 10. Prototipo Visual

```
┌─────────────────────────────────────────┐
│ W Wampis          Rutas    API          │ <- Topbar (60px)
├─────────────────────────────────────────┤
│                                         │
│  Tu próximo destino empieza aquí        │
│  Compra boletos de forma rápida...      │
│                              04 rutas   │ <- Hero (400px)
│                                         │
├──────────────────────┬──────────────────┤
│ PASO 01              │ RESERVA RÁPIDA   │
│ Elige tu ruta        │ Completa tu viaje│
│                      │                  │
│ • CDMX - Cuernavaca  │ Cantidad: 1 [^  ]│
│   $150 · 1h30min     │ Ruta: [seleccionar]
│ • CDMX - Veracruz    │ Precio: $0.00    │
│   $500 · 5h          │ TOTAL: $0.00     │
│ • CDMX - Toluca      │                  │
│   $300 · 2h          │ [Comprar →]      │
│ • CDMX - Puebla      │                  │
│   $250 · 2h30min     │                  │
│                      │                  │
├──────────────────────┴──────────────────┤
│ COMPRA CONFIRMADA (oculto inicialmente) │
│ Tu boleto está listo                    │
│ Folio 1 | Viaje CDMX-Cuernavaca | ...   │
├─────────────────────────────────────────┤
│ © Autobuses Wampis | Hecho para viajar  │ <- Footer
└─────────────────────────────────────────┘
```

## 11. Guía de Marca

- **Nombre:** Autobuses Wampis
- **Lema:** "Viaja a tu ritmo"
- **Línea gráfica:** Minimalista y moderna
- **Tono:** Profesional y amigable
