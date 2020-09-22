import GameCamera from "./GameObjects/GameCamera";
import Game, { EVENT_START, EVENT_UPDATE } from "./Game";
import GameObject from "./GameObject";

export const GAME_CAMERA_ID = 'GameCamera';

export default class Scene {
    public game: Game = null;
    public name: string = null;
    private gameObjects: Array<any> = [];

    constructor() {
        this.addGameObject(() => new GameCamera(), GAME_CAMERA_ID);

        window.addEventListener(EVENT_START, this.gameLoopEventHandler);
        window.addEventListener(EVENT_UPDATE, this.gameLoopEventHandler);
    }

    gameLoopEventHandler = (event: Event): void => {
        if (event.type === EVENT_START) {
            this.start((event as CustomEvent).detail);
        } else if (event.type === EVENT_UPDATE) {
            this.update((event as CustomEvent).detail);
        }
    }

    protected start(event: object): void { }

    protected update(event: object): void { }

    public get gameCamera(): GameCamera {
        return this.getGameObject(GAME_CAMERA_ID);
    }

    public addGameObject(gameObjectFunction: Function, id: string|null = null): this {
        const gameObject = gameObjectFunction();
        gameObject.id = id;
        gameObject.scene = this;
        this.gameObjects.push(gameObject);

        return this;
    }

    public getGameObjects(): GameObject[] {
        return this.gameObjects;
    }

    public getGameObject<OType>(id: string): OType {
        return this.gameObjects.reduce(
            (prev, child) => child.id === id
                ? child
                : prev
            , null
        );
    }

    public getGameObjectsByTag(tag: string ): GameObject[] {
        return this.gameObjects.filter(object => object.tag === tag);
    }

    public getGameObjectByTag<OType>(tag: string): OType|null {
        const objects = this.gameObjects.filter(object => object.tag === tag);
        return objects.length > 0 ? objects[0] : null;
    }

    public destroyGameObject(id: string): void {
        this.gameObjects.every((gameObject, index) => {
            if (gameObject.id === id) {
                gameObject._destroy();
                delete this.gameObjects[index];

                return false;
            }
        });
    }

    public destroyGameObjects(): void {
        this.gameObjects.every((gameObject, index) => {
            gameObject._destroy();
            return delete this.gameObjects[index];
        });
    }

    public _destroy(): void {
        window.removeEventListener(EVENT_START, this.gameLoopEventHandler);
        window.removeEventListener(EVENT_UPDATE, this.gameLoopEventHandler);

        this.destroyGameObjects();

        // @ts-ignore
        Object.keys(this).forEach(key => delete this[key]);
    }
}