import { IPhysicsManager } from "angry-pixel-2d-physics";
import { IInputManager } from "../input/InputManager";
import { Container } from "../utils/Container";
import { GameConfig } from "./GameConfig";
import { GameObject, GameObjectClass } from "./GameObject";
import { IAssetManager } from "./managers/AssetManager";
import { IDomManager } from "./managers/DomManager";
import { IGameObjectManager } from "./managers/GameObjectManager";
import { FrameEvent } from "./managers/IterationManager";
import { ISceneManager } from "./managers/SceneManager";
import { ITimeManager } from "./managers/TimeManager";
import { IRenderManager } from "angry-pixel-2d-renderer";

/** @private */
export interface InitOptions {
    [key: string]: any; // eslint-disable-line
}

/**
 * Base class from which Scene, GameObjects and Component are extended.
 * @private
 */
export abstract class GameActor {
    /** @private */
    protected readonly updateEvent: FrameEvent = FrameEvent.Update;
    /** @private */
    protected readonly container: Container;

    /** Used to load and retrieve assets. */
    protected readonly assetManager: IAssetManager;
    /** Used to access the canvas element. */
    protected readonly domManager: IDomManager;
    /** Used to obtain information about the input. */
    protected readonly inputManager: IInputManager;
    /** Used to create, retrieve and destroy GameObject instances. */
    protected readonly gameObjectManager: IGameObjectManager;
    /** Used to manage colliders and rigidBodies. */
    protected readonly physicsManager: IPhysicsManager;
    /** Used to manage the render and camera data. */
    protected readonly renderManager: IRenderManager;
    /** Used to load scenes. */
    protected readonly sceneManager: ISceneManager;
    /** Used to manage and obtain information about the time in the game. */
    protected readonly timeManager: ITimeManager;
    /** Object containing the game configuration. */
    protected readonly gameConfig: GameConfig;

    private started: boolean = false;

    /** @private */
    constructor(container: Container) {
        this.container = container;

        this.gameConfig = this.container.getConstant<GameConfig>("GameConfig");

        if (!this.gameConfig.headless) {
            this.assetManager = this.container.getSingleton<IAssetManager>("AssetManager");
            this.domManager = this.container.getSingleton<IDomManager>("DomManager");
            this.inputManager = this.container.getSingleton<IInputManager>("InputManager");
            this.renderManager = this.container.getSingleton<IRenderManager>("RenderManager");
        }

        this.gameObjectManager = this.container.getSingleton<IGameObjectManager>("GameObjectManager");
        this.physicsManager = this.container.getSingleton<IPhysicsManager>("PhysicsManager");
        this.sceneManager = this.container.getSingleton<ISceneManager>("SceneManager");
        this.timeManager = this.container.getSingleton<ITimeManager>("TimeManager");
    }

    /** @private */
    public dispatch(event: FrameEvent, options?: InitOptions): void {
        if (event === FrameEvent.Init && this.init) {
            this.init(options);
        } else if (event === FrameEvent.Start && !this.started) {
            if (this.start) this.start();
            this.started = true;
        } else if (event === this.updateEvent && this.started && this.update) {
            this.update();
        } else if (event === FrameEvent.Destroy) {
            if (this.onDestroy) this.onDestroy();
            this._destroy();
        } else if (event === FrameEvent.StopGame) {
            if (this.onDestroy) this.onDestroy();
            this._stopGame();
        }
    }

    /**
     * This method is called after instantiation (recommended for the creation of game objects).
     */
    protected init?(options?: InitOptions): void;

    /**
     * This method is called only once on the first available frame.
     */
    protected start?(): void;

    /**
     * This method is called on every frame.
     */
    protected update?(): void;

    /**
     * This method is called before destruction.
     */
    protected onDestroy?(): void;

    /**
     * Adds a new game object to the scene.
     * @param gameObjectClass The game object class
     * @returns The added game object
     */
    protected addGameObject<T extends GameObject>(gameObjectClass: GameObjectClass<T>): T;
    /**
     * Adds a new game object to the scene.
     * @param gameObjectClass The game object class
     * @param name The name of the game object
     * @returns The added game object
     */
    protected addGameObject<T extends GameObject>(gameObjectClass: GameObjectClass<T>, name: string): T;
    /**
     * Adds a new game object to the scene.
     * @param gameObjectClass The game object class
     * @param options This options will be passed to the init method
     * @returns The added game object
     */
    protected addGameObject<T extends GameObject>(gameObjectClass: GameObjectClass<T>, options: InitOptions): T;
    /**
     * Adds a new game object to the scene.
     * @param gameObjectClass The game object class
     * @param options [optional] This options will be passed to the init method
     * @param name [optional] The name of the game object
     * @returns The added game object
     */
    protected addGameObject<T extends GameObject>(
        gameObjectClass: GameObjectClass<T>,
        options?: InitOptions | string,
        name?: string
    ): T;
    protected addGameObject<T extends GameObject>(
        gameObjectClass: GameObjectClass<T>,
        arg2?: InitOptions | string,
        arg3?: string
    ): T {
        if (typeof arg2 === "string") {
            arg3 = arg2;
            arg2 = {};
        }

        return this.gameObjectManager.addGameObject<T>(gameObjectClass, arg2, undefined, arg3);
    }

    /**
     * Returns all the game objects in the scene.
     * @returns The found game objects
     */
    protected findGameObjects(): GameObject[];
    /**
     * Returns a collection of found game objects for the given class
     * @param gameObjectClass The game object class to find
     * @returns The found game objects
     */
    protected findGameObjects<T extends GameObject>(gameObjectClass: GameObjectClass<T>): T[];
    protected findGameObjects<T extends GameObject>(gameObjectClass?: GameObjectClass<T>): T[] {
        return (
            gameObjectClass
                ? this.gameObjectManager.findGameObjects<T>(gameObjectClass)
                : this.gameObjectManager.findGameObjects<GameObject>()
        ) as T[];
    }

    /**
     * Returns the first game object found for the given class, or undefined otherwise.
     * @param gameObjectClass The game object class to find
     * @returns The found game object
     */
    protected findGameObject<T extends GameObject>(gameObjectClass: GameObjectClass<T>): T;
    /**
     * Returns the first game object found for the given name, or undefined otherwise.
     * @param name The name of the game object to find
     * @returns The found game object
     */
    protected findGameObject<T extends GameObject>(name: string): T;
    protected findGameObject<T extends GameObject>(filter: GameObjectClass<T> | string): T {
        return typeof filter === "string"
            ? this.gameObjectManager.findGameObject<T>(filter as string)
            : this.gameObjectManager.findGameObject<T>(filter as GameObjectClass<T>);
    }

    /**
     * Returns a collection of game objects found for the given tag
     * @param tag The tag of the game objects to find
     * @returns The found game objects
     */
    protected findGameObjectsByTag<T extends GameObject>(tag: string): T[] {
        return this.gameObjectManager.findGameObjectsByTag<T>(tag);
    }

    /**
     * Destroy the given game object
     * @param gameObject The game object to destory
     */
    protected destroyGameObject(gameObject: GameObject): void {
        this.gameObjectManager.destroyGameObject(gameObject);
    }

    /** @private */
    protected abstract _destroy(): void;

    /** @private */
    protected abstract _stopGame(): void;
}
