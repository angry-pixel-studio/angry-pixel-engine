import GameCamera from "./GameObjects/GameCamera";
import Game, { EVENT_UPDATE } from "./Game";
import GameObject from "./GameObject";

export const GAME_CAMERA_ID = "GameCamera";

type gameObjectFunction = () => GameObject;

export default class Scene {
    public game: Game = null;
    public name: string = null;
    private gameObjects: Array<any> = [];
    private firstFrame: boolean = true;
    private processingLoop: boolean = false;

    constructor() {
        this.addGameObject(() => new GameCamera(), GAME_CAMERA_ID);

        this.gameLoopEventHandler.bind(this);
        window.addEventListener(EVENT_UPDATE, this.gameLoopEventHandler);
    }

    gameLoopEventHandler = (event: Event): void => {
        if (this.processingLoop === true) {
            return;
        }

        this.processingLoop = true;

        if (this.firstFrame === true) {
            this.start((event as CustomEvent).detail);
            this.firstFrame = false;
        } else {
            this.update((event as CustomEvent).detail);
        }

        this.processingLoop = false;
    };

    protected start(event: Record<string, unknown>): void {
        // do nothing
    }

    protected update(event: Record<string, unknown>): void {
        // do nothing
    }

    public get gameCamera(): GameCamera {
        return this.getGameObject(GAME_CAMERA_ID);
    }

    public addGameObject(gameObjectFunction: gameObjectFunction, id: string | null = null): this {
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
        return this.gameObjects.reduce((prev, child) => (child.id === id ? child : prev), null);
    }

    public getGameObjectsByTag(tag: string): GameObject[] {
        return this.gameObjects.filter((object) => object.tag === tag);
    }

    public getGameObjectByTag<OType>(tag: string): OType | null {
        const objects = this.gameObjects.filter((object) => object.tag === tag);
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
        window.removeEventListener(EVENT_UPDATE, this.gameLoopEventHandler);

        this.destroyGameObjects();

        // @ts-ignore
        Object.keys(this).forEach((key) => delete this[key]);
    }
}
