# General Architecture

Angry Pixel Engine is designed with a modern architecture based on **Entity-Component-System (ECS)**. This approach clearly separates data (_components_) from logic (_systems_), allowing for high flexibility, scalability, and a cleaner development process.

## Entities

**Entities** are unique identifiers that represent game objects (players, enemies, projectiles, etc.).  
By themselves, entities do not contain data or logic.  
Entities gain behavior by combining components.

## Components

**Components** are data structures that store information about an entity’s state or characteristics.  
Components do not contain logic.

Example of a custom component:

"""typescript
class Player {
health = 100;
mana = 50;
}
"""

## Creating an entity

To create an entity with the `Player` component:

"""typescript
entityManager.createEntity([
new Player()
]);
"""

## Systems

**Systems** contain the logic that operates on entities and their components.

A system is created by extending the `GameSystem` class and implementing the `onUpdate` method.  
Inside this method, you can search for entities with specific components and apply your logic.

Example of a system that processes all entities with the `Player` component:

"""typescript
import { GameSystem } from 'angry-pixel';

class PlayerSystem extends GameSystem {
onUpdate() {
this.entityManager.search(Player).forEach(({ entity, component }) => {
// Logic for each player
// Example: regenerate mana
component.mana = Math.min(component.mana + 1, 50);
});
}
}
"""

> **Note**: Custom systems like `PlayerSystem` run by default in the [Game Logic Loop](#game-logic-loop).

## Entity-Component-System (ECS) summary

-   **Entities**: Unique identifiers that group components.
-   **Components**: Pure data, no logic.
-   **Systems**: Logic that operates on components.

This separation allows combining components in various ways to create complex behaviors without rigid dependencies.

## Three-phase Game Loop

The engine runs its update cycle (game loop) divided into three phases:

### Game Logic Loop

Runs at 60 FPS. Executes systems related to gameplay: user input, audio, animations, custom logic, etc.  
User-created systems run here by default.

### Physics Loop

Runs at its own fixed rate. Executes systems related to collision detection and physical responses.  
The `Transform` component is also updated in this phase.

### Rendering Loop

Runs synchronized with the monitor’s refresh rate (VSync). Executes rendering and camera systems.

Additionally, users can configure their systems to run in the **Physics Loop** or just before rendering (**Pre-render**) using _decorators_.

---

This architecture allows developing complex games with a clean, modular, and easy-to-maintain structure.
