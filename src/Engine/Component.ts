import { v4 as uuidv4 } from "uuid";
import { GameObjectManager } from "./Core/GameObject/GameObjectManager";
import { SceneManager } from "./Core/Scene/SceneManager";
import { container, EVENT_UPDATE, EVENT_UPDATE_PHYSICS, EVENT_UPDATE_RENDER } from "./Game";
import { GameObject } from "./GameObject";
import { Scene } from "./Scene";

export abstract class Component {
    private sceneManager: SceneManager = container.getSingleton<SceneManager>("SceneManager");
    private gameObjectManager: GameObjectManager = container.getSingleton<GameObjectManager>("GameObjectManager");

    public readonly uuid: string = uuidv4();
    public name: string = null;
    public gameObject: GameObject = null;

    private _active: boolean = true;
    private firstFrame: boolean = true;

    constructor() {
        this.createEventListener();
    }

    protected createEventListener(): void {
        window.addEventListener(EVENT_UPDATE, this.gameLoopEventHandler);
    }

    protected destroyEventListener(): void {
        window.removeEventListener(EVENT_UPDATE, this.gameLoopEventHandler);
    }

    public get active(): boolean {
        return this._active;
    }

    public setActive(active: boolean): void {
        this._active = active;
    }

    protected gameLoopEventHandler = (): void => {
        if (this._active === false) {
            return;
        }

        if (this.firstFrame === true) {
            this.start();
            this.firstFrame = false;
        } else {
            this.update();
        }
    };

    protected start(): void {
        // do nothing
    }

    protected update(): void {
        // do nothing
    }

    public getCurrentScene<T extends Scene>(): T {
        return this.sceneManager.getCurrentScene<T>();
    }

    public getComponent<T extends Component>(name: string): T | null {
        return this.gameObject.getComponent<T>(name);
    }

    public findGameObjectByName<T extends GameObject>(name: string): T | null {
        return this.gameObjectManager.findGameObjectByName(name) as T;
    }

    public findGameObjectsByTag(tag: string): GameObject[] {
        return this.gameObjectManager.findGameObjectsByTag(tag);
    }

    public findGameObjectByTag<T extends GameObject>(tag: string): T | null {
        return this.gameObjectManager.findGameObjectByTag(tag) as T;
    }

    public destroyGameObjectByName(name: string): void {
        this.destroyGameObject(this.findGameObjectByName(name));
    }

    public destroyGameObject(gameObject: GameObject): void {
        this.gameObjectManager.destroyGameObject(gameObject);
    }

    /**
     * @description NOTE: Do not call this method. Use GameObject.setComponentActive instead.
     */
    public destroy(): void {
        this.destroyEventListener();

        // @ts-ignore
        Object.keys(this).forEach((key) => delete this[key]);
    }
}

export class PhysicsComponent extends Component {
    protected createEventListener(): void {
        window.addEventListener(EVENT_UPDATE_PHYSICS, this.gameLoopEventHandler);
    }

    protected destroyEventListener(): void {
        window.removeEventListener(EVENT_UPDATE_PHYSICS, this.gameLoopEventHandler);
    }
}

export class RenderComponent extends Component {
    protected createEventListener(): void {
        window.addEventListener(EVENT_UPDATE_RENDER, this.gameLoopEventHandler);
    }

    protected destroyEventListener(): void {
        window.removeEventListener(EVENT_UPDATE_RENDER, this.gameLoopEventHandler);
    }
}
