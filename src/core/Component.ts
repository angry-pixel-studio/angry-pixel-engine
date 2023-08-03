import { GameObject } from "./GameObject";
import { Scene } from "./Scene";
import { uuid } from "../utils/UUID";
import { FrameEvent } from "./managers/IterationManager";
import { GameActor } from "./GameActor";
import { Container } from "../utils/Container";

export type ComponentClass<T extends Component = Component> = new (
    container: Container,
    gameObject: GameObject,
    name?: string
) => T;

export abstract class Component extends GameActor {
    public readonly id: string = uuid();
    public readonly name: string;
    public readonly gameObject: GameObject;
    public readonly allowMultiple: boolean = true;

    private _active: boolean = true;

    constructor(container: Container, gameObject: GameObject, name: string = "") {
        super(container);

        this.gameObject = gameObject;
        this.name = name;
    }

    public get active(): boolean {
        return this._active;
    }

    public set active(active: boolean) {
        if (this._active === active) return;

        this._active = active;

        this.onActiveChange();
    }

    /**
     * This method is called when the active state changes.
     */
    protected onActiveChange(): void {
        return;
    }

    /**
     * @returns The current loaded scene
     */
    protected getCurrentScene<T extends Scene>(): T {
        return this.sceneManager.getCurrentScene<T>();
    }

    /**
     * @returns The GameObject to which this component is attached
     */
    protected getGameObject<T extends GameObject>(): T {
        return this.gameObject as T;
    }

    /**
     * Returns all the components in the game object.
     * @returns The found components
     */
    public getComponents(): Component[];
    /**
     * Returns all the components for the given class in the game object.
     * @param componentClass The class of the components
     * @returns The found components
     */
    public getComponents<T extends Component>(componentClass: ComponentClass<T>): T[];
    public getComponents<T extends Component>(componentClass?: ComponentClass<T>): T[] {
        return (
            componentClass ? this.gameObject.getComponents(componentClass) : this.gameObject.getComponents()
        ) as T[];
    }

    /**
     * Returns the first component found for the given class, or undefined otherwise.
     * @param componentClass The class of the component
     * @returns The found component
     */
    public getComponent<T extends Component>(componentClass: ComponentClass<T>): T;
    /**
     * Returns the first component found for the given name, or undefined otherwise.
     * @param name The name of the component
     * @returns The found component
     */
    public getComponent<T extends Component>(name: string): T;
    public getComponent<T extends Component>(filter: ComponentClass<T> | string): T {
        return (
            typeof filter === "string"
                ? this.gameObject.getComponent(filter as string)
                : this.gameObject.getComponent(filter as ComponentClass<T>)
        ) as T;
    }

    /**
     * Returns TRUE if the game object has a component for the given class, or FALSE otherwise
     * @param componentClass The class of the component to find
     * @returns boolean
     */
    public hasComponent<T extends Component>(componentClass: ComponentClass<T>): boolean;
    /**
     * @param name The name of the component to find
     * @returns boolean
     */
    public hasComponent(name: string): boolean;
    public hasComponent<T extends Component>(filter: ComponentClass<T> | string): boolean {
        return typeof filter === "string"
            ? this.gameObject.hasComponent(filter as string)
            : this.gameObject.hasComponent(filter as ComponentClass<T>);
    }

    public removeComponent(component: Component): void {
        this.gameObject.removeComponent(component);
    }

    protected _destroy(): void {
        // @ts-ignore
        Object.keys(this).forEach((key) => delete this[key]);
    }

    protected _stopGame(): void {
        // do nothing
    }
}

export abstract class EngineComponent extends Component {
    protected readonly updateEvent: FrameEvent = FrameEvent.UpdateEngine;
}

export abstract class ColliderComponent extends Component {
    protected readonly updateEvent: FrameEvent = FrameEvent.UpdateCollider;
}

export abstract class PhysicsComponent extends Component {
    protected readonly updateEvent: FrameEvent = FrameEvent.UpdatePhysics;
}

export abstract class TransformComponent extends Component {
    protected readonly updateEvent: FrameEvent = FrameEvent.UpdateTransform;
}

export abstract class PreRenderComponent extends Component {
    protected readonly updateEvent: FrameEvent = FrameEvent.UpdatePreRender;
}

export abstract class CameraComponent extends Component {
    protected readonly updateEvent: FrameEvent = FrameEvent.UpdateCamera;
}

export abstract class RenderComponent extends Component {
    protected readonly updateEvent: FrameEvent = FrameEvent.UpdateRender;
}
