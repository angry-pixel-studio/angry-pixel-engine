## TilemapCollider

El componente `TilemapCollider` genera automáticamente formas de colisión para los bordes de un `tilemap`.  
Puede utilizarse tanto para detección de colisiones como para interacciones físicas.  
Permite elegir entre colisionadores individuales para cada tile o colisionadores compuestos que optimizan el rendimiento al unir segmentos conectados.  
**Para que este componente tenga sentido, la entidad debe poseer también un `TilemapRenderer` que defina el tilemap del cual se derivarán las colisiones.**

**Limitaciones:** Las formas de colisión se generan una sola vez y no pueden modificarse después de la creación. Para actualizar las colisiones, se debe crear una nueva instancia de `TilemapCollider`.

### Propiedades

| Propiedad                    | Tipo       | Descripción                                                                                                                                                                                   |
| ---------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `composite`                  | `boolean`  | Si es `true`, genera segmentos de línea conectados que siguen los bordes exteriores del `tilemap`. Si es `false`, crea colisionadores rectangulares individuales para cada tile con colisión. |
| `layer`                      | `string`   | Capa de colisión. Define con qué otras capas puede interactuar.                                                                                                                               |
| `ignoreCollisionsWithLayers` | `string[]` | Lista de capas con las que este colisionador no debería interactuar.                                                                                                                          |
| `offset`                     | `Vector2`  | Desplazamiento desde el origen del `Transform`.                                                                                                                                               |
| `physics`                    | `boolean`  | Si es `true`, el colisionador participará en las simulaciones físicas (requiere que la entidad tenga un `RigidBody`).                                                                         |
| `shapes`                     | `Shape[]`  | **Uso interno**. Formas geométricas utilizadas por el sistema de detección de colisiones.                                                                                                     |

### Ejemplo mínimo

```typescript
const tilemapCollider = new TilemapCollider({
    composite: true,
    layer: "ground",
});
```

### Ejemplo completo

```typescript
const tilemapCollider = new TilemapCollider({
    composite: true,
    offset: new Vector2(0, 0),
    layer: "ground",
    physics: true,
    ignoreCollisionsWithLayers: ["ghost"],
});
```

### Ejemplo de consulta de colisiones usando `CollisionRepository`

```typescript
// Obtener todas las colisiones del tilemap
const collisions = collisionRepository.findCollisionsForCollider(tilemapCollider);

// Filtrar solo las colisiones contra enemigos
const enemyCollisions = collisionRepository.findCollisionsForColliderAndLayer(tilemapCollider, "enemy");

for (const collision of enemyCollisions) {
    console.log(`Colisión con entidad ID: ${collision.remoteEntity}`);
    console.log(`Dirección de colisión: ${collision.resolution.direction}`);
    console.log(`Profundidad de penetración: ${collision.resolution.penetration}`);
}
```

### Notas

-   Si `physics` es `false`, el colisionador solo servirá para detectar colisiones pero no moverá la entidad cuando ocurra una penetración.
-   La propiedad `physics` **solo tiene efecto si la entidad posee además un `RigidBody`**.
-   `ignoreCollisionsWithLayers` permite excluir dinámicamente capas enteras de colisión sin necesidad de cambiar la lógica del sistema de físicas.
-   Al usar `composite: true`, el colisionador genera menos formas y mejora el rendimiento para grandes tilemaps.
-   Las formas de colisión **no pueden modificarse después de su creación**. Para cambiar el mapa de colisión se debe crear un nuevo `TilemapCollider`.
-   **Requiere que la entidad tenga también un `TilemapRenderer` que defina el tilemap utilizado para generar las colisiones**.
