import { FrameEvent } from "./managers/IterationManager";
/**
 * Base class from which Scene, GameObjects and Component are extended.
 * @internal
 */
export class GameActor {
    /** @internal */
    constructor(container) {
        /** @internal */
        this.updateEvent = FrameEvent.Update;
        this.started = false;
        this.container = container;
        this.gameConfig = this.container.getConstant("GameConfig");
        if (!this.gameConfig.headless) {
            this.assetManager = this.container.getSingleton("AssetManager");
            this.domManager = this.container.getSingleton("DomManager");
            this.inputManager = this.container.getSingleton("InputManager");
            this.renderManager = this.container.getSingleton("RenderManager");
        }
        this.gameObjectManager = this.container.getSingleton("GameObjectManager");
        this.physicsManager = this.container.getSingleton("PhysicsManager");
        this.sceneManager = this.container.getSingleton("SceneManager");
        this.timeManager = this.container.getSingleton("TimeManager");
    }
    /** @internal */
    dispatch(event, options) {
        if (event === FrameEvent.Init && this.init) {
            this.init(options);
        }
        else if (event === FrameEvent.Start && !this.started) {
            if (this.start)
                this.start();
            this.started = true;
        }
        else if (event === this.updateEvent && this.started && this.update) {
            this.update();
        }
        else if (event === FrameEvent.Destroy) {
            if (this.onDestroy)
                this.onDestroy();
            this._destroy();
        }
        else if (event === FrameEvent.StopGame) {
            if (this.onDestroy)
                this.onDestroy();
            this._stopGame();
        }
    }
    addGameObject(gameObjectClass, arg2, arg3) {
        if (typeof arg2 === "string") {
            arg3 = arg2;
            arg2 = {};
        }
        return this.gameObjectManager.addGameObject(gameObjectClass, arg2, undefined, arg3);
    }
    findGameObjects(gameObjectClass) {
        return (gameObjectClass
            ? this.gameObjectManager.findGameObjects(gameObjectClass)
            : this.gameObjectManager.findGameObjects());
    }
    findGameObject(filter) {
        return typeof filter === "string"
            ? this.gameObjectManager.findGameObject(filter)
            : this.gameObjectManager.findGameObject(filter);
    }
    /**
     * Returns a collection of game objects found for the given tag
     * @param tag The tag of the game objects to find
     * @returns The found game objects
     */
    findGameObjectsByTag(tag) {
        return this.gameObjectManager.findGameObjectsByTag(tag);
    }
    /**
     * Destroy the given game object
     * @param gameObject The game object to destory
     */
    destroyGameObject(gameObject) {
        this.gameObjectManager.destroyGameObject(gameObject);
    }
}
//# sourceMappingURL=GameActor.js.map