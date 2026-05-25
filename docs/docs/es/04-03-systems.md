# Sistemas

Los **sistemas** contienen la lógica que opera sobre las entidades y sus componentes.  
Mientras que los componentes solo almacenan datos, los sistemas ejecutan comportamientos cada frame.

Cada sistema:

-   Procesa entidades que tengan ciertos componentes.
-   Puede acceder a otros servicios y managers.
-   Puede habilitarse y deshabilitarse dinámicamente.

## Crear un sistema

Para crear un sistema, extiende la clase `GameSystem` e implementa el método `onUpdate`:

```typescript
class PlayerSystem extends GameSystem {
    onUpdate() {
        this.entityManager.search(Player, (player, entity) => {
            // Lógica del jugador
            if (player.health <= 0) {
                console.log(`El jugador ${entity} ha muerto.`);
            }
        });
    }
}
```

> 📝 `GameSystem` ya incluye acceso a los managers principales: `EntityManager`, `AssetManager`, `InputManager`, `SceneManager`, `TimeManager` y `CollisionRepository`.

## Métodos disponibles en GameSystem

Puedes sobrescribir estos métodos en tu sistema:

| Método         | Cuándo se llama                                        |
| -------------- | ------------------------------------------------------ |
| `onCreate()`   | La primera vez que el sistema se habilita.             |
| `onEnabled()`  | Cada vez que el sistema se habilita.                   |
| `onDisabled()` | Cada vez que el sistema se deshabilita.                |
| `onUpdate()`   | Una vez por frame mientras el sistema esté habilitado. |
| `onDestroy()`  | Cuando el sistema es eliminado.                        |

## Agregar sistemas a una escena

Para que un sistema se ejecute, debe ser agregado a una escena.

Overridea el método `loadSystems` de tu clase escena:

```typescript
class MainScene extends Scene {
    registerSystems() {
        this.addSystems([PlayerSystem]);
    }
}
```

> 📝 Los sistemas built-in del motor se ejecutan automáticamente en todas las escenas.

## Asignar el loop de ejecución

Por defecto, los sistemas se ejecutan en el **Game Logic Loop**.

Si deseas que un sistema se ejecute en otro loop, usa decoradores:

| Decorador          | Loop de ejecución                    |
| ------------------ | ------------------------------------ |
| `@PhysicsLoop()`   | Loop de físicas.                     |
| `@PreRenderLoop()` | Justo antes del loop de renderizado. |

**Ejemplo en TypeScript:**

```typescript
@PhysicsLoop()
class PhysicsDebugger extends GameSystem {
    onUpdate() {
        // Lógica de depuración física
    }
}
```

---

### Usar decoradores en JavaScript (sin sintaxis @)

Si usas JavaScript o prefieres evitar el uso de `@`, puedes aplicar los decoradores manualmente usando la función `decorate`:

**Ejemplo - Loop de físicas:**

```javascript
class PhysicsDebugger extends GameSystem {
    onUpdate() {
        // Lógica de depuración física
    }
}

// Asignar el decorador manualmente:
decorate(PhysicsLoop(), PhysicsDebugger);
```

**Ejemplo - Loop de pre-render:**

```javascript
class PreRenderDebugger extends GameSystem {
    onUpdate() {
        // Lógica que se ejecuta antes del renderizado
    }
}

decorate(PreRenderLoop(), PreRenderDebugger);
```

> 📝 La función `decorate` permite aplicar decoradores incluso si tu entorno no soporta la sintaxis `@`.

---

## Habilitar y deshabilitar sistemas en tiempo de ejecución

Puedes activar o desactivar sistemas en tiempo real:

```typescript
// Habilitar un sistema
systemManager.enableSystem(PlayerSystem);

// Deshabilitar un sistema
systemManager.disableSystem(PlayerSystem);
```

## Nota importante

-   Los sistemas NO almacenan estado persistente de las entidades.
-   Usan `EntityManager.search` para encontrar y operar sobre las entidades cada frame.
-   No debes crear o eliminar sistemas cada frame (solo activarlos/desactivarlos si es necesario).

### Resumen

✅ Los sistemas ejecutan lógica sobre entidades y componentes.  
✅ Se crean extendiendo la clase `GameSystem`.  
✅ Se agregan a las escenas en el método `loadSystems`.  
✅ Pueden ejecutarse en distintos loops.  
✅ Puedes usar decoradores o asignarlos manualmente con `decorate`.  
✅ Se pueden habilitar y deshabilitar dinámicamente.
