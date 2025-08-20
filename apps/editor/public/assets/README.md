# Assets Públicos

Esta carpeta contiene archivos estáticos que se sirven directamente sin procesamiento.

## Tipos de archivos que puedes colocar aquí:

-   **Imágenes**: `.png`, `.jpg`, `.svg`, `.ico`
-   **Fuentes**: `.woff`, `.woff2`, `.ttf`
-   **Documentos**: `.pdf`, `.txt`
-   **Otros**: `.json`, `.xml`

## Cómo usar en tu código:

```javascript
// En React/TypeScript
const imageUrl = '/assets/my-image.png'
const iconUrl = '/assets/icons/icon.svg'

// En CSS
.background {
  background-image: url('/assets/background.jpg');
}
```

## Notas importantes:

-   Los archivos se copian directamente al directorio `dist/` durante el build
-   No se procesan ni optimizan automáticamente
-   Las rutas siempre empiezan con `/` (no con `./`)
-   Ideal para archivos grandes que no necesitan procesamiento
