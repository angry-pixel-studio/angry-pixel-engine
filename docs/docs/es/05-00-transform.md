## Transform

El componente `Transform` define la posición, escala y rotación de una entidad en el mundo del juego.  
Permite establecer relaciones jerárquicas, de modo que un transform pueda ser hijo de otro, haciendo que herede y combine las transformaciones de su padre.

Este componente ofrece tanto valores en espacio local como en espacio mundial y permite ignorar selectivamente las transformaciones del padre (posición, escala y rotación).

### Propiedades

| Propiedad                        | Tipo      | Descripción                                                             |
| -------------------------------- | --------- | ----------------------------------------------------------------------- |
| `position`                       | `Vector2` | Posición relativa al origen del mundo simulado o al padre si tiene uno. |
| `scale`                          | `Vector2` | Escala en los ejes X e Y.                                               |
| `rotation`                       | `number`  | Rotación expresada en radianes.                                         |
| `ignoreParentPosition`           | `boolean` | Si es `true`, ignorará la posición del padre.                           |
| `ignoreParentScale`              | `boolean` | Si es `true`, ignorará la escala del padre.                             |
| `ignoreParentRotation`           | `boolean` | Si es `true`, ignorará la rotación del padre.                           |
| `localPosition` _(solo lectura)_ | `Vector2` | Posición real en el mundo (igual a `position` si no hay padre).         |
| `localScale` _(solo lectura)_    | `Vector2` | Escala real en el mundo (igual a `scale` si no hay padre).              |
| `localRotation` _(solo lectura)_ | `number`  | Rotación real en el mundo (igual a `rotation` si no hay padre).         |

### Ejemplo

```typescript
const transform = new Transform({
    position: new Vector2(100, 100),
    scale: new Vector2(2, 2),
    rotation: Math.PI / 4,
});
```

### Notas

-   Los _transforms_ jerárquicos permiten crear potentes relaciones padre-hijo para agrupar entidades.
-   Las propiedades `ignoreParent*` ofrecen flexibilidad para anular las transformaciones heredadas.
