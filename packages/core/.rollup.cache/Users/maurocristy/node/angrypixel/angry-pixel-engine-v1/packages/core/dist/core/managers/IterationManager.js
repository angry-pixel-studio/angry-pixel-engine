/** @internal */
export var FrameEvent;
(function (FrameEvent) {
    FrameEvent[FrameEvent["Init"] = 0] = "Init";
    FrameEvent[FrameEvent["Start"] = 1] = "Start";
    FrameEvent[FrameEvent["Update"] = 2] = "Update";
    FrameEvent[FrameEvent["UpdateEngine"] = 3] = "UpdateEngine";
    FrameEvent[FrameEvent["UpdateCollider"] = 4] = "UpdateCollider";
    FrameEvent[FrameEvent["UpdatePhysics"] = 5] = "UpdatePhysics";
    FrameEvent[FrameEvent["UpdateTransform"] = 6] = "UpdateTransform";
    FrameEvent[FrameEvent["UpdatePreRender"] = 7] = "UpdatePreRender";
    FrameEvent[FrameEvent["UpdateCamera"] = 8] = "UpdateCamera";
    FrameEvent[FrameEvent["UpdateRender"] = 9] = "UpdateRender";
    FrameEvent[FrameEvent["Destroy"] = 10] = "Destroy";
    FrameEvent[FrameEvent["StopGame"] = 11] = "StopGame";
})(FrameEvent || (FrameEvent = {}));
/** @internal */
export const now = () => window.performance.now() * 0.001;
/** @internal */
export class IterationManager {
    constructor(timeManager, physicsManager, renderManager, inputManager, gameObjectManager, sceneManager, canvasColor) {
        this.timeManager = timeManager;
        this.physicsManager = physicsManager;
        this.renderManager = renderManager;
        this.inputManager = inputManager;
        this.gameObjectManager = gameObjectManager;
        this.sceneManager = sceneManager;
        this.canvasColor = canvasColor;
        this.running = false;
        this.gameLoopAccumulator = 0;
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
        this.renderManager.clearScreen(this.canvasColor);
    }
    startLoop(loadOpeningScene) {
        if (this.running) {
            return;
        }
        this.running = true;
        if (loadOpeningScene) {
            this.sceneManager.loadOpeningScene();
        }
        this.requestAnimationLoop(window.performance.now());
        // physics fixed at its own frame rate
        if (this.timeManager.gameFramerate !== this.timeManager.physicsFramerate) {
            this.asyncPhysicsLoop();
        }
    }
    requestAnimationLoop(time) {
        if (!this.running)
            return;
        this.timeManager.updateForBrowser(time * 0.001);
        if (this.sceneManager.pendingSceneToload()) {
            this.sceneManager.loadPendingScene();
            this.changingScene = false;
        }
        this.gameLoopAccumulator += this.timeManager.browserDeltaTime;
        if (this.gameLoopAccumulator >= this.timeManager.minGameDeltatime) {
            this.gameLogicIteration(time * 0.001);
            this.gameLoopAccumulator -= this.timeManager.minGameDeltatime;
        }
        this.renderIteration();
        if (this.sceneManager.pendingSceneToload()) {
            this.changingScene = true;
            this.sceneManager.unloadCurrentScene();
        }
        window.requestAnimationFrame((time) => this.requestAnimationLoop(time));
    }
    gameLogicIteration(time) {
        this.timeManager.updateForGame(time);
        this.load();
        // starts all game objects and components
        this.dispatchFrameEvent(FrameEvent.Start);
        // updates input controllers
        this.inputManager.update();
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
        this.dispatchFrameEvent(FrameEvent.UpdatePreRender);
    }
    renderIteration() {
        this.dispatchFrameEvent(FrameEvent.UpdatePreRender);
        this.dispatchFrameEvent(FrameEvent.UpdateCamera);
        this.dispatchFrameEvent(FrameEvent.UpdateRender);
        this.renderManager.clearScreen(this.canvasColor);
        this.renderManager.render();
        this.renderManager.clearData();
    }
    physicsIteration() {
        if (this.timeManager.timeScale <= 0 || this.changingScene)
            return;
        this.dispatchFrameEvent(FrameEvent.UpdatePhysics);
        this.dispatchFrameEvent(FrameEvent.UpdateCollider);
        this.dispatchFrameEvent(FrameEvent.UpdateTransform);
        this.physicsManager.resolve(this.timeManager.physicsDeltaTime);
    }
    asyncPhysicsLoop() {
        this.physicsIntervalId = window.setInterval(() => {
            if (!this.running)
                return window.clearInterval(this.physicsIntervalId);
            this.timeManager.updateForPhysics(now());
            if (!document.hidden)
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
//# sourceMappingURL=IterationManager.js.map