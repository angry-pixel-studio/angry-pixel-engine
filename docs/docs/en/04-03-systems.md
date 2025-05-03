# Systems

**Systems** contain the logic that operates on entities and their components.  
While components only store data, systems execute behaviors every frame.

Each system:

-   Processes entities that have certain components.
-   Can access other services and managers.
-   Can be enabled and disabled dynamically.

## Creating a system

To create a system, extend the `GameSystem` class and implement the `onUpdate` method:

```typescript
class PlayerSystem extends GameSystem {
    onUpdate() {
        this.entityManager.search(Player).forEach(({ entity, component }) => {
            // Player logic
            if (component.health <= 0) {
                console.log(`Player ${entity} has died.`);
            }
        });
    }
}
```

> 📝 `GameSystem` already provides access to core managers: `EntityManager`, `AssetManager`, `InputManager`, `SceneManager`, `TimeManager`, and `CollisionRepository`.

## Available methods in GameSystem

You can override these methods in your system:

| Method         | Called when                                 |
| -------------- | ------------------------------------------- |
| `onCreate()`   | The first time the system is enabled.       |
| `onEnabled()`  | Every time the system is enabled.           |
| `onDisabled()` | Every time the system is disabled.          |
| `onUpdate()`   | Once per frame while the system is enabled. |
| `onDestroy()`  | When the system is removed.                 |

## Adding systems to a scene

To execute a system, add it to a scene.

Override the `loadSystems` method of your scene class:

```typescript
class MainScene extends Scene {
    loadSystems() {
        this.systems = [PlayerSystem];
    }
}
```

> 📝 Built-in engine systems are automatically executed in all scenes.

## Assigning the execution loop

By default, systems run in the **Game Logic Loop**.

If you want a system to run in a different loop, use decorators:

| Decorator          | Execution loop                  |
| ------------------ | ------------------------------- |
| `@PhysicsLoop()`   | Physics loop.                   |
| `@PreRenderLoop()` | Just before the rendering loop. |

**Example in TypeScript:**

```typescript
@PhysicsLoop()
class PhysicsDebugger extends GameSystem {
    onUpdate() {
        // Physics debug logic
    }
}
```

---

### Using decorators in JavaScript (without @ syntax)

If you use JavaScript or prefer not to use the `@` syntax,  
you can manually apply decorators using the `decorate` function:

**Example — Physics loop:**

```javascript
class PhysicsDebugger extends GameSystem {
    onUpdate() {
        // Physics debug logic
    }
}

// Apply the decorator manually:
decorate(PhysicsLoop(), PhysicsDebugger);
```

**Example — Pre-render loop:**

```javascript
class PreRenderDebugger extends GameSystem {
    onUpdate() {
        // Logic that runs before rendering
    }
}

decorate(PreRenderLoop(), PreRenderDebugger);
```

> 📝 The `decorate` function allows you to apply decorators even if your environment does not support the `@` syntax.

---

## Enabling and disabling systems at runtime

You can enable or disable systems dynamically:

```typescript
// Enable a system
systemManager.enableSystem(PlayerSystem);

// Disable a system
systemManager.disableSystem(PlayerSystem);
```

## Important notes

-   Systems do NOT store persistent state of entities.
-   They use `EntityManager.search` to find and operate on entities each frame.
-   You should not create or remove systems every frame (only enable/disable if necessary).

### Summary

✅ Systems execute logic on entities and components.  
✅ They are created by extending the `GameSystem` class.  
✅ Added to scenes via the `loadSystems` method.  
✅ Can run in different loops using decorators.  
✅ You can apply decorators manually using `decorate`.  
✅ Systems can be enabled and disabled dynamically.
