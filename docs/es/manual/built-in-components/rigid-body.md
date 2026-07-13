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
| `staticForLayers` | `string[]` | `[]` | Capas de colisión para las que este cuerpo se comporta como estático (ver más abajo). |

## Estático para ciertas capas

Cuando dos cuerpos Dynamic colisionan, ambos se reposicionan la mitad de la penetración cada uno. Cuando un cuerpo Dynamic colisiona con uno Static, solo se reposiciona el cuerpo Dynamic.

`staticForLayers` permite que un cuerpo Dynamic se comporte como estático frente a ciertas capas. Cuando un cuerpo Dynamic cuyo colisionador está en una de las capas listadas en `staticForLayers` colisiona con este cuerpo, solo se reposiciona el otro cuerpo — este permanece en su lugar, como si fuera estático. Para cualquier otra colisión, el cuerpo sigue comportándose según su propio tipo.

Por ejemplo, una plataforma móvil que debe empujar al jugador pero nunca ser empujada puede listar la capa de colisión del jugador:

```typescript
new RigidBody({ type: RigidBodyType.Dynamic, staticForLayers: ["Player"] });
```

## Ejemplo

```typescript
import { Transform, BoxCollider, RigidBody, RigidBodyType } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new BoxCollider({ width: 16, height: 16, layer: "Player" }),
    new RigidBody({ type: RigidBodyType.Dynamic, gravity: 1000 }),
]);
```
