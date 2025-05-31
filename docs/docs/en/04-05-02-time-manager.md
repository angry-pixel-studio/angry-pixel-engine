# TimeManager

## Overview

The `TimeManager` handles all time-related aspects within the game.  
It allows controlling the time scale (`timeScale`), calculating delta times (for both render and physics), and setting up custom intervals which are automatically cleared when switching scenes.

## Responsibilities

-   Manage the time scale (`timeScale`).
-   Calculate `deltaTime`, `physicsDeltaTime`, and `renderDeltaTime`.
-   Control the fixed framerate for the game and physics.
-   Provide methods to create and clear timed intervals (`setInterval` and `clearInterval`).

## Usage Example

```typescript
// Using deltaTime to increment a timer
this.timer += this.timeManager.deltaTime;

// Moving an object in physics using physicsDeltaTime
this.transform.position.x += speed * this.timeManager.physicsDeltaTime;

// Stop all time-related actions
this.timeManager.timeScale = 0;

// Slow down time
this.timeManager.timeScale = 0.5;

// Speed up time
this.timeManager.timeScale = 2;

// Create an interval that runs 5 times
const intervalId = timeManager.setInterval({
    callback: () => console.log("Will be called 5 times!"),
    delay: 1000,
    times: 5,
});

// Create an interval that runs indefinitely
const anotherInterval = timeManager.setInterval({
    callback: () => console.log("Running indefinitely!"),
    delay: 1000,
});

// Create an interval that runs immediately and indefinitely
const immediate = timeManager.setInterval({
    callback: () => console.log("Running immediately and indefinitely!"),
    delay: 1000,
    executeImmediately: true,
});

// Create an interval that runs until the entity is disabled or destroyed
const intervalId = timeManager.setInterval({
    callback: () => console.log("Will be called until the entity is disabled or destroyed!"),
    delay: 1000,
    entityRef: entity,
});

// Create an interval that runs until the component is disabled or destroyed
const intervalId = timeManager.setInterval({
    callback: () => console.log("Will be called until the component is disabled or destroyed!"),
    delay: 1000,
    componentRef: component,
});

// Create an interval that runs using unscaled delta time
const intervalId = timeManager.setInterval({
    callback: () => console.log("Will be called using unscaled delta time!"),
    delay: 1000,
    useTimeScale: false,
});
```

## How to stop an interval

```typescript
// To stop a specific interval
timeManager.clearInterval(intervalId);

// To stop all active intervals
timeManager.clearAllIntervals();
```

## Notes

-   `deltaTime` values are measured in seconds.
-   Intervals set with `setInterval` are automatically cleared when switching scenes.
-   Intervals set with `entityRef` or `componentRef` are automatically cleared when the entity or component is disabled or destroyed. This is very useful for cases where an element of the game ceases to exist, for example, an enemy that is deleted.
-   Intervals set with `useTimeScale` set to false will use the unscaled delta time.
-   Physics and render may have different framerate settings, configurable via `GameConfig`.
