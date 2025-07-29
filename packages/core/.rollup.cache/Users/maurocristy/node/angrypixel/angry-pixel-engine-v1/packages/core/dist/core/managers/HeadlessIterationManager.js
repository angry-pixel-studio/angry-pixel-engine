import { FrameEvent } from "./IterationManager";
/** @internal */
export class HeadlessIterationManager {
    constructor(timeManager, physicsManager, gameObjectManager, sceneManager) {
        this.timeManager = timeManager;
        this.physicsManager = physicsManager;
        this.gameObjectManager = gameObjectManager;
        this.sceneManager = sceneManager;
        this.running = false;
        this.gameObjects = [];
        this.components = [];
        this.changingScene = false;
        this.sceneEvents = [FrameEvent.Start, FrameEvent.Update, FrameEvent.StopGame];
        this.gameObjectEvents = [FrameEvent.Start, FrameEvent.Update];
    }
    start() {
        this.startLoop(true);
    }
    pause() {
        this.running = false;
    }
    resume() {
        this.startLoop(false);
    }
    stop() {
        this.running = false;
        this.dispatchFrameEvent(FrameEvent.StopGame);
        this.physicsManager.clear();
    }
    startLoop(loadOpeningScene) {
        if (this.running) {
            return;
        }
        this.running = true;
        if (loadOpeningScene) {
            this.sceneManager.loadOpeningScene();
        }
        this.asyncGameLoop();
        // physics fixed at its own frame rate
        if (this.timeManager.gameFramerate !== this.timeManager.physicsFramerate) {
            this.asyncPhysicsLoop();
        }
    }
    gameLogicIteration(time) {
        this.timeManager.updateForGame(time);
        if (this.sceneManager.pendingSceneToload()) {
            this.sceneManager.loadPendingScene();
            this.changingScene = false;
        }
        this.load();
        // starts all game objects and components
        this.dispatchFrameEvent(FrameEvent.Start);
        // updates all game objects and custom components
        this.dispatchFrameEvent(FrameEvent.Update);
        // updates engine components
        this.dispatchFrameEvent(FrameEvent.UpdateEngine);
        // updates transform components
        this.dispatchFrameEvent(FrameEvent.UpdateTransform);
        // physics fixed at game frame rate
        if (this.timeManager.gameFramerate === this.timeManager.physicsFramerate) {
            this.timeManager.updateForPhysics(time);
            this.physicsIteration();
        }
        if (this.sceneManager.pendingSceneToload()) {
            this.changingScene = true;
            this.sceneManager.unloadCurrentScene();
        }
    }
    physicsIteration() {
        if (this.timeManager.timeScale <= 0 || this.changingScene)
            return;
        this.dispatchFrameEvent(FrameEvent.UpdatePhysics);
        this.dispatchFrameEvent(FrameEvent.UpdateCollider);
        this.dispatchFrameEvent(FrameEvent.UpdateTransform);
        this.physicsManager.resolve(this.timeManager.physicsDeltaTime);
    }
    asyncGameLoop() {
        this.gameInterval = setInterval(() => {
            if (!this.running)
                return clearInterval(this.gameInterval);
            this.gameLogicIteration(process.uptime());
        }, 1000 / this.timeManager.gameFramerate);
    }
    asyncPhysicsLoop() {
        this.physicsInterval = setInterval(() => {
            if (!this.running)
                return clearInterval(this.physicsInterval);
            this.timeManager.updateForPhysics(process.uptime());
            this.physicsIteration();
        }, 1000 / this.timeManager.physicsFramerate);
    }
    load() {
        this.loadedScene = this.sceneManager.getLoadedScene();
        this.gameObjects = this.gameObjectManager.findGameObjects().filter((gameObject) => gameObject.active);
        this.components = [];
        this.gameObjects.forEach((gameObject) => gameObject
            .getComponents()
            .filter((component) => component.active)
            .forEach((c) => this.components.push(c)));
    }
    dispatchFrameEvent(event) {
        if (this.sceneEvents.includes(event)) {
            this.loadedScene.dispatch(event);
        }
        if (this.gameObjectEvents.includes(event)) {
            this.gameObjects.forEach((gameObject) => {
                if (gameObject.active)
                    gameObject.dispatch(event);
            });
        }
        this.components.forEach((component) => {
            if (component.active)
                component.dispatch(event);
        });
    }
}
//# sourceMappingURL=HeadlessIterationManager.js.map