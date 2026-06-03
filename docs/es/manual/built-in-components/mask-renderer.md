# MaskRenderer

El componente `MaskRenderer` renderiza una forma rellena: un rectángulo, un círculo o un polígono. Es útil para elementos de interfaz, efectos visuales o para enmascarar otro contenido. Usa el [`Transform`](transform.md) de la entidad para la posición. Consulta [Renderizado](../rendering.md) para una visión general.

## Opciones

| Opción | Tipo | Valor por defecto | Descripción |
|--------|------|---------|-------------|
| `shape` | `MaskShape` | — | `MaskShape.Rectangle`, `MaskShape.Circumference` o `MaskShape.Polygon`. |
| `width` | `number` | `0` | Ancho en píxeles. Solo para rectángulo. |
| `height` | `number` | `0` | Alto en píxeles. Solo para rectángulo. |
| `radius` | `number` | `0` | Radio en píxeles. Solo para circunferencia. |
| `vertexModel` | `Vector2[]` | `[]` | Vértices del polígono. Solo para polígono. |
| `color` | `string` | `"#000000"` | Color de relleno. |
| `offset` | `Vector2` | `(0, 0)` | Desplazamiento respecto a la posición de la entidad. |
| `rotation` | `number` | `0` | Rotación en radianes. |
| `opacity` | `number` | `1` | Opacidad entre `0` y `1`. |
| `layer` | `string` | `"Default"` | La capa de renderizado. |

## Ejemplo

```typescript
import { Transform, MaskRenderer, MaskShape } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new MaskRenderer({
        shape: MaskShape.Rectangle,
        width: 32,
        height: 32,
        color: "#000000",
        layer: "UI",
    }),
]);
```
