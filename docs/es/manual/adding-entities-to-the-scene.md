# Agregar entidades a la escena

Las entidades iniciales de una escena se crean en su método `createEntities`, que se ejecuta una vez que los recursos de la escena han terminado de cargarse. Las entidades se crean mediante `this.entityManager`. Consulta [El Entity Manager](entity-manager.md) para la API completa.

## Crear entidades en línea

La forma más sencilla de agregar una entidad es pasar una lista de componentes a `createEntity`. Los componentes pueden ser instancias o clases, y pueden ser tanto tus propios componentes personalizados como los integrados del motor. Consulta [Componentes integrados](built-in-components/index.md).

```typescript
import { Scene, Transform, SpriteRenderer, Vector2 } from "angry-pixel";
import { Player } from "../component/Player";

export class MainScene extends Scene {
    createEntities() {
        this.entityManager.createEntity([
            new Transform({ position: new Vector2(0, 0) }),
            new SpriteRenderer(),
            new Player(),
        ]);
    }
}
```

## Definir entidades con arquetipos

Para entidades que creas con frecuencia, o que tienen muchos componentes, define un **arquetipo**: una plantilla reutilizable que describe los componentes que debe tener una entidad. Los arquetipos se suelen mantener en sus propios archivos dentro de `src/entity/`.

```typescript
// src/entity/Player.ts
import { Archetype, Transform, SpriteRenderer, BoxCollider, RigidBody, RigidBodyType, Vector2 } from "angry-pixel";
import { PlayerMovement } from "../component/PlayerMovement";

export const playerArchetype: Archetype = {
    components: [
        new Transform({ position: new Vector2(0, 0) }),
        new SpriteRenderer(),
        new BoxCollider({ width: 8, height: 16 }),
        new RigidBody({ type: RigidBodyType.Dynamic }),
        PlayerMovement,
    ],
};
```

Un arquetipo se pasa a `createEntity` de la misma forma que una lista de componentes:

```typescript
import { playerArchetype } from "../entity/Player";

createEntities() {
    this.entityManager.createEntity(playerArchetype);
}
```

Como un arquetipo es solo una plantilla, el mismo puede usarse para crear varias entidades. Las instancias de componentes del arquetipo se clonan en cada creación, por lo que la plantilla puede reutilizarse de forma segura.

### Campos del arquetipo

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `components` | `(Component \| ComponentType)[]` | Componentes a asociar. Las instancias se clonan al crear; las clases se instancian sin argumentos. |
| `disabledComponents` | `(Component \| ComponentType)[]` | Componentes asociados pero que comienzan desactivados. No listes el mismo tipo en ambos arrays. |
| `children` | `Archetype[]` | Arquetipos hijos. Cada uno se crea como una entidad separada con esta como padre. |
| `enabled` | `boolean` | Si la entidad comienza activada. Por defecto `true`. |

### Entidades hijas

El campo `children` anida arquetipos para construir una jerarquía. Cada hijo se crea como su propia entidad, con la entidad superior como padre:

```typescript
export const playerArchetype: Archetype = {
    components: [new Transform(), new SpriteRenderer()],
    children: [
        {
            components: [new Transform(), new BoxCollider({ width: 6, height: 8 })],
        },
    ],
};
```

También puedes asignar el padre de una entidad en el momento de su creación pasando una entidad padre como segundo argumento de `createEntity`:

```typescript
const parent = this.entityManager.createEntity(playerArchetype);
this.entityManager.createEntity([new Transform()], parent);
```
