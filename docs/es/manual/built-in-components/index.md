# Componentes integrados

El motor incluye un conjunto de componentes integrados para funcionalidades habituales de los juegos. Se asocian a las entidades de la misma forma que los componentes personalizados, mediante el Entity Manager o los arquetipos. Consulta [Agregar entidades a la escena](../adding-entities-to-the-scene.md).

Los componentes se agrupan en tres categorías.

## Propósito general

| Componente | Descripción |
|-----------|-------------|
| [`Transform`](transform.md) | Define la posición, escala y rotación de una entidad en el mundo del juego. |
| [`Animator`](animator.md) | Gestiona animaciones de sprites mediante un mapa de animaciones con nombre. |
| [`AudioPlayer`](audio-player.md) | Reproduce, pausa y detiene fuentes de audio. |
| [`Button`](button.md) | Un botón interactivo que puede pulsarse o presionarse. |
| [`TiledWrapper`](tiled-wrapper.md) | Envuelve un tilemap del editor de mapas Tiled para usarlo con los componentes de tilemap. |

## Física

Consulta [Física](../physics.md) para ver cómo funcionan estos componentes en conjunto.

| Componente | Descripción |
|-----------|-------------|
| [`RigidBody`](rigid-body.md) | Habilita el movimiento físico bajo velocidad, aceleración y gravedad. |
| [`BoxCollider`](box-collider.md) | Forma de colisión rectangular. |
| [`BallCollider`](ball-collider.md) | Forma de colisión circular. |
| [`PolygonCollider`](polygon-collider.md) | Forma de colisión de polígono convexo. |
| [`EdgeCollider`](edge-collider.md) | Forma de colisión compuesta por segmentos de línea conectados. |
| [`TilemapCollider`](tilemap-collider.md) | Formas de colisión generadas a partir de los bordes de un tilemap. |

## Renderizado

Consulta [Renderizado](../rendering.md) para ver cómo funcionan en conjunto las cámaras, las capas y los componentes de renderizado.

| Componente | Descripción |
|-----------|-------------|
| [`Camera`](camera.md) | Controla qué capas se renderizan en la pantalla. |
| [`SpriteRenderer`](sprite-renderer.md) | Renderiza imágenes (sprites). |
| [`TextRenderer`](text-renderer.md) | Renderiza texto. |
| [`TilemapRenderer`](tilemap-renderer.md) | Renderiza mapas basados en tiles a partir de una imagen de tileset. |
| [`MaskRenderer`](mask-renderer.md) | Renderiza formas rellenas (rectángulo, círculo, polígono). |
| [`GeometricRenderer`](geometric-renderer.md) | Renderiza formas y líneas huecas (solo contorno). |
| [`LightRenderer`](light-renderer.md) | Renderiza una fuente de luz circular. Requiere un `DarknessRenderer` en la escena. |
| [`DarknessRenderer`](darkness-renderer.md) | Renderiza una máscara de oscuridad, afectada por los renderizadores de luz. |
| [`VideoRenderer`](video-renderer.md) | Renderiza contenido de vídeo. |
