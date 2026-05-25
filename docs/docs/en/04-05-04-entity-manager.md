# EntityManager

## Summary

The `EntityManager` is the core of the _Entity-Component-System (ECS)_ architecture.  
It is responsible for creating, storing, and managing all entities and their components.

## Responsibilities

-   Create and delete entities.
-   Add and remove components to/from entities.
-   Search for entities containing specific components.
-   Create entities from archetypes.
-   Manage the enabled/disabled state of entities and components.
-   Maintain the parent-child hierarchy between entities (linking `Transform` components if they exist).

## Usage examples

### Create an entity manually

```typescript
const player = entityManager.createEntity([
    new Transform({ position: new Vector2(0, 0) }),
    new Player({ health: 100 }),
    new SpriteRenderer({ sprite: "player.png" }),
]);
```

### Create an entity from an archetype

```typescript
const player = entityManager.createEntity(playerArchetype);
```

### Search for entities with a component

The recommended way to process every match is to pass a callback. This iterates the underlying store directly and avoids allocating an intermediate result array — the right choice for system `onUpdate` and any per-frame loop.

```typescript
entityManager.search(Player, (player, entity) => {
    player.health -= 10;
});
```

The callback receives the component instance first and the entity second. Disabled entities and components are skipped by default; pass `true` as the third argument to include them.

As an alternative, calling `search` without a callback returns an array of `SearchResult` objects. Use this when you need to sort, slice, or otherwise treat the matches as a collection:

```typescript
const players = entityManager.search(Player);

players.forEach(({ entity, component }) => {
    component.health -= 10;
});
```

### Search for entities with multiple components

```typescript
const entities = entityManager.searchEntitiesByComponents([Player, Transform]);
```

### Filter results

Prefer short-circuiting inside the callback for hot paths. If you already have the array form, use `Array.filter`:

```typescript
// callback form (allocation-free, recommended)
entityManager.search(Player, (player, entity) => {
    if (player.status !== "injured") return;
    // ...
});

// array form
const injuredPlayers = entityManager
    .search(Player)
    .filter(({ component }) => component.status === "injured");
```

### Search in children (SearchInChildren)

```typescript
const childWeapons = entityManager.searchInChildren(parentEntity, Weapon);
```

### Get a component from an entity

```typescript
const damageController = entityManager.getComponent(player, DamageController);
```

### Add and remove components dynamically

```typescript
entityManager.addComponent(player, new Weapon({ damage: 25 }));

entityManager.removeComponent(player, Weapon);
```

### Enable / disable entities and components

```typescript
entityManager.disableEntity(enemy);
entityManager.enableEntity(player);

entityManager.disableComponent(player, SpriteRenderer);
entityManager.enableComponent(player, SpriteRenderer);
```

### Update component attributes

```typescript
entityManager.updateComponentData(player, Player, (player) => {
    player.health = 50;
});
```

### Set or change parent-child relationship

```typescript
entityManager.setParent(childEntity, parentEntity);
```

**Note:**  
If both entities have a `Transform` component, a `Transform` hierarchy will be created so that the child inherits the parent’s position, rotation, and scale.

### Remove a parent (make the entity a root)

```typescript
entityManager.removeParent(childEntity);
```

### Check if an entity has a component

```typescript
if (entityManager.hasComponent(player, SpriteRenderer)) {
    // do something
}
```

## Important notes

-   Each entity has a unique identifier of type `number`.
-   Components are plain data objects.
-   Components can be individually enabled or disabled.
-   `search` returns an array, or iterates via a callback when one is passed — use the callback form in hot per-frame loops to avoid allocating intermediate results.
-   When establishing a parent-child relationship between entities with `Transform`,
    the parent's transformations automatically affect its children.
