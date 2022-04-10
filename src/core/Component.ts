import { GameObjectFactory, GameObjectManager } from "./managers/GameObjectManager";
import { SceneManager } from "./managers/SceneManager";
import { container } from "./Game";
import { GameObject } from "./GameObject";
import { Scene } from "./Scene";
import { uuid } from "../utils/UUID";
import { FrameEvent } from "./managers/IterationManager";

export abstract class Component {
    private sceneManager: SceneManager = container.getSingleton<SceneManager>("SceneManager");
    protected gameObjectManager: GameObjectManager = container.getSingleton<GameObjectManager>("GameObjectManager");

    public readonly id: string = uuid();
    public type: string;
    public name: string;
    public gameObject: GameObject;
    public allowMultiple: boolean = true;

    private _active: boolean = true;
    private started: boolean = false;

    protected get updateEvent(): FrameEvent {
        return FrameEvent.Update;
    }

    public get active(): boolean {
        return this._active;
    }

    public setActive(active: boolean): void {
        this._active = active;
        this.activeStateChange();
    }

    public dispatch(event: FrameEvent): void {
        if (event === FrameEvent.Init) {
            this.init();
        } else if (event === FrameEvent.Destroy) {
            this.destroy();
            this._destroy();
        }

        if (this._active === false || this.gameObject.active === false) return;

        if (event === FrameEvent.Start && this.started === false) {
            this.start();
            this.started = true;
        } else if (event === this.updateEvent && this.started === true) {
            this.update();
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
     * This method is called before the component is destroyed.
     */
    protected destroy(): void {
        return;
    }

    /**
     * This method is called when the active state changes.
     */
    protected activeStateChange(): void {
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
    protected getComponentByName<T extends Component>(name: string): T {
        return this.gameObject.getComponentByName<T>(name);
    }

    /**
     * @param type The type of the component to find
     * @returns The found component
     */
    protected getComponentByType<T extends Component>(type: string): T {
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

    private _destroy(): void {
        // @ts-ignore
        Object.keys(this).forEach((key) => delete this[key]);
    }
}

export abstract class EngineComponent extends Component {
    protected get updateEvent(): FrameEvent {
        return FrameEvent.UpdateEngine;
    }
}

export abstract class ColliderComponent extends Component {
    protected get updateEvent(): FrameEvent {
        return FrameEvent.UpdateCollider;
    }
}

export abstract class PhysicsComponent extends Component {
    protected get updateEvent(): FrameEvent {
        return FrameEvent.UpdatePhysics;
    }
}

export abstract class TransformComponent extends Component {
    protected get updateEvent(): FrameEvent {
        return FrameEvent.UpdateTransform;
    }
}

export abstract class PreRenderComponent extends Component {
    protected get updateEvent(): FrameEvent {
        return FrameEvent.UpdatePreRender;
    }
}

export abstract class CameraComponent extends Component {
    protected get updateEvent(): FrameEvent {
        return FrameEvent.UpdateCamera;
    }
}

export abstract class RenderComponent extends Component {
    protected get updateEvent(): FrameEvent {
        return FrameEvent.UpdateRender;
    }
}
