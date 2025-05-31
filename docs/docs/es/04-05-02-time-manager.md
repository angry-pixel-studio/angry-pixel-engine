# TimeManager

## Descripción general

El `TimeManager` administra todos los aspectos relacionados con el tiempo dentro del juego.  
Permite controlar la velocidad del tiempo (`timeScale`), calcular los delta times (tanto para render como para física), y configurar intervalos de tiempo personalizados que se pueden limpiar automáticamente al cambiar de escena.

## Responsabilidades

-   Gestionar la escala de tiempo (`timeScale`).
-   Calcular `deltaTime`, `physicsDeltaTime` y `renderDeltaTime`.
-   Controlar el framerate fijo del juego y de la física.
-   Permitir la creación y limpieza de intervalos temporales (`setInterval` y `clearInterval`).

## Ejemplo de uso

```typescript
// Usar deltaTime para incrementar un temporizador
this.timer += this.timeManager.deltaTime;

// Mover un objeto en física usando physicsDeltaTime
this.transform.position.x += velocidad * this.timeManager.physicsDeltaTime;

// Detener todas las interacciones relacionadas al tiempo
this.timeManager.timeScale = 0;

// Reducir la velocidad del tiempo
this.timeManager.timeScale = 0.5;

// Aumentar la velocidad del tiempo
this.timeManager.timeScale = 2;

// Crear un intervalo que se ejecutará hasta que la entidad sea destruida o deshabilitada
const intervaloId = timeManager.setInterval({
    callback: () => console.log("¡Se llamó 5 veces!"),
    delay: 1000,
    times: 5,
});

// Crear un intervalo que se ejecuta indefinidamente
const otroIntervalo = timeManager.setInterval({
    callback: () => console.log("¡Ejecutando indefinidamente!"),
    delay: 1000,
});

// Crear un intervalo que se ejecuta inmediatamente e indefinidamente
const inmediato = timeManager.setInterval({
    callback: () => console.log("¡Ejecutando de inmediato e indefinidamente!"),
    delay: 1000,
    executeImmediately: true,
});

// Crear un intervalo que se ejecutará hasta que la entidad sea destruida o deshabilitada
const intervaloId = timeManager.setInterval({
    callback: () => console.log("¡Ejecutando en una entidad!"),
    delay: 1000,
    entityRef: entity,
});

// Crear un intervalo que se ejecutará hasta que el componente sea destruido o deshabilitado
const intervaloId = timeManager.setInterval({
    callback: () => console.log("¡Ejecutando en un componente!"),
    delay: 1000,
    componentRef: component,
});

// Crear un intervalo que se ejecutará usando delta time sin escala
const intervaloId = timeManager.setInterval({
    callback: () => console.log("¡Ejecutando usando delta time sin escala!"),
    delay: 1000,
    useTimeScale: false,
});
```

## Cómo detener un intervalo

```typescript
// Para detener un intervalo específico
timeManager.clearInterval(intervaloId);

// Para detener todos los intervalos activos
timeManager.clearAllIntervals();
```

## Notas

-   Los `deltaTime` son valores en segundos.
-   Los intervalos configurados con `setInterval` se eliminan automáticamente al cambiar de escena.
-   Los intervalos configurados con `entityRef` o `componentRef` se eliminan automáticamente si la entidad o el componente referenciado se destruye o se deshabilita. Esto es muy útil para casos donde un elemento del juego deja de existir, por ejemplo, un enemigo que es eliminado.
-   Los intervalos configurados con `useTimeScale` establecido en `false` usarán el delta time sin escala.
-   La física y el render pueden tener tasas de framerate diferentes, ajustables en la configuración del juego (`GameConfig`).
