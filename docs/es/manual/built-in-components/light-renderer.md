# LightRenderer

El componente `LightRenderer` renderiza una fuente de luz circular. Funciona iluminando zonas dentro de una máscara de oscuridad, por lo que requiere un [`DarknessRenderer`](darkness-renderer.md) en la escena para tener algún efecto. Usa el [`Transform`](transform.md) de la entidad para la posición. Consulta [Renderizado](../rendering.md) para una visión general.

## Opciones

| Opción | Tipo | Valor por defecto | Descripción |
|--------|------|---------|-------------|
| `radius` | `number` | `0` | Radio de la luz. |
| `intensity` | `number` | `1` | Intensidad de la luz entre `0` y `1`. |
| `smooth` | `boolean` | `false` | Suaviza el borde de la luz. |
| `steps` | `number` | `0` | Cantidad de anillos de opacidad de una luz suave. `0` significa un desvanecimiento continuo. |
| `layer` | `string` | `"Default"` | La capa de oscuridad a la que afecta esta luz. |
| `color` | `string` | `undefined` | Color del brillo en hexadecimal (`#RRGGBB`), sumado sobre la zona iluminada. Su fuerza la define `intensity`. Sin brillo si no se define. |

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
        color: "#FF9900",
    }),
]);
```

El `layer` debe coincidir con la capa del [`DarknessRenderer`](darkness-renderer.md) que ilumina.

## Píxeles de luz

La luz se calcula una vez por unidad del mundo, así que con un zoom de cámara de `4` cada píxel de luz cubre 4×4 píxeles de pantalla. Los centros de las luces se ajustan a unidades enteras del mundo. Con `smooth` activado y `steps` mayor que `0`, la luz se desvanece en esa cantidad de anillos, cada uno dibujado con píxeles de luz enteros. El brillo de `color` sigue el mismo desvanecimiento, anillos y píxeles.

Cada `DarknessRenderer` dibuja hasta 256 luces en pantalla; las GPU con menos espacio de uniforms permiten menos. Las luces fuera de la pantalla se omiten y no cuentan.
