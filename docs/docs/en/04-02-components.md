# Components

**Components** are data structures that define the properties and state of an entity.  
Each component contains specific data and does NOT contain logic (logic is handled by systems).

For example, a `Player` component can define the player's health, speed, or state.

> 📝 **Note:** Each entity can only have one instance of each component type.

## Defining custom components

You can define custom components as simple classes:

```typescript
class Player {
    health = 100;
    speed = 50;
}
```

Then you can use them when creating entities:

```typescript
const entity = entityManager.createEntity([new Player(), new Transform({ position: new Vector2(0, 0) })]);
```

## Accessing and modifying components

Get a component from an entity:

```typescript
const player = entityManager.getComponent(entity, Player);
```

Update a component's data:

```typescript
entityManager.updateComponentData(entity, Player, { health: 80 });
```

> 📝 You can also check if an entity has a component using `hasComponent`:

```typescript
if (entityManager.hasComponent(entity, Player)) {
    // The entity has the Player component
}
```

## Disabling and enabling components

You can disable or enable components of an entity:

```typescript
entityManager.disableComponent(entity, Player);
entityManager.enableComponent(entity, Player);
```

Disabled components will not be processed by systems until they are enabled again.

## Creating components disabled at start

You can create components that are initially disabled using `disableComponent`:

```typescript
const archetype = {
    components: [disableComponent(new BoxCollider())],
};
```

## Searching for entities by component

The recommended way to process every entity that has a specific component is to pass a callback — it iterates directly without allocating an intermediate array:

```typescript
entityManager.search(Player, (player, entity) => {
    console.log(`Entity ${entity} has health: ${player.health}`);
});
```

Short-circuit inside the callback to filter:

```typescript
entityManager.search(Player, (player, entity) => {
    if (player.speed !== 100) return;
    // ...
});
```

As an alternative, call `search` without a callback to get an array you can `.filter`, `.sort`, or otherwise treat as a collection:

```typescript
const fastPlayers = entityManager
    .search(Player)
    .filter(({ component }) => component.speed === 100);
```

---

## Built-in Components

Angry Pixel Engine includes **19 built-in components** ready to use.  
These components cover general purpose, physics, and rendering.

### 📦 General purpose components

-   **Transform**: Defines the entity's position, rotation, and scale.
-   **TiledWrapper**: Integrates objects from Tiled.
-   **Button**: Creates clickable areas and UI buttons.
-   **AudioPlayer**: Plays sounds and music.

### ⚙️ Physics components

-   **TilemapCollider**: Collider for tile maps.
-   **RigidBody**: Defines physical properties like velocity and acceleration.
-   **EdgeCollider**: Collider in the form of a border or line.
-   **BoxCollider**: Rectangular collider.
-   **BallCollider**: Circular collider.
-   **PolygonCollider**: Convex polygon collider.

### 🎨 Rendering components

-   **Animator**: Controls sprite animations.
-   **VideoRenderer**: Allows rendering videos as part of the game.
-   **TilemapRenderer**: Renders tile maps.
-   **TextRenderer**: Displays text on screen.
-   **SpriteRenderer**: Renders sprites.
-   **DarknessRenderer**: Generates a darkness layer that can be illuminated by the _LightRenderer_.
-   **MaskRenderer**: Applies clipping masks to the entity.
-   **LightRenderer**: Renders lights.
-   **Camera**: Defines the camera that observes the scene.

> 📝 **Note:** You can combine built-in and custom components in the same entity.

---

## Important notes

-   Components must be classes (not plain objects).
-   They should not contain logic (logic belongs to systems).
-   You can temporarily disable components if you want the entity to stop using certain functionality without removing it.

### Summary

✅ Components define an entity's data and state.  
✅ They do not contain logic.  
✅ They are managed and searched through the `EntityManager`.  
✅ You can use built-in components or create your own.
