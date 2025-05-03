## BallCollider

El componente `BallCollider` define una forma de colisión circular para una entidad.  
Puede utilizarse tanto para detección de colisiones como para interacciones físicas.  
Permite especificar el radio y offset del colisionador, así como las capas con las que debe o no interactuar.

### Propiedades

| Propiedad                    | Tipo       | Descripción                                                                                                           |
| ---------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------- |
| `radius`                     | `number`   | Radio de la circunferencia (en píxeles o unidades de mundo).                                                          |
| `offset`                     | `Vector2`  | Desplazamiento desde el origen del `Transform`.                                                                       |
| `layer`                      | `string`   | Capa de colisión. Define con qué otras capas puede interactuar.                                                       |
| `physics`                    | `boolean`  | Si es `true`, el colisionador participará en las simulaciones físicas (requiere que la entidad tenga un `RigidBody`). |
| `ignoreCollisionsWithLayers` | `string[]` | Lista de capas con las que este colisionador no debería interactuar.                                                  |
| `shapes`                     | `Shape[]`  | **Uso interno**. Formas geométricas utilizadas por el sistema de detección de colisiones.                             |

### Ejemplo mínimo

```typescript
const ballCollider = new BallCollider({
    radius: 16,
    layer: "player",
});
```

### Ejemplo completo

```typescript
const ballCollider = new BallCollider({
    radius: 16,
    offset: new Vector2(0, 0),
    layer: "player",
    physics: true,
    ignoreCollisionsWithLayers: ["friendlyProjectiles"],
});
```

### Ejemplo de consulta de colisiones usando `CollisionRepository`

```typescript
// Obtener todas las colisiones del jugador
const collisions = collisionRepository.findCollisionsForCollider(ballCollider);

// Filtrar solo las colisiones contra enemigos
const enemyCollisions = collisionRepository.findCollisionsForColliderAndLayer(ballCollider, "enemy");

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
