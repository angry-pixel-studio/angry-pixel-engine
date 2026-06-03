# Física

El motor incluye un sistema de física 2D con detección de colisiones. Se ejecuta en la fase de física del [bucle de juego](../welcome/architecture.md). La física se construye a partir de tres piezas:

- Los **colisionadores** definen la forma de colisión de una entidad y la capa a la que pertenece.
- El **RigidBody** hace que una entidad se mueva bajo velocidad, aceleración y gravedad.
- El **CollisionRepository** permite a los sistemas consultar qué colisionadores están colisionando actualmente.

## RigidBody

El componente [`RigidBody`](built-in-components/rigid-body.md) habilita el movimiento físico de una entidad. Hay tres tipos de cuerpo:

| Tipo | Descripción |
|------|-------------|
| `RigidBodyType.Dynamic` | Afectado por la gravedad y la velocidad, y movido por las colisiones con otros cuerpos. Para objetos que necesitan un comportamiento físico completo. |
| `RigidBodyType.Kinematic` | Movido por la velocidad aplicada, pero no afectado por la gravedad ni por las colisiones de otros cuerpos. Para plataformas móviles o movimiento programado. |
| `RigidBodyType.Static` | Inmóvil. No afectado por la velocidad ni la gravedad. Para muros y geometría del nivel. |

| Opción | Tipo | Descripción |
|--------|------|-------------|
| `type` | `RigidBodyType` | El tipo de cuerpo. Por defecto `Dynamic`. |
| `velocity` | `Vector2` | Velocidad en píxeles por segundo. Para cuerpos Dynamic y Kinematic. |
| `acceleration` | `Vector2` | Aceleración en píxeles por segundo al cuadrado. Para cuerpos Dynamic y Kinematic. |
| `gravity` | `number` | Gravedad en píxeles por segundo al cuadrado. Solo para cuerpos Dynamic. |

Un RigidBody funciona junto con un colisionador en la misma entidad. Para hacer que una entidad se mueva y colisione, agrega tanto un colisionador como un RigidBody:

```typescript
import { Transform, RigidBody, RigidBodyType, BoxCollider } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new BoxCollider({ width: 16, height: 16, layer: "Player" }),
    new RigidBody({ type: RigidBodyType.Dynamic, gravity: 1000 }),
]);
```

## Colisionadores

Un colisionador define una forma de colisión. El motor proporciona cinco componentes de colisionador:

| Componente | Forma |
|-----------|-------|
| [`BoxCollider`](built-in-components/box-collider.md) | Rectángulo. |
| [`BallCollider`](built-in-components/ball-collider.md) | Círculo. |
| [`PolygonCollider`](built-in-components/polygon-collider.md) | Polígono convexo. |
| [`EdgeCollider`](built-in-components/edge-collider.md) | Segmentos de línea conectados. |
| [`TilemapCollider`](built-in-components/tilemap-collider.md) | Colisionadores generados a partir de los bordes de un tilemap. |

Todos los colisionadores comparten estas opciones:

| Opción | Tipo | Descripción |
|--------|------|-------------|
| `layer` | `string` | La capa de colisión a la que pertenece el colisionador. |
| `physics` | `boolean` | `true` si el colisionador interactúa con los cuerpos rígidos. Por defecto `true`. |
| `offset` | `Vector2` | Desplazamiento respecto a la posición de la entidad. |
| `ignoreCollisionsWithLayers` | `string[]` | Capas que este colisionador ignora. |

Cada forma agrega sus propias opciones; por ejemplo, [`BoxCollider`](built-in-components/box-collider.md) tiene `width`, `height` y `rotation`; [`BallCollider`](built-in-components/ball-collider.md) tiene `radius`. Consulta [Componentes integrados](built-in-components/index.md) para las opciones completas de cada colisionador.

Se puede agregar un colisionador sin un RigidBody cuando una entidad solo necesita detección de colisiones, como un muro estático:

```typescript
import { Transform, BoxCollider } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new BoxCollider({ width: 64, height: 16, layer: "Wall" }),
]);
```

Cuando `physics` es `true`, el colisionador participa en la resolución física con los cuerpos rígidos. Cuando es `false`, solo se usa para la detección de colisiones, útil para disparadores y sensores que informan de solapamientos sin empujar a otros cuerpos.

## Capas de colisión

Cada colisionador pertenece a una capa. Qué capas pueden colisionar se configura con la matriz de colisiones en la configuración del juego. Consulta [La clase Game](game-class.md).

```typescript
collisions: {
    collisionMatrix: [
        ["Player", "Enemy"],
        ["Player", "Wall"],
    ],
}
```

Con esta matriz, los jugadores colisionan con los enemigos y los muros, pero los enemigos y los muros no colisionan entre sí.

Un colisionador también puede excluirse de capas concretas con `ignoreCollisionsWithLayers`.

## Consultar colisiones

El `CollisionRepository` informa de las colisiones detectadas en el frame actual. En los sistemas que extienden `GameSystem` está disponible como `this.collisionRepository`. Consulta [Componentes y sistemas personalizados](custom-components-and-systems.md).

| Método | Descripción |
|--------|-------------|
| `findCollisionsForCollider(collider)` | Colisiones en las que el colisionador dado es el colisionador local. |
| `findCollisionsForColliderAndLayer(collider, layer)` | Colisiones con un colisionador remoto en la capa indicada. |
| `findAll()` | Todas las colisiones actuales. |

```typescript
import { GameSystem, BoxCollider } from "angry-pixel";
import { Player } from "../component/Player";

export class PlayerCollisionSystem extends GameSystem {
    onUpdate() {
        this.entityManager.search(Player, (player, entity) => {
            const collider = this.entityManager.getComponent(entity, BoxCollider);
            const collisions = this.collisionRepository.findCollisionsForColliderAndLayer(collider, "Enemy");

            for (const collision of collisions) {
                // reaccionar al golpear a un enemigo
            }
        });
    }
}
```

Cada `Collision` contiene:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `localEntity` | `Entity` | La entidad a la que pertenece el colisionador consultado. |
| `localCollider` | `Collider` | El colisionador consultado. |
| `remoteEntity` | `Entity` | La otra entidad de la colisión. |
| `remoteCollider` | `Collider` | El otro colisionador. |
| `resolution` | `CollisionResolution` | Datos de la colisión: `penetration` (solapamiento en píxeles) y `direction` (`Vector2`). |
