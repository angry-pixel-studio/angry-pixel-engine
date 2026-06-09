# Compilar el juego

Los juegos de Angry Pixel son juegos web: una compilación produce un conjunto de archivos estáticos (HTML, JavaScript y recursos) que se ejecutan en el navegador. Compilar para **web** es sencillo. También es posible apuntar a **escritorio** o **móvil**, pero depende de soluciones de terceros que envuelven la compilación web en un contenedor nativo.

> **Nota:** Las consolas no se contemplan. Las plataformas de consola no permiten aplicaciones compiladas con JIT (just-in-time), lo que descarta ejecutar en ellas un juego web/JavaScript.

## Compilar con el skeleton

El skeleton oficial (consulta [Primeros pasos](getting-started.md)) es un monorepo que compila una única base de código del juego para varias plataformas, con comandos integrados. Las compilaciones de escritorio y móvil envuelven la compilación web en lugar de reimplementar el juego, de modo que la misma base de código funciona en todas partes.

Depende de las siguientes herramientas de terceros:

| Plataforma | Comando | Herramienta |
|----------|---------|------|
| Web | `npm run build` | [Vite](https://vite.dev/) (compilación estática) |
| Escritorio (Windows, macOS, Linux) | `npm run build:desktop` | [Electron](https://www.electronjs.org/) |
| Móvil (Android) | `npm run build:android` | [Expo](https://expo.dev/) / EAS Build |

Consulta el `README.md` del skeleton para los detalles de configuración y los requisitos de cada plataforma.

## Configuraciones de compilación personalizadas

El motor en sí solo necesita un empaquetador capaz de producir una compilación web; no depende del skeleton. Los desarrolladores con experiencia pueden usar la cadena de herramientas que prefieran; por ejemplo [webpack](https://webpack.js.org/) o [Vite](https://vite.dev/) para la compilación web, y un contenedor nativo como [Electron](https://www.electronjs.org/) o [Tauri](https://tauri.app/) para escritorio. El motor no tiene requisitos de compilación especiales más allá de un empaquetador estándar de JavaScript/TypeScript.
