# Buenas prácticas

## Optimizaciones

- Para operaciones repetitivas, reutiliza instancias de objetos como [`Vector2`](maths/vector2.md) o [`Rectangle`](maths/rectangle.md). Crear nuevas instancias en cada frame es costoso y genera basura de memoria. Las operaciones estáticas de [`Vector2`](maths/vector2.md) lo permiten directamente: métodos como `Vector2.add(out, a, b)` escriben el resultado en un vector de salida que tú proporcionas, de modo que el mismo vector puede reutilizarse en lugar de reservar uno nuevo en cada frame.
- En los bucles por frame, prefiere la forma con callback de `entityManager.search`. Itera las entidades directamente sin reservar un array intermedio, a diferencia de la forma que devuelve una colección. Consulta [El Entity Manager](entity-manager.md).
- Desactiva entidades y componentes en lugar de destruirlos y recrearlos. Las entidades desactivadas son omitidas por los sistemas, por lo que alternarlas es más barato que crear y eliminar entidades repetidamente (una forma de object pooling).
- Ajusta la frecuencia del motor de física (`physicsFramerate`) según el tipo de juego y sus requisitos de rendimiento. Consulta [La clase Game](game-class.md).
- En los sistemas donde un componente solo tendrá una única instancia, cachear el componente puede evitar búsquedas innecesarias.

  > **Nota:** Si la entidad o el componente puede eliminarse o desactivarse en tiempo de ejecución, una referencia cacheada puede provocar errores si no se gestiona correctamente.

- Prefiere los cuerpos rígidos `Static` y `Kinematic` frente a `Dynamic` cuando no se necesita una simulación física completa. Los cuerpos `Static` son los más eficientes, y los `Kinematic` son más eficientes que los `Dynamic`. Consulta [Física](physics.md).
- Limita las comprobaciones de colisión configurando la matriz de colisiones y usando `ignoreCollisionsWithLayers`. Menos pares de capas significa menos comprobaciones. Consulta [Física](physics.md).
- Para los tilemaps usados como geometría de colisión, establece `composite: true` en el [`TilemapCollider`](built-in-components/tilemap-collider.md) para generar segmentos de borde conectados en lugar de un colisionador por tile. Para renderizar tilemaps grandes, usa la opción `chunks` del [`TilemapRenderer`](built-in-components/tilemap-renderer.md).
- Para juegos con muchas entidades físicas, prueba distintos métodos de fase amplia, como quad tree o spatial grid. Consulta [Física](physics.md).
- Evalúa el método de detección de colisiones:
    - **AABB:** muy rápido, pero limitado a rectángulos y círculos no rotados.
    - **SAT:** computacionalmente más costoso, pero admite colisiones entre polígonos arbitrarios.

## Limitaciones de rendimiento en juegos web

Debido a la naturaleza de los navegadores y al uso de lenguajes interpretados o compilados con JIT (como JavaScript y TypeScript), un juego web nunca alcanzará el mismo rendimiento que un juego desarrollado en un lenguaje compilado como C++ o Rust. Esto se debe a:

- La sobrecarga de la recolección de basura (garbage collection).
- Las limitaciones de hilos y concurrencia en los navegadores.
- La sobrecarga de las APIs web (como WebGL frente a gráficos nativos).

Aun así, con buenas prácticas y optimizaciones, se puede lograr un rendimiento excelente y escalable para juegos 2D.
