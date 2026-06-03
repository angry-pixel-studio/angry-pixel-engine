# Introducción

Angry Pixel Engine es un motor de juegos 2D de código abierto escrito en TypeScript. Utiliza una arquitectura **Entidad-Componente-Sistema (ECS)** y organiza los juegos en **Escenas**.

Está escrito en TypeScript e incluye sus propias definiciones de tipos, por lo que funciona tanto en proyectos JavaScript como TypeScript sin paquetes de tipos adicionales.

## Características

- Arquitectura Entidad-Componente-Sistema (ECS): entidades, componentes y sistemas.
- Organización del juego basada en escenas.
- Bucle de juego de tres fases: lógica de juego, física y renderizado.
- Componentes integrados para renderizado, física y lógica de juego.
- Componentes y sistemas personalizados.
- Física 2D con detección de colisiones.
- Renderizado con WebGL.
- Entrada desde teclado, ratón, gamepads y pantallas táctiles.
- Biblioteca matemática: vectores, rectángulos y utilidades relacionadas.

## Plataformas

- **Navegador web**: el motor está construido de forma nativa para juegos en el navegador.
- **Escritorio (Windows, Linux, macOS)**: mediante frameworks como [Electron](https://www.electronjs.org/) o similares.
- **Móvil (Android, iOS)**: mediante frameworks como [React Native](https://reactnative.dev/) o similares.

## Licencia

Angry Pixel Engine se distribuye bajo la **licencia MIT**.

## Código fuente

- Repositorio: [GitHub](https://github.com/angry-pixel-studio/angry-pixel-engine)
