## BoxCollider

El componente `BoxCollider` define una forma de colisión rectangular para una entidad.  
Puede utilizarse tanto para detección de colisiones como para interacciones físicas.  
Permite especificar tamaño, rotación, offset y capas con las que debe o no interactuar.

### Propiedades

| Propiedad                    | Tipo       | Descripción                                                                                                           |
| ---------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------- |
| `layer`                      | `string`   | Capa de colisión. Define con qué otras capas puede interactuar.                                                       |
| `physics`                    | `boolean`  | Si es `true`, el colisionador participará en las simulaciones físicas (requiere que la entidad tenga un `RigidBody`). |
| `width`                      | `number`   | Ancho del rectángulo (en píxeles o unidades de mundo).                                                                |
| `height`                     | `number`   | Alto del rectángulo.                                                                                                  |
| `offset`                     | `Vector2`  | Desplazamiento desde el origen del `Transform`.                                                                       |
| `rotation`                   | `number`   | Rotación del colisionador en radianes.                                                                                |
| `ignoreCollisionsWithLayers` | `string[]` | Lista de capas con las que este colisionador no debería interactuar.                                                  |
| `shapes`                     | `Shape[]`  | **Uso interno**. Formas geométricas utilizadas por el sistema de detección de colisiones.                             |

### Ejemplo mínimo

```typescript
const boxCollider = new BoxCollider({
    width: 16,
    height: 16,
    layer: "player",
});
```

### Ejemplo completo

```typescript
const boxCollider = new BoxCollider({
    width: 16,
    height: 16,
    rotation: 0,
    offset: new Vector2(0, 0),
    layer: "player",
    physics: true,
    ignoreCollisionsWithLayers: ["friendlyProjectiles"],
});
```

### Ejemplo de consulta de colisiones usando `CollisionRepository`

```typescript
// Obtener todas las colisiones del jugador
const collisions = collisionRepository.findCollisionsForCollider(boxCollider);

// Filtrar solo las colisiones contra enemigos
const enemyCollisions = collisionRepository.findCollisionsForColliderAndLayer(boxCollider, "enemy");

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
-   La propiedad `rotation` solo afecta al colisionador, no a otros componentes como el `Transform` o `SpriteRenderer`.
