# EntityManager

## Resumen

El `EntityManager` es el núcleo del sistema _Entity-Component-System (ECS)_.  
Se encarga de crear, almacenar y administrar todas las entidades y sus componentes.

## Responsabilidades

-   Crear y eliminar entidades.
-   Añadir y eliminar componentes a las entidades.
-   Buscar entidades que contengan componentes específicos.
-   Crear entidades a partir de arquetipos.
-   Controlar el estado de habilitación/deshabilitación de entidades y componentes.
-   Mantener la jerarquía padre-hijo de entidades (vínculo entre componentes Transform si existen).

## Ejemplos de uso

### Crear una entidad manualmente

```typescript
const player = entityManager.createEntity([
    new Transform({ position: new Vector2(0, 0) }),
    new Player({ health: 100 }),
    new SpriteRenderer({ sprite: "player.png" }),
]);
```

### Crear una entidad desde un arquetipo

```typescript
const player = entityManager.createEntity(playerArchetype);
```

### Buscar entidades con un componente

```typescript
const players = entityManager.search(Player);

for (const { entity, component } of players) {
    component.health -= 10;
}
```

### Buscar entidades con varios componentes

```typescript
const entities = entityManager.searchEntitiesByComponents([Player, Transform]);
```

### Buscar entidades con criterios (SearchCriteria)

```typescript
const injuredPlayers = entityManager.search(Player, { injured: true });
```

### Buscar dentro de los hijos (SearchInChildren)

```typescript
const childWeapons = entityManager.searchInChildren(parentEntity, Weapon);
```

### Obtener un componente de una entidad

```typescript
const damageController = entityManager.getComponent(player, DamageController);
```

### Añadir y eliminar componentes dinámicamente

```typescript
entityManager.addComponent(player, new Weapon({ damage: 25 }));

entityManager.removeComponent(player, Weapon);
```

### Habilitar / deshabilitar entidades y componentes

```typescript
entityManager.disableEntity(enemy);
entityManager.enableEntity(player);

entityManager.disableComponent(player, SpriteRenderer);
entityManager.enableComponent(player, SpriteRenderer);
```

### Modificar los atributos de un componente

```typescript
entityManager.updateComponentData(player, Player, { health: 50 });
```

### Establecer o cambiar la relación padre-hijo

```typescript
entityManager.setParent(childEntity, parentEntity);
```

**Nota:**  
Si ambos tienen un componente `Transform`, se creará una jerarquía de Transform que hace que el hijo herede la posición, rotación y escala del padre.

### Quitar el padre de una entidad (hacerla raíz)

```typescript
entityManager.removeParent(childEntity);
```

### Verificar si una entidad tiene un componente

```typescript
if (entityManager.hasComponent(player, SpriteRenderer)) {
    // realizar una acción
}
```

## Notas importantes

-   Cada entidad tiene un identificador único de tipo `number`.
-   Los componentes son objetos simples que contienen datos.
-   Los componentes pueden estar habilitados o deshabilitados individualmente.
-   La búsqueda puede incluir criterios (`SearchCriteria`) para filtrar resultados.
-   Cuando se crea una relación padre-hijo entre entidades que tienen `Transform`,
    las transformaciones del padre afectan automáticamente a sus hijos.
