# DarknessRenderer

El componente `DarknessRenderer` renderiza una máscara de oscuridad rectangular. Funciona junto con componentes [`LightRenderer`](light-renderer.md): las luces que intersecan la máscara recortan zonas iluminadas en ella. Usa el [`Transform`](transform.md) de la entidad para la posición. Consulta [Renderizado](../rendering.md) para una visión general.

## Opciones

| Opción | Tipo | Valor por defecto | Descripción |
|--------|------|---------|-------------|
| `width` | `number` | `0` | Ancho del rectángulo de oscuridad. |
| `height` | `number` | `0` | Alto del rectángulo de oscuridad. |
| `color` | `string` | `"#000000"` | Color de la oscuridad. |
| `opacity` | `number` | `1` | Opacidad entre `0` y `1`. |
| `layer` | `string` | `"Default"` | La capa de renderizado. |

## Ejemplo

```typescript
import { Transform, DarknessRenderer } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new DarknessRenderer({
        width: 1920,
        height: 1080,
        color: "#000000",
        opacity: 1,
        layer: "Darkness",
    }),
]);
```

Los componentes [`LightRenderer`](light-renderer.md) en la misma capa iluminan esta máscara.
