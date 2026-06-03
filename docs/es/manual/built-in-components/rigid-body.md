# RigidBody

El componente `RigidBody` habilita el movimiento físico de una entidad, haciendo que se mueva bajo velocidad, aceleración y gravedad. Funciona junto con un colisionador en la misma entidad. Consulta [Física](../physics.md) para una visión general.

## Tipos de cuerpo

| Tipo | Descripción |
|------|-------------|
| `RigidBodyType.Dynamic` | Afectado por la gravedad y la velocidad, y movido por las colisiones con otros cuerpos. Para objetos que necesitan un comportamiento físico completo. |
| `RigidBodyType.Kinematic` | Movido por la velocidad aplicada, pero no afectado por la gravedad ni por las colisiones de otros cuerpos. Para plataformas móviles o movimiento programado. |
| `RigidBodyType.Static` | Inmóvil. No afectado por la velocidad ni la gravedad. Para muros y geometría del nivel. |

## Opciones

| Opción | Tipo | Valor por defecto | Descripción |
|--------|------|---------|-------------|
| `type` | `RigidBodyType` | `Dynamic` | El tipo de cuerpo. |
| `velocity` | `Vector2` | `(0, 0)` | Velocidad en píxeles por segundo. Para cuerpos Dynamic y Kinematic. |
| `acceleration` | `Vector2` | `(0, 0)` | Aceleración en píxeles por segundo al cuadrado. Para cuerpos Dynamic y Kinematic. |
| `gravity` | `number` | `0` | Gravedad en píxeles por segundo al cuadrado. Solo para cuerpos Dynamic. |

## Ejemplo

```typescript
import { Transform, BoxCollider, RigidBody, RigidBodyType } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new BoxCollider({ width: 16, height: 16, layer: "Player" }),
    new RigidBody({ type: RigidBodyType.Dynamic, gravity: 1000 }),
]);
```
