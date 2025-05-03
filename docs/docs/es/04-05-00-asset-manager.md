# AssetManager

## Resumen

El `AssetManager` es responsable de cargar y gestionar todos los tipos de recursos del juego, incluyendo imágenes, audio, fuentes, videos y datos JSON.  
Proporciona métodos convenientes para cargar recursos de manera asíncrona y recuperarlos por su URL o por un nombre definido por el usuario.

## Responsabilidades

-   Cargar y rastrear imágenes, audio, fuentes, videos y archivos JSON.
-   Proporcionar acceso a los recursos cargados mediante URL o nombre.
-   Realizar un seguimiento del estado de carga de todos los recursos.
-   Gestionar automáticamente la caché de recursos para evitar cargas duplicadas.

## Ejemplo de uso

```typescript
// Cargar recursos
this.assetManager.loadImage("player.png");
this.assetManager.loadAudio("explosion.ogg");
this.assetManager.loadFont("my-font", "font.ttf");
this.assetManager.loadJson("level-data.json");

// Obtener recursos
const image = this.assetManager.getImage("player.png");
const audio = this.assetManager.getAudio("explosion.ogg");
const font = this.assetManager.getFont("my-font");
const data = this.assetManager.getJson("level-data.json");

// Comprobar si todos los recursos están cargados
if (this.assetManager.getAssetsLoaded()) {
    // Todos los recursos están listos
}
```

## Tipos de recursos soportados

| Tipo   | Métodos                     |
| ------ | --------------------------- |
| Imagen | `loadImage()`, `getImage()` |
| Audio  | `loadAudio()`, `getAudio()` |
| Fuente | `loadFont()`, `getFont()`   |
| Video  | `loadVideo()`, `getVideo()` |
| JSON   | `loadJson()`, `getJson()`   |

## Notas

-   Cada recurso puede recuperarse ya sea por su URL o por un nombre personalizado especificado al momento de cargarlo.
-   Las fuentes se agregan automáticamente a `document.fonts` y pueden utilizarse inmediatamente en los contextos de renderizado.
