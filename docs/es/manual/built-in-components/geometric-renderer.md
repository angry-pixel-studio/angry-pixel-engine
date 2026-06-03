# GeometricRenderer

El componente `GeometricRenderer` dibuja geometría hueca (solo contorno): contornos de polígonos, líneas y contornos de círculos. Usa el [`Transform`](transform.md) de la entidad para la posición, escala y rotación. Consulta [Renderizado](../rendering.md) para una visión general.

## Opciones

| Opción | Tipo | Valor por defecto | Descripción |
|--------|------|---------|-------------|
| `shape` | `GeometricShape` | `GeometricShape.Polygon` | `GeometricShape.Polygon`, `GeometricShape.Line` o `GeometricShape.Circumference`. |
| `color` | `string` | `"#FFFFFF"` | Color del trazo. |
| `vertexModel` | `Vector2[]` | `[]` | Vértices en espacio local. Para `Polygon`, al menos tres puntos (dibujados como un bucle cerrado). Para `Line`, un número par de puntos (pares). Se ignora para `Circumference`. |
| `radius` | `number` | `0` | Radio en píxeles. Solo para circunferencia. |
| `offset` | `Vector2` | `(0, 0)` | Desplazamiento respecto a la posición de la entidad. |
| `rotation` | `number` | `0` | Rotación en radianes, sumada a la rotación del Transform. |
| `layer` | `string` | `"Default"` | La capa de renderizado. |

No se dibuja nada si la geometría no es válida: una circunferencia necesita `radius > 0`, un polígono necesita al menos tres vértices, y una línea necesita al menos dos vértices y un número par.

## Ejemplo

```typescript
import { Transform, GeometricRenderer, GeometricShape, Vector2 } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new GeometricRenderer({
        shape: GeometricShape.Circumference,
        color: "#00FF88",
        radius: 32,
        layer: "Default",
    }),
]);
```
