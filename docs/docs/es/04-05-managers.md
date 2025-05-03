# Managers

## Resumen general

En el motor, los **Managers** son clases singleton que encapsulan funcionalidades clave y proveen servicios globales accesibles desde cualquier parte del juego.  
Cada manager se ocupa de una responsabilidad bien definida y mantiene estado persistente mientras la aplicación está en ejecución.

## Managers disponibles

| Manager           | Descripción breve                                                                 |
| ----------------- | --------------------------------------------------------------------------------- |
| **EntityManager** | Gestión de entidades y componentes. Creación, destrucción y consultas.            |
| **AssetManager**  | Carga y gestión de recursos (imágenes, audio, video, fuentes, JSON).              |
| **SceneManager**  | Control de escenas: registro, carga, lifecycle, limpieza de entidades y sistemas. |
| **TimeManager**   | Control del tiempo: delta time, escalado de tiempo, intervalos personalizados.    |
| **InputManager**  | Entrada de usuario unificada: teclado, mouse, pantalla táctil y gamepads.         |
