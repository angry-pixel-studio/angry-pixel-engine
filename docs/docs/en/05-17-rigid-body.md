## RigidBody

The `RigidBody` component enables physics simulation for an entity, allowing it to interact with other physics-enabled objects in the game world.  
It defines how the entity behaves under forces like gravity, collisions, and applied velocities.  
The component supports three types of bodies:

-   **Dynamic:** Fully physics-simulated bodies that respond to forces, collisions, gravity, and can be moved by other rigid bodies.  
    Best for objects that require realistic physical behavior such as players, projectiles, or items.

-   **Kinematic:** Bodies that can move with applied velocities but are not affected by gravity or collisions from other bodies.  
    Ideal for moving platforms, enemies with predefined paths, or objects that need controlled movement without full physics simulation.  
    More performance efficient than Dynamic bodies.

-   **Static:** Immovable bodies that act as solid, unmovable obstacles. They don't respond to any forces or collisions.  
    The most performance efficient option as they require minimal physics calculations.

### Properties

| Property       | Type            | Description                                                                                                     |
| -------------- | --------------- | --------------------------------------------------------------------------------------------------------------- |
| `type`         | `RigidBodyType` | Body type: `Dynamic`, `Kinematic`, or `Static`.                                                                 |
| `velocity`     | `Vector2`       | Velocity applied to the x-axis and y-axis expressed in pixels per second. For `Dynamic` and `Kinematic` bodies. |
| `gravity`      | `number`        | Gravity expressed in pixels per second squared. Only for `Dynamic` bodies.                                      |
| `acceleration` | `Vector2`       | Acceleration expressed in pixels per second squared. For `Dynamic` and `Kinematic` bodies.                      |

### Example: Dynamic body

```typescript
const rigidBody = new RigidBody({
    type: RigidBodyType.Dynamic,
    gravity: 10,
    velocity: new Vector2(1, 0),
    acceleration: new Vector2(1, 0),
});
```

### Example: Kinematic body

```typescript
const rigidBody = new RigidBody({
    type: RigidBodyType.Kinematic,
    velocity: new Vector2(1, 0),
    acceleration: new Vector2(1, 0),
});
```

### Example: Static body

```typescript
const rigidBody = new RigidBody({
    type: RigidBodyType.Static,
});
```

### Notes

-   `Dynamic` bodies are ideal for objects that need to respond to real-world physics forces.
-   `Kinematic` bodies allow controlled movement without being influenced by external forces.
-   `Static` bodies offer the highest performance efficiency for fixed geometry or environmental objects.
-   For the `physics` property of colliders to take effect, the entity must also have a `RigidBody` with a `Dynamic` or `Kinematic` type. `Static` bodies do not move but can still receive collisions.
