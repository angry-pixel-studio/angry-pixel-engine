# Crear un proyecto JavaScript con Vite

Si quieres trabajar con JavaScript puro:

### Paso 1: Crear el proyecto con Vite

```bash
npm create vite@latest mi-juego -- --template vanilla
cd mi-juego
```

### Paso 2: Instalar Angry Pixel Engine

```bash
npm install angry-pixel
```

### Paso 3: Limpiar archivos innecesarios

Dentro de la carpeta `src`, elimina todos los archivos excepto `main.js` y `style.css`.

Elimina también el archivo `counter.js` si existe.

### Paso 4: Reemplazar el contenido de `style.css`

Edita el archivo `src/style.css` y reemplázalo con el siguiente contenido:

```css
* {
    margin: 0;
    padding: 0;
}

body {
    background-color: black;
    overflow: hidden;
}

#app {
    margin-left: auto;
    margin-right: auto;
    height: 100vh;
    aspect-ratio: 16/9;
}

#app canvas {
    width: 100%;
    height: 100%;
    outline: none;
}
```

> Nota: El valor de `aspect-ratio` está establecido en `16/9` porque en el ejemplo se utiliza una resolución de **1920x1080**. Debes ajustar este valor si eliges una resolución diferente para tu juego.

### Paso 5: Editar `index.html`

Abre el archivo `index.html` (en la raíz del proyecto) y asegúrate de que contenga el siguiente elemento dentro de `<body>`:

```html
<div id="app"></div>
<script type="module" src="/src/main.js"></script>
```

Si el `div id="app"` no existe, agrégalo.

### Paso 6: Editar `src/main.js`

Reemplaza el contenido de `src/main.js` con:

```javascript
import "./style.css";
import { Game } from "angry-pixel";

const game = new Game({
    containerNode: document.getElementById("app"),
    width: 1920,
    height: 1080,
});

game.start();
```

> Nota: Es importante importar el archivo `style.css` en `main.js` para que los estilos se apliquen correctamente.

### Paso 7: Agregar assets

Todos los archivos de assets (imágenes, sonidos, videos, etc.) deben guardarse dentro de la carpeta `public` que ya incluye el proyecto Vite por defecto.

Por ejemplo:

```plaintext
/public/sprites/personaje.png
```

Puedes acceder a estos archivos en tu código con rutas relativas a `public`:

```javascript
const spritePath = "/sprites/personaje.png";
```

### Paso 8: Ejecutar el proyecto en modo desarrollo

```bash
npm run dev
```

Vite abrirá tu juego en el navegador.  
Cualquier cambio que hagas se actualizará automáticamente gracias al recargado en caliente (_Hot Module Replacement_).

### Paso 9: Generar el bundle de producción

Cuando tu juego esté listo para producción:

```bash
npm run build
```

Vite creará una carpeta `dist/` con todos los archivos listos para distribución.

> **Nota**: Si deseas compartir o publicar tu juego en plataformas como [itch.io](https://itch.io), [Game Jolt](https://gamejolt.com), entre otras, debes subir el contenido de la carpeta `dist`.  
> Por lo general, se comprime todo el contenido de `dist` en un archivo `.zip` para facilitar la distribución.

---

**✅ Estructura final típica del proyecto:**

```plaintext
mi-juego/
├── index.html
├── package.json
├── public/
│   └── (tus assets, ej. sprites, sonidos, etc.)
├── src/
│   ├── main.js
│   └── style.css
├── node_modules/
├── vite.config.js (opcional)
└── dist/ (generada después de correr npm run build)
```
