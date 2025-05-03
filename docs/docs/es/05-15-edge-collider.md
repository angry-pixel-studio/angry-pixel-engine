## EdgeCollider

El componente `EdgeCollider` define una forma de colisión compuesta por segmentos de línea conectados.  
Puede utilizarse tanto para detección de colisiones como para interacciones físicas.  
La forma se determina mediante una serie de vértices que crean aristas (edges) entre ellos.  
Permite aplicar desplazamiento y rotación, y especificar las capas de colisión.  
**A diferencia de otros colisionadores, el `EdgeCollider` permite definir áreas de colisión cóncavas.**

### Propiedades

| Propiedad                    | Tipo        | Descripción                                                                                                           |
| ---------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------- |
| `vertexModel`                | `Vector2[]` | Colección de vértices que definen los puntos que se conectarán mediante líneas (edges).                               |
| `offset`                     | `Vector2`   | Desplazamiento desde el origen del `Transform`.                                                                       |
| `rotation`                   | `number`    | Rotación de los segmentos en radianes.                                                                                |
| `layer`                      | `string`    | Capa de colisión. Define con qué otras capas puede interactuar.                                                       |
| `physics`                    | `boolean`   | Si es `true`, el colisionador participará en las simulaciones físicas (requiere que la entidad tenga un `RigidBody`). |
| `ignoreCollisionsWithLayers` | `string[]`  | Lista de capas con las que este colisionador no debería interactuar.                                                  |
| `shapes`                     | `Shape[]`   | **Uso interno**. Formas geométricas utilizadas por el sistema de detección de colisiones.                             |

### Ejemplo mínimo

```typescript
const edgeCollider = new EdgeCollider({
    vertexModel: [new Vector2(0, 16), new Vector2(16, 16)],
    layer: "ground",
});
```

### Ejemplo completo

```typescript
const edgeCollider = new EdgeCollider({
    vertexModel: [new Vector2(0, 16), new Vector2(16, 16)],
    rotation: 0,
    offset: new Vector2(0, 0),
    layer: "ground",
    physics: true,
    ignoreCollisionsWithLayers: ["ghost"],
});
```

### Ejemplo de consulta de colisiones usando `CollisionRepository`

```typescript
// Obtener todas las colisiones del jugador
const collisions = collisionRepository.findCollisionsForCollider(edgeCollider);

// Filtrar solo las colisiones contra enemigos
const enemyCollisions = collisionRepository.findCollisionsForColliderAndLayer(edgeCollider, "enemy");

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
-   Este tipo de colisionador es ideal para definir suelos, plataformas, paredes o límites del mapa usando segmentos de línea en lugar de áreas sólidas.
-   **Permite definir áreas de colisión cóncavas**, a diferencia del `PolygonCollider` que solo admite polígonos convexos.
