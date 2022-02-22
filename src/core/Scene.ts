import { GameCamera } from "../gameObject/GameCamera";
import { Game, container } from "./Game";
import { GameObject } from "./GameObject";
import { GameObjectManager, GameObjectFactory } from "../core/managers/GameObjectManager";
import { FrameEvent } from "./managers/IterationManager";

export const GAME_CAMERA_ID = "GameCamera";

export class Scene {
    private readonly gameObjectManager: GameObjectManager =
        container.getSingleton<GameObjectManager>("GameObjectManager");

    public game: Game = null;
    public name: string = null;

    private started: boolean = false;

    constructor() {
        this.addGameObject(() => new GameCamera(), GAME_CAMERA_ID);
    }

    public get gameCamera(): GameCamera {
        return this.findGameObjectByName<GameCamera>(GAME_CAMERA_ID);
    }

    public dispatch(event: FrameEvent): void {
        if (event === FrameEvent.Init) {
            this.init();
        } else if (event === FrameEvent.Start && !this.started) {
            this.start();
            this.started = true;
        } else if (event === FrameEvent.Update && this.started) {
            this.update();
        } else if (event === FrameEvent.Destroy) {
            this.destroy();
            this._destroy();
        }
    }

    /**
     * This method is called only once.
     * Recommended for GameObject cration.
     */
    protected init(): void {
        return;
    }

    /**
     * This method is called only once.
     */
    protected start(): void {
        return;
    }

    /**
     * This method is called on every frame.
     */
    protected update(): void {
        return;
    }

    /**
     * This method is called before the scene is destroyed.
     */
    protected destroy(): void {
        return;
    }

    /**
     * @param gameObjectFactory The factory function for the game object
     * @param name The name of the game object, this must not be used by another game object
     * @returns The added game object
     */
    protected addGameObject<T extends GameObject>(gameObjectFactory: GameObjectFactory, name: string): T {
        return this.gameObjectManager.addGameObject(gameObjectFactory, name) as T;
    }

    /**
     * @returns The all the loaded game objects
     */
    protected getGameObjects(): GameObject[] {
        return this.gameObjectManager.getGameObjects();
    }

    /**
     * @param name The name of the game object to find
     * @returns The found game object
     */
    protected findGameObjectByName<T extends GameObject>(name: string): T {
        return this.gameObjectManager.findGameObjectByName(name) as T;
    }

    /**
     * @param tag The tag of the game objects to find
     * @returns The found game objects
     */
    protected findGameObjectsByTag(tag: string): GameObject[] {
        return this.gameObjectManager.findGameObjectsByTag(tag);
    }

    /**
     * @param tag The tag of the game object to find
     * @returns The found game object
     */
    protected findGameObjectByTag<T extends GameObject>(tag: string): T {
        return this.gameObjectManager.findGameObjectByTag(tag) as T;
    }

    /**
     * Destroy one game objects by its name
     * @param name The name of the game object
     */
    protected destroyGameObjectByName(name: string): void {
        this.destroyGameObject(this.findGameObjectByName(name));
    }

    /**
     * Destroy the game objects
     *
     * @param gameObject The game object to destory
     */
    protected destroyGameObject(gameObject: GameObject): void {
        this.gameObjectManager.destroyGameObject(gameObject);
    }

    private _destroy(): void {
        this.gameObjectManager.destroyAllGameObjects();

        // @ts-ignore
        Object.keys(this).forEach((key) => delete this[key]);
    }
}
