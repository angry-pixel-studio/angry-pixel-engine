# Adding Entities to the Scene

A scene's initial entities are created in its `createEntities` method, which runs once the scene's assets have finished loading. Entities are created through `this.entityManager`. See [The Entity Manager](entity-manager.md) for the full API.

## Creating entities inline

The simplest way to add an entity is to pass a list of components to `createEntity`. Components can be instances or classes, and may be either your own custom components or the engine's built-in ones. See [Built-in Components](built-in-components/index.md).

Component instances passed this way are cloned — the entity stores a copy, not the object you passed in. Retrieve the attached component with `getComponent`. See [The Entity Manager](entity-manager.md).

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

## Defining entities with archetypes

For entities you create often, or that need disabled components or child entities, define an **archetype** — a reusable template describing the components an entity should have. Archetypes are typically kept in their own files under `src/entity/`.

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

An archetype is passed to `createEntity` the same way as a component list:

```typescript
import { playerArchetype } from "../entity/Player";

createEntities() {
    this.entityManager.createEntity(playerArchetype);
}
```

Because an archetype is just a template, the same one can be used to create multiple entities. Component instances in the archetype are cloned on each creation, so the template can be reused safely.

### Archetype fields

| Field | Type | Description |
|-------|------|-------------|
| `components` | `(Component \| ComponentType)[]` | Components to attach. Instances are cloned on creation; classes are instantiated with no arguments. |
| `disabledComponents` | `(Component \| ComponentType)[]` | Components attached but started disabled. Do not list the same type in both arrays. |
| `children` | `Archetype[]` | Child archetypes. Each is created as a separate entity parented to this one. |
| `enabled` | `boolean` | Whether the entity starts enabled. Defaults to `true`. |

### Child entities

The `children` field nests archetypes to build a hierarchy. Each child is created as its own entity, parented to the entity above it:

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

You can also parent an entity at creation time by passing a parent entity as the second argument to `createEntity`:

```typescript
const parent = this.entityManager.createEntity(playerArchetype);
this.entityManager.createEntity([new Transform()], parent);
```
