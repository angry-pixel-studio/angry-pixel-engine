import GameCamera from "./GameObjects/GameCamera";
import Game, { EVENT_UPDATE } from "./Game";
import GameObject from "./GameObject";
import { GameObjectFactory } from "./Core/GameObject/GameObjectManager";

export const GAME_CAMERA_ID = "GameCamera";

export default class Scene {
    public game: Game = null;
    public name: string = null;
    private firstFrame: boolean = true;

    constructor() {
        window.addEventListener(EVENT_UPDATE, this.gameLoopEventHandler);

        this.addGameObject(() => new GameCamera(), GAME_CAMERA_ID);
        this.gameLoopEventHandler.bind(this);
    }

    gameLoopEventHandler = (event: Event): void => {
        if (this.firstFrame === true) {
            this.start((event as CustomEvent).detail);
            this.firstFrame = false;
        } else {
            this.update((event as CustomEvent).detail);
        }
    };

    protected start(event: Record<string, unknown>): void {
        // do nothing
    }

    protected update(event: Record<string, unknown>): void {
        // do nothing
    }

    public get gameCamera(): GameCamera {
        return this.findGameObjectByName(GAME_CAMERA_ID);
    }

    public addGameObject(gameObjectFactory: GameObjectFactory, name: string): this {
        Game.gameObjectManager.addGameObject(gameObjectFactory, this, name);

        return this;
    }

    public getRootGameObjects(): GameObject[] {
        return Game.gameObjectManager.getGameObjects().filter((gameObject) => gameObject.parent === null);
    }

    public findGameObjectByName<T extends GameObject>(name: string): T | null {
        return Game.gameObjectManager.findGameObjectByName(name) as T;
    }

    public findGameObjectsByTag(tag: string): GameObject[] {
        return Game.gameObjectManager.findGameObjectsByTag(tag);
    }

    public findGameObjectByTag<T extends GameObject>(tag: string): T | null {
        return Game.gameObjectManager.findGameObjectByTag(tag) as T;
    }

    public destroyGameObject(name: string): void {
        const gameObject = this.findGameObjectByName(name);

        if (gameObject !== null) {
            Game.gameObjectManager.destroyGameObject(gameObject);
        }
    }

    public destroyAllGameObjects(): void {
        Game.gameObjectManager.destroyAllGameObjects();
    }

    public _destroy(): void {
        window.removeEventListener(EVENT_UPDATE, this.gameLoopEventHandler);
        Game.gameObjectManager.destroyAllGameObjects();

        // @ts-ignore
        Object.keys(this).forEach((key) => delete this[key]);
    }
}
