# The Entity Manager

The entity manager is the central registry for entities and components. It creates and removes entities, attaches and removes components, searches for entities by their components, manages parent-child relationships, and enables or disables entities and components.

Inside a scene it is available as `this.entityManager`. In systems it is obtained through dependency injection. See [Custom Components and Systems](custom-components-and-systems.md).

An entity is a numeric identifier; components are the data attached to it. See [Architecture](../welcome/architecture.md).

## Creating entities

`createEntity` returns the new entity's identifier. It accepts a list of components, which can be component instances or component classes. Classes are instantiated with no arguments. Instances are cloned: the entity stores a copy, not the object you passed in, so keeping a reference to the original will not affect the entity. Retrieve the attached component with `getComponent`.

```typescript
import { Transform, SpriteRenderer } from "angry-pixel";
import { Player } from "../component/Player";

// from component instances
const entity = this.entityManager.createEntity([
    new Transform({ position: new Vector2(100, 100) }),
    new Player(),
]);

// from component classes
const other = this.entityManager.createEntity([Transform, SpriteRenderer]);

// an empty entity
const empty = this.entityManager.createEntity();
```

An entity can be created as a child of another by passing a parent as the second argument:

```typescript
const child = this.entityManager.createEntity([new Transform()], parent);
```

## Accessing components

| Method | Description |
|--------|-------------|
| `getComponent(entity, ComponentType)` | Returns the component of the given type on the entity. |
| `getComponents(entity)` | Returns all components on the entity. |
| `hasComponent(entity, ComponentType)` | Returns `true` if the entity has the component. |
| `getEntityForComponent(component)` | Returns the entity a component instance belongs to. |
| `updateComponentData(entity, ComponentType, callback)` | Updates a component through a callback. |

```typescript
const transform = this.entityManager.getComponent(entity, Transform);

this.entityManager.updateComponentData(entity, Transform, (transform) => {
    transform.position = new Vector2(200, 200);
});
```

## Adding and removing components

`addComponent` attaches a component (instance or class) to an existing entity. `removeComponent` accepts either an entity and a component type, or a component instance.

```typescript
this.entityManager.addComponent(entity, new SpriteRenderer());

this.entityManager.removeComponent(entity, SpriteRenderer);
// or, given the instance
this.entityManager.removeComponent(spriteRenderer);
```

## Searching for entities

`search` finds entities that have a given component type. It has two forms:

- **Callback form (recommended in systems):** invokes the callback for each match without allocating an intermediate array. Use it in `onUpdate` and other per-frame loops.
- **Array form:** returns an array of `SearchResult` objects (`{ entity, component }`), useful when you need to sort, slice, or filter the results.

```typescript
// callback form
this.entityManager.search(Enemy, (enemy, entity) => {
    // do something with each enemy
});

// array form
const enemies = this.entityManager.search(Enemy);
const alive = enemies.filter(({ component }) => component.status === "alive");
```

Both forms accept a final `includeDisabled` argument (default `false`) to include disabled entities and components.

> **Note:** Do not add or remove entities/components of the same component type from within a `search` callback.

Other search methods:

| Method | Description |
|--------|-------------|
| `searchEntitiesByComponents([ComponentType, ...])` | Returns the entities that have all the given component types. |
| `searchInChildren(parent, ComponentType, includeDisabled?)` | Returns `SearchResult` objects for matching children of `parent`. |

## Enabling and disabling

Disabled entities and components are skipped by systems (and excluded from searches unless `includeDisabled` is set).

| Method | Description |
|--------|-------------|
| `enableEntity(entity)` / `disableEntity(entity)` | Enable or disable an entity. |
| `isEntityEnabled(entity)` | Returns whether the entity is enabled. |
| `enableComponent(...)` / `disableComponent(...)` | Enable or disable a component, by instance or by entity + type. |
| `isComponentEnabled(...)` | Returns whether a component is enabled. |
| `enableEntitiesByComponent(ComponentType)` / `disableEntitiesByComponent(ComponentType)` | Enable or disable all entities that have a component type. |

## Parent-child relationships

Entities can be organized into hierarchies.

| Method | Description |
|--------|-------------|
| `setParent(child, parent)` | Sets the parent of an entity. |
| `getParent(child)` | Returns the parent of an entity. |
| `getChildren(parent)` | Returns the children of an entity. |
| `removeParent(child)` | Removes the parent relationship from an entity. |
| `removeChild(parent, child)` | Removes a specific child from a parent. |
| `getComponentFromParent(parent, ComponentType)` | Returns a component of the given type from the parent. |

## Removing entities

| Method | Description |
|--------|-------------|
| `removeEntity(entity)` | Removes a single entity. |
| `removeAllEntities(preserveComponentType?)` | Removes all entities, optionally preserving those that have a given component type. |
| `isEntity(entity)` | Returns whether the identifier refers to an existing entity. |

```typescript
this.entityManager.removeEntity(entity);
```
