## Animator & Animation

El componente `Animator` gestiona animaciones de sprites.  
Contiene un mapa de animaciones (`Animation`) y controla cuál está reproduciéndose, su velocidad y su estado.  
Cada animación (`Animation`) define propiedades como la imagen de origen, las dimensiones de recorte (slice), la secuencia de cuadros (frames), la velocidad de reproducción (fps) y si debe repetirse en bucle.

---

### Animation

El objeto `Animation` configura una animación específica.

#### Propiedades

| Propiedad | Tipo                                                                 | Descripción                                                                                                                                      |
| --------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `image`   | `HTMLImageElement` \| `HTMLImageElement[]` \| `string` \| `string[]` | Imagen o imágenes que componen los cuadros de la animación.                                                                                      |
| `slice`   | `{ size: Vector2; offset?: Vector2; padding?: Vector2 }`             | Define el tamaño y desplazamiento de los cuadros si se usa una hoja de sprites (_sprite sheet_). No es necesario si se usa un array de imágenes. |
| `frames`  | `number[]`                                                           | Índices de cuadros a usar. Si no se especifica, se usarán todos secuencialmente.                                                                 |
| `fps`     | `number`                                                             | Cuadros por segundo de la animación.                                                                                                             |
| `loop`    | `boolean`                                                            | Si es `true`, la animación se repetirá indefinidamente.                                                                                          |

---

### Animator

El componente `Animator` administra múltiples animaciones y permite cambiar entre ellas, ajustar la velocidad y controlar la reproducción.

#### Propiedades

| Propiedad      | Tipo                     | Descripción                                                               |
| -------------- | ------------------------ | ------------------------------------------------------------------------- |
| `animations`   | `Map<string, Animation>` | Mapa de animaciones donde cada clave es un nombre de animación.           |
| `animation`    | `string`                 | Nombre de la animación actualmente seleccionada.                          |
| `speed`        | `number`                 | Multiplicador de velocidad de reproducción (por defecto `1`).             |
| `reset`        | `boolean`                | Si es `true`, reinicia la animación al primer cuadro en el próximo ciclo. |
| `playing`      | `boolean`                | `true` si la animación está reproduciéndose.                              |
| `currentFrame` | `number`                 | Cuadro actual (solo lectura).                                             |
| `currentTime`  | `number`                 | Tiempo acumulado de reproducción (solo lectura).                          |

---

### Ejemplo básico — animaciones con sprite sheet

```typescript
const walkAnimation = new Animation({
    image: "walk.png",
    slice: { size: new Vector2(32, 32) },
    frames: [0, 1, 2, 3, 4, 5],
    fps: 12,
    loop: true,
});

const idleAnimation = new Animation({
    image: "idle.png",
    slice: { size: new Vector2(32, 32) },
    frames: [6, 7, 8, 9],
    fps: 8,
    loop: true,
});

const animator = new Animator({
    animations: new Map([
        ["walk", walkAnimation],
        ["idle", idleAnimation],
    ]),
    animation: "idle",
    speed: 1,
    playing: true,
});
```

---

### Ejemplo alternativo — animaciones con array de imágenes

```typescript
const runAnimation = new Animation({
    image: [
        this.assetManager.getImage("run_frame0.png"),
        this.assetManager.getImage("run_frame1.png"),
        this.assetManager.getImage("run_frame2.png"),
        this.assetManager.getImage("run_frame3.png"),
    ],
    frames: [0, 1, 2, 3],
    fps: 10,
    loop: true,
});

const animator = new Animator({
    animations: new Map([["run", runAnimation]]),
    animation: "run",
    speed: 1,
    playing: true,
});
```

---

### Notas

-   Las animaciones deben estar precargadas y sus imágenes accesibles antes de asignarlas al `Animator`.
-   Puedes cambiar la animación activa asignando otro valor a `animation`. Ejemplo: `animator.animation = "walk"`; el cambio será procesado por el sistema de animaciones en el siguiente ciclo.
-   Para reiniciar una animación desde el primer cuadro, establece `animator.reset = true`.
-   El valor de `speed` permite ajustar la velocidad general de la animación sin modificar su `fps`.
-   Cuando se usa un array de imágenes (`image[]`), **no es necesario configurar un slice**.
