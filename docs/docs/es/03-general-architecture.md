# Arquitectura general

Angry Pixel Engine está diseñado con una arquitectura moderna basada en **Entity-Component-System (ECS)**. Este enfoque separa claramente los datos (_componentes_) de la lógica (_sistemas_), lo que permite una alta flexibilidad, escalabilidad y un desarrollo más ordenado.

## Entidades

Las **entidades** son identificadores únicos que representan objetos del juego (jugadores, enemigos, proyectiles, etc.).  
Por sí solas, no contienen datos ni lógica.  
Las entidades adquieren comportamiento al combinar componentes.

## Componentes

Los **componentes** son estructuras de datos que almacenan información sobre el estado o las características de una entidad.  
Los componentes no contienen lógica.

Ejemplo de un componente personalizado:

```typescript
class Player {
    health = 100;
    mana = 50;
}
```

## Crear una entidad

Para crear una entidad con el componente `Player`:

```typescript
entityManager.createEntity([new Player()]);
```

## Sistemas

Los **sistemas** contienen la lógica que opera sobre las entidades y sus componentes.

Un sistema se crea extendiendo la clase `GameSystem` e implementando el método `onUpdate`.  
Dentro de este método, puedes buscar entidades que tengan componentes específicos y aplicar la lógica deseada.

Ejemplo de un sistema que procesa todas las entidades con el componente `Player`:

```typescript
import { GameSystem } from "angry-pixel";

class PlayerSystem extends GameSystem {
    onUpdate() {
        this.entityManager.search(Player).forEach(({ entity, component }) => {
            // Aquí va la lógica para cada jugador
            // Por ejemplo, regenerar maná:
            component.mana = Math.min(component.mana + 1, 50);
        });
    }
}
```

> **Nota**: Los sistemas personalizados como `PlayerSystem` se ejecutan por defecto en el [Game Logic Loop](#lógica-de-juego-game-logic-loop).

## Entity-Component-System (ECS) en resumen

-   **Entidades**: Identificadores únicos que agrupan componentes.
-   **Componentes**: Datos puros, sin lógica.
-   **Sistemas**: Lógica que opera sobre los componentes.

Esta separación permite combinar componentes de distintas maneras para crear comportamientos complejos sin dependencias rígidas.

## Game Loop trifásico

El motor ejecuta su ciclo de actualización (game loop) dividido en tres fases:

### Lógica de juego (Game Logic Loop)

Corre a 60 FPS. Aquí se ejecutan los sistemas relacionados con el gameplay: entrada del usuario, audio, animaciones, lógica personalizada, etc.  
Los sistemas creados por el usuario se ejecutan aquí por defecto.

### Físicas (Physics Loop)

Corre a su propia velocidad fija. Aquí se ejecutan los sistemas relacionados con la detección de colisiones y las respuestas físicas. El componente `Transform` también se actualiza en esta fase.

### Renderizado (Rendering Loop)

Corre sincronizado con la frecuencia de actualización del monitor (VSync). Aquí se ejecutan los sistemas de renderizado y cámara.

Además, los usuarios pueden optar por que sus sistemas se ejecuten en el **Physics Loop** o justo antes del renderizado (**Pre-render**) usando _decorators_.

---

Esta arquitectura permite desarrollar juegos complejos con una estructura limpia, modular y fácil de mantener.
