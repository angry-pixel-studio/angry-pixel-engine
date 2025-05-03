# Entities

**Entities** are the fundamental objects that make up any game created with Angry Pixel Engine.  
Each entity is simply a unique identifier (numeric ID) that groups one or more **components** that define its behavior and attributes.

> 📝 **Note:** Entities themselves have no data or logic. All their behavior and state are defined through the components they contain.

## Creating entities

The engine provides the `EntityManager` to create and manage entities.

### Create an empty entity

```typescript
const entity = entityManager.createEntity();
```

### Create an entity with components

```typescript
const entity = entityManager.createEntity([
    new Player({ health: 100 }),
    new Transform({ position: new Vector2(0, 0) }),
]);
```

> 📝 You can pass either instances of components or component classes (the engine will automatically instantiate the class if no instance is provided).

### Create an entity from an archetype

An **archetype** is a reusable template that defines which components the entity and its children will have.

```typescript
const playerArchetype = {
    components: [new Player({ health: 100 }), new Transform({ position: new Vector2(0, 0) })],
    enabled: true,
};

const entity = entityManager.createEntityFromArchetype(playerArchetype);
```

## Parent-child relationships

You can establish hierarchies between entities:

```typescript
const parent = entityManager.createEntity([Transform]);
const child = entityManager.createEntity([Transform]);

entityManager.setParent(child, parent);
```

This is useful for logically grouping entities (for example, an enemy with multiple parts or a character and their sword).

> 🔎 **Important:** If both entities have a `Transform` component, the system will automatically create a relationship between those `Transform` components so the child’s position updates relative to the parent.

## Enabling and disabling entities

You can enable or disable entire entities:

```typescript
entityManager.disableEntity(entity);
entityManager.enableEntity(entity);
```

> 🔎 Disabled entities and components are not processed by systems (they won’t appear in `search` results).

## Searching for entities

The `search` method allows you to find entities that have a specific component:

```typescript
const result = entityManager.search(Player);

result.forEach(({ entity, component }) => {
    console.log(`Entity: ${entity}, HP: ${component.health}`);
});
```

You can also search by specific attributes:

```typescript
const alivePlayers = entityManager.search(Player, (component) => component.status === "alive");
```

## Modifying components of an entity

To update the data of a component on an entity:

```typescript
entityManager.updateComponentData(entity, Player, (component) => {
    component.health = 80;
});
```

## Removing entities and components

Remove an entity (its components and children will also be removed):

```typescript
entityManager.removeEntity(entity);
```

Remove a component:

```typescript
entityManager.removeComponent(entity, Player);
```

---

## Archetype examples

**Archetypes** are reusable templates that define:

-   Which components the entity will have.
-   Whether it will be enabled or disabled when created.
-   Whether it will have child entities with their own components.

They are ideal for creating complex or repeatable entities (for example: enemies, pickups, obstacles).

### 1️⃣ Basic archetype

```typescript
const playerArchetype = {
    components: [
        new Player({ health: 100, speed: 50 }),
        new Transform({ position: new Vector2(0, 0) }),
        SpriteRenderer,
    ],
    enabled: true,
};

const entity = entityManager.createEntityFromArchetype(playerArchetype);
```

**Result:**  
An entity is created with the `Player`, `Transform`, and `SpriteRenderer` components and is enabled.

---

### 2️⃣ Archetype with disabled components

```typescript
const stealthEnemyArchetype = {
    components: [
        new Enemy({ aggression: 80 }),
        new Transform({ position: new Vector2(100, 200) }),
        disableComponent(new BoxCollider()), // The enemy starts without collision
    ],
    enabled: true,
};

const enemy = entityManager.createEntityFromArchetype(stealthEnemyArchetype);
```

**Result:**  
The enemy is created with its collider disabled. You can activate it later with:

```typescript
entityManager.enableComponent(enemy, BoxCollider);
```

---

### 3️⃣ Archetype with parent-child hierarchy

```typescript
const bossArchetype = {
    components: [new Enemy({ health: 1000 }), new Transform({ position: new Vector2(500, 300) }), SpriteRenderer],
    children: [
        {
            components: [new WeaponMount(), SpriteRenderer],
            enabled: true,
        },
        {
            components: [new Shield({ durability: 200 }), SpriteRenderer],
            enabled: false, // The shield starts disabled
        },
    ],
    enabled: true,
};

const boss = entityManager.createEntityFromArchetype(bossArchetype);
```

**Result:**  
A boss is created with two child entities:

-   An active weapon.
-   A disabled shield that can be activated later using `entityManager.enableEntity(shieldEntity)`.

> 🔎 **Note:** If both the parent and child entities have `Transform` components, a positional relationship between them will be automatically created.

---

### Important note

When creating entities from archetypes:

-   **Components are cloned**, allowing you to use the same archetype multiple times without component instances overlapping.
-   **Disabled components** will not be processed by systems until they are enabled.
-   **Children** inherit parent relationships and can be searched or modified using methods like `getChildren` or `searchInChildren`.

## Summary

✅ Entities are simple identifiers that group components.  
✅ The `EntityManager` provides full management of entities and components.  
✅ Archetypes are a powerful tool for defining templates of complex entities.
