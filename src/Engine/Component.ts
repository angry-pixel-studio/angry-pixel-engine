import { v4 as uuidv4 } from "uuid";
import { MiniEngineException } from "./Core/Exception/MiniEngineException";
import { GameObjectFactory, GameObjectManager } from "./Core/GameObject/GameObjectManager";
import { SceneManager } from "./Core/Scene/SceneManager";
import {
    container,
    EVENT_START,
    EVENT_UPDATE,
    EVENT_UPDATE_COLLIDER,
    EVENT_UPDATE_ENGINE,
    EVENT_UPDATE_PHYSICS,
    EVENT_UPDATE_RENDER,
} from "./Game";
import { GameObject } from "./GameObject";
import { Scene } from "./Scene";

export abstract class Component {
    private sceneManager: SceneManager = container.getSingleton<SceneManager>("SceneManager");
    private gameObjectManager: GameObjectManager = container.getSingleton<GameObjectManager>("GameObjectManager");

    public readonly uuid: string = uuidv4();
    public allowMultiple: boolean = true;
    public type: string = null;
    public name: string = null;
    public gameObject: GameObject = null;

    private _active: boolean = true;
    private started: boolean = false;

    constructor() {
        window.addEventListener(EVENT_START, this.gameLoopEventHandler);
        window.addEventListener(this.updateEvent, this.gameLoopEventHandler);
    }

    protected get updateEvent(): string {
        return EVENT_UPDATE;
    }

    public get active(): boolean {
        return this._active;
    }

    /**
     * If the component become inactive, will stop its execution
     *
     * @param active TRUE or FALSE
     */
    public setActive(active: boolean): void {
        this._active = active;
    }

    protected gameLoopEventHandler = (event: Event): void => {
        if (this._active === false) {
            return;
        }

        try {
            if (this.started === false && event.type === EVENT_START) {
                this.start();
                this.started = true;
            } else if (this.started === true && event.type === this.updateEvent) {
                this.update();
            }
        } catch (error) {
            if (error.message.indexOf(MiniEngineException.messagePrefix) !== -1) {
                throw error;
            } else {
                throw new MiniEngineException(error.message);
            }
        }
    };

    protected start(): void {
        return;
    }

    protected update(): void {
        return;
    }

    /**
     * @returns The current loaded scene
     */
    protected getCurrentScene<T extends Scene>(): T {
        return this.sceneManager.getCurrentScene<T>();
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
     * @param name The name of the component to find
     * @returns The found component
     */
    protected getComponentByName<T extends Component>(name: string): T | null {
        return this.gameObject.getComponentByName<T>(name);
    }

    /**
     * @param type The type of the component to find
     * @returns The found component
     */
    protected getComponentByType<T extends Component>(type: string): T | null {
        return this.gameObject.getComponentByType<T>(type);
    }

    /**
     * @param type The type of the components to find
     * @returns The found components
     */
    protected getComponentsByType<T extends Component>(type: string): T[] {
        return this.gameObject.getComponentsByType<T>(type);
    }

    /**
     * @param name The name of the game object to find
     * @returns The found game object
     */
    protected findGameObjectByName<T extends GameObject>(name: string): T | null {
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
    protected findGameObjectByTag<T extends GameObject>(tag: string): T | null {
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
     * @param gameObject The game object to destory
     */
    protected destroyGameObject(gameObject: GameObject): void {
        this.gameObjectManager.destroyGameObject(gameObject);
    }

    /**
     * @param name The name of the component to find
     * @returns TRUE or FALSE
     */
    public hasComponentOfName(name: string): boolean {
        return this.getComponentByName(name) !== null;
    }

    /**
     * @param type The type of the component to find
     * @returns TRUE or FALSE
     */
    public hasComponentOfType(type: string): boolean {
        return this.getComponentByType(type) !== null;
    }

    /**
     * @param name The name of the component to remove
     */
    public removeComponentByName(name: string): void {
        this.gameObject.removeComponentByName(name);
    }

    /**
     * @param type The tyepe of the component to remove
     */
    public removeComponentByType(type: string): void {
        this.gameObject.removeComponentByType(type);
    }

    /**
     * @description NOTE: Do not call this method. Use GameObject.setComponentActive instead.
     */
    public destroy(): void {
        window.removeEventListener(EVENT_START, this.gameLoopEventHandler);
        window.removeEventListener(this.updateEvent, this.gameLoopEventHandler);

        // @ts-ignore
        Object.keys(this).forEach((key) => delete this[key]);
    }
}

export abstract class EngineComponent extends Component {
    protected get updateEvent(): string {
        return EVENT_UPDATE_ENGINE;
    }
}

export abstract class ColliderComponent extends Component {
    protected get updateEvent(): string {
        return EVENT_UPDATE_COLLIDER;
    }
}

export abstract class PhysicsComponent extends Component {
    protected get updateEvent(): string {
        return EVENT_UPDATE_PHYSICS;
    }
}

export abstract class RenderComponent extends Component {
    protected get updateEvent(): string {
        return EVENT_UPDATE_RENDER;
    }
}
