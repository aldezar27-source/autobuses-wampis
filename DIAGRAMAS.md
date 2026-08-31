# Diagramas - Autobuses Wampis

## Diagrama Entidad-Relación (ER)

```mermaid
erDiagram
    RUTAS ||--o{ TICKETS : "tiene"
    
    RUTAS {
        int id_ruta PK
        string origen
        string destino
        float precio
        string duracion
    }
    
    TICKETS {
        int id_ticket PK
        int id_ruta FK
        int cantidad_boletos
        float total
    }
```

## Diagrama de Flujo - Proceso de Compra

```mermaid
flowchart TD
    A["Inicio"] --> B["Usuario abre la aplicación"]
    B --> C["Sistema carga lista de rutas"]
    C --> D["Usuario selecciona ruta"]
    D --> E["Usuario ingresa cantidad de boletos"]
    E --> F["Sistema calcula total"]
    F --> G["Usuario presiona Comprar"]
    G --> H["Sistema valida ruta y cantidad"]
    H --> I{¿Datos válidos?}
    I -->|No| J["Mostrar error"]
    J --> D
    I -->|Sí| K["Insertar ticket en BD"]
    K --> L["Mostrar comprobante"]
    L --> M["Fin"]
```

## Diagrama de Arquitectura

```mermaid
graph TB
    Cliente["🌐 Cliente Web<br/>HTML/CSS/JS"]
    API["⚙️ FastAPI<br/>Backend"]
    BD["🗄️ Base de Datos<br/>SQLite/MySQL"]
    Static["📁 Archivos estáticos<br/>CSS, JS, HTML"]
    
    Cliente -->|HTTP| API
    API -->|SQL| BD
    API -->|Sirve| Static
    Cliente -->|Carga| Static
```

## Diagrama UML - Clases

```mermaid
classDiagram
    class FastAPI {
        +mount()
        +get()
        +post()
    }
    
    class Ruta {
        +id_ruta: int
        +origen: str
        +destino: str
        +precio: float
        +duracion: str
    }
    
    class Ticket {
        +id_ticket: int
        +id_ruta: int FK
        +cantidad_boletos: int
        +total: float
    }
    
    class CompraBoleto {
        +id_ruta: int
        +cantidad_boletos: int
    }
    
    FastAPI --> Ruta
    FastAPI --> Ticket
    FastAPI --> CompraBoleto
```

## Diagrama de Secuencia - Consultar Rutas

```mermaid
sequenceDiagram
    participant Usuario
    participant Navegador
    participant Servidor as FastAPI
    participant BD as Base de Datos
    
    Usuario->>Navegador: Abre la aplicación
    Navegador->>Servidor: GET /rutas
    Servidor->>BD: SELECT * FROM rutas
    BD-->>Servidor: Datos de rutas
    Servidor-->>Navegador: JSON con rutas
    Navegador-->>Usuario: Muestra rutas disponibles
```

## Diagrama de Secuencia - Comprar Boletos

```mermaid
sequenceDiagram
    participant Usuario
    participant Navegador
    participant Servidor as FastAPI
    participant BD as Base de Datos
    
    Usuario->>Navegador: Selecciona ruta y cantidad
    Navegador->>Navegador: Calcula total
    Usuario->>Navegador: Presiona Comprar
    Navegador->>Servidor: POST /comprar
    Servidor->>BD: SELECT * FROM rutas WHERE id=X
    BD-->>Servidor: Datos de ruta
    Servidor->>BD: INSERT INTO tickets (...)
    BD-->>Servidor: Ticket insertado
    Servidor-->>Navegador: JSON con comprobante
    Navegador-->>Usuario: Muestra comprobante
```
