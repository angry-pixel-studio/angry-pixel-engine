import { container } from "./Game";
import { GameObject, GameObjectClass } from "./GameObject";
import { GameObjectManager } from "./managers/GameObjectManager";
import { FrameEvent } from "./managers/IterationManager";

export interface InitOptions {
    [key: string]: unknown;
}

export abstract class GameActor {
    protected readonly gameObjectManager: GameObjectManager =
        container.getSingleton<GameObjectManager>("GameObjectManager");
    protected readonly updateEvent: FrameEvent = FrameEvent.Update;

    private started: boolean = false;

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
     * @param options [optional] This options will be passed to the init method
     * @param name [optional] The name of the game object
     * @returns The added game object
     * @returns
     */
    protected addGameObject<T extends GameObject>(
        gameObjectClass: GameObjectClass<T>,
        options?: InitOptions,
        name?: string
    ): T {
        return this.gameObjectManager.addGameObject<T>(gameObjectClass, options, undefined, name);
    }

    /**
     * Returns all the game objects in the scene.
     * @returns The found game objects
     */
    protected findGameObjects(): GameObject[] {
        return this.gameObjectManager.findGameObjects();
    }

    /**
     * Returns the first game object found for the given class, or undefined otherwise.
     * @param gameObjectClass The game object class to find
     * @returns The found game object
     */
    public findGameObject<T extends GameObject>(gameObjectClass: GameObjectClass<T>): T;
    /**
     * Returns the first game object found for the given name, or undefined otherwise.
     * @param name The name of the game object to find
     * @returns The found game object
     */
    public findGameObject<T extends GameObject>(name: string): T;
    public findGameObject<T extends GameObject>(filter: GameObjectClass<T> | string): T {
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

    protected abstract _destroy(): void;
}
