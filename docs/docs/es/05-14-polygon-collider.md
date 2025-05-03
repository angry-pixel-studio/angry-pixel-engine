## PolygonCollider

El componente `PolygonCollider` define una zona de colisión con forma de polígono convexo para una entidad.  
Puede utilizarse tanto para detección de colisiones como para interacciones físicas.  
La forma se determina mediante una serie de vértices que forman un polígono convexo cerrado.  
Nota: solo se admiten polígonos convexos. Las formas cóncavas deben dividirse en múltiples polígonos convexos.

### Propiedades

| Propiedad                    | Tipo        | Descripción                                                                                                           |
| ---------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------- |
| `vertexModel`                | `Vector2[]` | Colección de vértices que definen el contorno del polígono.                                                           |
| `offset`                     | `Vector2`   | Desplazamiento desde el origen del `Transform`.                                                                       |
| `rotation`                   | `number`    | Rotación de los bordes en radianes.                                                                                   |
| `layer`                      | `string`    | Capa de colisión. Define con qué otras capas puede interactuar.                                                       |
| `physics`                    | `boolean`   | Si es `true`, el colisionador participará en las simulaciones físicas (requiere que la entidad tenga un `RigidBody`). |
| `ignoreCollisionsWithLayers` | `string[]`  | Lista de capas con las que este colisionador no debería interactuar.                                                  |
| `shapes`                     | `Shape[]`   | **Uso interno**. Formas geométricas utilizadas por el sistema de detección de colisiones.                             |

### Ejemplo mínimo

```typescript
const polygonCollider = new PolygonCollider({
    vertexModel: [new Vector2(0, 16), new Vector2(16, 16), new Vector2(16, 0), new Vector2(0, 0)],
    layer: "player",
});
```

### Ejemplo completo

```typescript
const polygonCollider = new PolygonCollider({
    vertexModel: [new Vector2(0, 16), new Vector2(16, 16), new Vector2(16, 0), new Vector2(0, 0)],
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
const collisions = collisionRepository.findCollisionsForCollider(polygonCollider);

// Filtrar solo las colisiones contra enemigos
const enemyCollisions = collisionRepository.findCollisionsForColliderAndLayer(polygonCollider, "enemy");

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
-   Solo se admiten **polígonos convexos**. Las formas cóncavas deben dividirse en varios polígonos convexos si es necesario.
