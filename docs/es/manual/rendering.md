# Renderizado

El motor renderiza con WebGL durante la fase de renderizado del [bucle de juego](../welcome/architecture.md). El renderizado se construye a partir de tres piezas:

- Una **cámara** decide qué capas se dibujan en la pantalla.
- Las **capas** agrupan lo que se dibuja y controlan el orden de dibujado.
- Los **componentes de renderizado** (sprites, texto, formas, etc.) producen lo visual.

Cada entidad renderizable necesita un [`Transform`](built-in-components/transform.md): los componentes de renderizado dibujan en la posición de la entidad, más su propio `offset`.

## Cámara

Una cámara es una entidad con un componente [`Camera`](built-in-components/camera.md) y un `Transform`. No se dibuja nada a menos que una cámara renderice la capa en la que está el contenido. Una escena necesita al menos una cámara.

```typescript
import { Transform, Camera } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new Camera({ layers: ["Default", "UI"], zoom: 1 }),
]);
```

El componente `Camera` tiene estas opciones:

| Opción | Tipo | Descripción |
|--------|------|-------------|
| `layers` | `string[]` | Las capas que renderiza esta cámara. |
| `zoom` | `number` | Nivel de zoom. Por defecto `1`. |
| `depth` | `number` | Con varias cámaras, la de menor profundidad se renderiza primero. Por defecto `0`. |
| `debug` | `boolean` | Renderiza datos de depuración cuando es `true`. Por defecto `false`. |

Se pueden usar varias cámaras a la vez —por ejemplo, una para el mundo del juego y otra para la interfaz—, ordenadas por su `depth`.

## Capas

Cada componente de renderizado tiene una propiedad `layer`: una cadena que nombra la capa a la que pertenece. Una cámara dibuja solo las capas listadas en su array `layers`, en el orden en que aparecen: las capas anteriores se dibujan primero (detrás) y las posteriores encima. El contenido de una capa que ninguna cámara renderiza no se dibuja.

```typescript
import { Transform, SpriteRenderer } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new SpriteRenderer({ image: this.assetManager.getImage("player.png"), layer: "Default" }),
]);
```

Los nombres de las capas son cadenas arbitrarias; elige una convención y usa los mismos nombres en tus componentes de renderizado y en tu cámara. Una práctica habitual es mantener los nombres de las capas en un archivo de configuración dentro de `src/config/`.

## Cargar imágenes

Las imágenes que usan los componentes de renderizado se cargan a través del [Asset Manager](asset-manager.md) con `loadImage`, normalmente en el método `loadAssets` de una escena. Una vez cargada, una imagen se obtiene con `getImage` y se pasa al componente de renderizado.

```typescript
import { Scene } from "angry-pixel";

export class MainScene extends Scene {
    loadAssets() {
        this.assetManager.loadImage("player.png");
    }
}
```

## Componentes de renderizado

El motor proporciona los siguientes componentes de renderizado. Consulta [Componentes integrados](built-in-components/index.md) para las opciones completas de cada uno.

| Componente | Renderiza |
|-----------|---------|
| [`SpriteRenderer`](built-in-components/sprite-renderer.md) | Imágenes (sprites). |
| [`TextRenderer`](built-in-components/text-renderer.md) | Texto. |
| [`TilemapRenderer`](built-in-components/tilemap-renderer.md) | Mapas basados en tiles a partir de una imagen de tileset. |
| [`MaskRenderer`](built-in-components/mask-renderer.md) | Formas rellenas (rectángulo, círculo, polígono). |
| [`GeometricRenderer`](built-in-components/geometric-renderer.md) | Formas y líneas huecas (solo contorno). |
| [`VideoRenderer`](built-in-components/video-renderer.md) | Contenido de vídeo. |
| [`LightRenderer`](built-in-components/light-renderer.md) | Una fuente de luz circular. Requiere un `DarknessRenderer` en la escena. |
| [`DarknessRenderer`](built-in-components/darkness-renderer.md) | Una máscara de oscuridad, afectada por los renderizadores de luz. |

Los sprites animados se controlan con el componente [`Animator`](built-in-components/animator.md) junto con un `SpriteRenderer`.

```typescript
import { Transform, TextRenderer, TextAlignment } from "angry-pixel";

this.entityManager.createEntity([
    new Transform(),
    new TextRenderer({
        text: "Score: 0",
        color: "#FFFFFF",
        fontSize: 24,
        layer: "UI",
        alignment: TextAlignment.Left,
    }),
]);
```
