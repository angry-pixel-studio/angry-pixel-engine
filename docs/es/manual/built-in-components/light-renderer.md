# LightRenderer

El componente `LightRenderer` renderiza una fuente de luz circular. Funciona iluminando zonas dentro de una máscara de oscuridad, por lo que requiere un [`DarknessRenderer`](darkness-renderer.md) en la escena para tener algún efecto. Usa el [`Transform`](transform.md) de la entidad para la posición. Consulta [Renderizado](../rendering.md) para una visión general.

## Opciones

| Opción | Tipo | Valor por defecto | Descripción |
|--------|------|---------|-------------|
| `radius` | `number` | `0` | Radio de la luz. |
| `intensity` | `number` | `1` | Intensidad de la luz entre `0` y `1`. |
| `smooth` | `boolean` | `false` | Suaviza el borde de la luz. |
| `layer` | `string` | `"Default"` | La capa de oscuridad a la que afecta esta luz. |

## Ejemplo

```typescript
import { Transform, LightRenderer } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new LightRenderer({
        radius: 100,
        intensity: 0.8,
        smooth: true,
        layer: "Darkness",
    }),
]);
```

El `layer` debe coincidir con la capa del [`DarknessRenderer`](darkness-renderer.md) que ilumina.
