# Arquitectura

Angry Pixel Engine se construye en torno al patrón **Entidad-Componente-Sistema (ECS)**.

## Qué es ECS

ECS es un patrón de arquitectura que separa los datos de la lógica mediante tres conceptos:

- Las **entidades** son identificadores que representan objetos del juego.
- Los **componentes** son datos asociados a las entidades. Contienen estado, pero no lógica.
- Los **sistemas** son la lógica que opera sobre las entidades a través de sus componentes.

El comportamiento surge de la combinación de los componentes de una entidad y los sistemas que actúan sobre ellos, en lugar de la herencia.

## Jerarquía

El motor se organiza en la siguiente jerarquía:

```
Game
└── Scene
    ├── Systems
    └── Entities
        └── Components
```

### Game

La clase `Game` es el punto de entrada. Un juego es una única instancia de `Game`, creada a partir de un objeto de configuración (elemento contenedor, resolución, ajustes de física y colisiones, y opciones similares).

Contiene las escenas y dependencias, y controla el bucle de juego mediante sus métodos `start` y `stop`.

### Scene

Una `Scene` es una parte autónoma del juego, como un nivel, un menú o una pantalla de carga. Un juego puede registrar una o más escenas, y solo una escena está activa a la vez.

Cada escena define los sistemas que ejecuta, los recursos que carga y las entidades que crea cuando se activa.

### Entity

Una entidad es un identificador único. Por sí misma no contiene datos ni lógica; obtiene estado y comportamiento de los componentes que se le asocian.

### Component

Un componente es un contenedor de datos asociado a una entidad. Los componentes almacenan estado y no contienen lógica. El conjunto de componentes de una entidad define lo que es.

### System

Un sistema contiene lógica. Consulta las entidades que tienen un determinado conjunto de componentes y opera sobre ellas. Un sistema ejecuta su lógica en cada frame y puede reaccionar a eventos del ciclo de vida como la creación, destrucción, activación y desactivación.

## Bucle de juego

El motor ejecuta su ciclo de actualización en tres fases:

- **Lógica de juego**: sistemas de jugabilidad como entrada, audio, animación y lógica personalizada.
- **Física**: detección de colisiones y resolución física. El componente `Transform` se actualiza en esta fase.
- **Renderizado**: sistemas de renderizado y cámara.

Los sistemas personalizados se ejecutan por defecto en la fase de lógica de juego y pueden asignarse a las fases de física o pre-renderizado.
