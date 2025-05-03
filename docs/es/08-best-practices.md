# Buenas prácticas

Esta sección recopila recomendaciones y patrones sugeridos para trabajar de forma eficiente con Angry Pixel Engine.

## Estructura de directorios recomendada

```plaintext
src
├── main.js / main.ts     (Aquí se debe instanciar Game)
├── config
│       ├── config.js / config.ts   (Configuración general del juego)
│       ├── assets.js / assets.ts   (Listado de assets)
│       ├── layers.js / layers.ts   (Listado de capas para renderizado y colisiones)
│       └── otros archivos de configuración
├── component     (Componentes personalizados)
├── entity        (Arquetipos o fábricas de arrays de componentes)
├── system        (Sistemas personalizados)
└── scene         (Escenas del juego)
```

## Optimizaciones

-   Para operaciones repetitivas, **reutilizar instancias** de objetos como `Vector2` o `Rectangle`.  
    Crear nuevas instancias en cada frame es costoso y puede generar basura de memoria.
-   Ajustar adecuadamente la **frecuencia del motor de físicas** según el tipo de juego y las necesidades de rendimiento.

-   En sistemas donde un componente solo tendrá una instancia, **cachear el componente** puede evitar búsquedas innecesarias.  
    _Nota:_ Si la entidad o componente puede ser eliminado o deshabilitado durante el runtime, esto podría generar errores si no se maneja correctamente.

-   Para juegos con muchas entidades físicas, es recomendable **probar diferentes métodos de broad phase**, como **quadtree** o **spatial grid**.

-   Evaluar el tipo de detección de colisiones:
    -   **AABB**: muy rápida pero limitada a rectángulos sin rotación y círculos.
    -   **SAT**: más costosa computacionalmente pero permite colisiones entre polígonos arbitrarios.

## Limitaciones de rendimiento en juegos web

Por la naturaleza de los navegadores y el uso de lenguajes interpretados o JIT (como JavaScript/TypeScript), un juego web **nunca tendrá el mismo rendimiento** que un juego desarrollado en un lenguaje compilado como C++ o Rust.  
Esto se debe a:

-   Recolección de basura (garbage collection).
-   Limitaciones del threading y concurrencia en el navegador.
-   Overhead de las API web (como WebGL frente a gráficos nativos).
-   Restricciones de seguridad y sandboxing.

Aun así, con buenas prácticas y optimizaciones, es posible lograr un rendimiento excelente y escalable para juegos 2D.
