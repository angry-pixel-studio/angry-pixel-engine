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

// Crear un intervalo que se ejecuta 5 veces
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
-   La física y el render pueden tener tasas de framerate diferentes, ajustables en la configuración del juego (`GameConfig`).
