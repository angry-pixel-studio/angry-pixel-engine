import { GameCamera } from "./GameObjects/GameCamera";
import { Game, container, EVENT_UPDATE, EVENT_START } from "./Game";
import { GameObject } from "./GameObject";
import { GameObjectManager, GameObjectFactory } from "./Core/GameObject/GameObjectManager";

export const GAME_CAMERA_ID = "GameCamera";

export class Scene {
    public game: Game = null;
    public name: string = null;

    private gameObjectManager: GameObjectManager = container.getSingleton<GameObjectManager>("GameObjectManager");
    private started: boolean = false;

    constructor() {
        window.addEventListener(EVENT_START, this.gameLoopEventHandler);
        window.addEventListener(EVENT_UPDATE, this.gameLoopEventHandler);

        this.addGameObject(() => new GameCamera(), GAME_CAMERA_ID);
        this.gameLoopEventHandler.bind(this);
    }

    private gameLoopEventHandler = (event: Event): void => {
        if (this.started === false && event.type === EVENT_START) {
            this.start();
            this.started = true;
        } else if (this.started === true && event.type === EVENT_UPDATE) {
            this.update();
        }
    };

    public get gameCamera(): GameCamera {
        return this.findGameObjectByName(GAME_CAMERA_ID);
    }

    /**
     * This method is called on the first frame
     */
    protected start(): void {
        return;
    }

    /**
     * This method is called on every frame
     */
    protected update(): void {
        return;
    }

    /**
     * @param gameObjectFactory The factory function for the game object
     * @param name The name of the game object, this must not be used by another game object
     * @returns The added game object
     */
    public addGameObject<T extends GameObject>(gameObjectFactory: GameObjectFactory, name: string): T {
        return this.gameObjectManager.addGameObject(gameObjectFactory, name) as T;
    }

    /**
     * @returns The game objects with no parents
     */
    public getRootGameObjects(): GameObject[] {
        return this.gameObjectManager.getGameObjects().filter((gameObject) => gameObject.parent === null);
    }

    /**
     * @param name The name of the game object to find
     * @returns The found game object
     */
    public findGameObjectByName<T extends GameObject>(name: string): T | null {
        return this.gameObjectManager.findGameObjectByName(name) as T;
    }

    /**
     * @param tag The tag of the game objects to find
     * @returns The found game objects
     */
    public findGameObjectsByTag(tag: string): GameObject[] {
        return this.gameObjectManager.findGameObjectsByTag(tag);
    }

    /**
     * @param tag The tag of the game object to find
     * @returns The found game object
     */
    public findGameObjectByTag<T extends GameObject>(tag: string): T | null {
        return this.gameObjectManager.findGameObjectByTag(tag) as T;
    }

    /**
     * Desroy all the loaded game objects
     */
    public destroyAllGameObjects(): void {
        this.gameObjectManager.destroyAllGameObjects();
    }

    /**
     * Destroy one game objects by its name
     * @param name The name of the game object
     */
    public destroyGameObjectByName(name: string): void {
        this.destroyGameObject(this.findGameObjectByName(name));
    }

    /**
     * Destroy the game objects
     *
     * @param gameObject The game object to destory
     */
    public destroyGameObject(gameObject: GameObject): void {
        this.gameObjectManager.destroyGameObject(gameObject);
    }

    /**
     * @description NOTE: do not use this method. Use SceneManager.unloadCurrentScene instead.
     */
    public destroy(): void {
        window.removeEventListener(EVENT_START, this.gameLoopEventHandler);
        window.removeEventListener(EVENT_UPDATE, this.gameLoopEventHandler);
        this.gameObjectManager.destroyAllGameObjects();

        // @ts-ignore
        Object.keys(this).forEach((key) => delete this[key]);
    }
}
