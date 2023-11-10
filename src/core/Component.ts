import { GameObject } from "./GameObject";
import { Scene } from "./Scene";
import { FrameEvent } from "./managers/IterationManager";
import { GameActor } from "./GameActor";
import { Container } from "../utils/Container";

/** @private */
export type ComponentClass<T extends Component = Component> = new (
    container: Container,
    gameObject: GameObject,
    name?: string
) => T;

/**
 * Base class for all components to be added to game objects.
 * @public
 * @category Core
 * @example
 * ```js
 * class MovementsController extends Component {
 *   init(options) {
 *     // executed after instantiation
 *   }
 *   start() {
 *     // executed in the first available frame
 *   }
 *   update() {
 *     // executed on every frame
 *   }
 * }
 * ```
 * @example
 * ```ts
 * class MovementsController extends Component {
 *   protected init(options?: InitOptions): void {
 *     // executed after instantiation
 *   }
 *   protected start(): void {
 *     // executed in the first available frame
 *   }
 *   protected update(): void {
 *     // executed on every frame
 *   }
 * }
 * ```
 */
export abstract class Component extends GameActor {
    /** Name given manually at the time of instantiation. */
    public readonly name: string;
    /** Object to which it belongs. */
    public readonly gameObject: GameObject;
    /** TRUE if several instances of this component are allowed in the same object. */
    public readonly allowMultiple: boolean = true;

    /** @private */
    private _active: boolean = true;

    /** @private */
    constructor(container: Container, gameObject: GameObject, name: string = "") {
        super(container);

        this.gameObject = gameObject;
        this.name = name;
    }

    /** TRUE for enabled object, FALSE for disabled object. */
    public get active(): boolean {
        return this._active;
    }

    /** TRUE for enabled object, FALSE for disabled object. */
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

    /**
     * Removes the given component in the GameObject
     * @param component The class of the component to remnove
     */
    public removeComponent(component: Component): void {
        this.gameObject.removeComponent(component);
    }

    /** @private */
    protected _destroy(): void {
        // @ts-ignore
        Object.keys(this).forEach((key) => delete this[key]);
    }

    /** @private */
    protected _stopGame(): void {
        // do nothing
    }
}

/** @private */
export abstract class EngineComponent extends Component {
    protected readonly updateEvent: FrameEvent = FrameEvent.UpdateEngine;
}

/** @private */
export abstract class ColliderComponent extends Component {
    protected readonly updateEvent: FrameEvent = FrameEvent.UpdateCollider;
}

/**
 * Base class for all components that execute logic at physics frame rate. Ideal for custom physics.
 * @public
 * @category Core
 * @example
 * ```js
 * class PlayerMovements extends PhysicsComponent {
 *   init(options) {
 *     // executed after instantiation
 *   }
 *   start() {
 *     // executed in the first available frame
 *   }
 *   update() {
 *     // executed on every frame
 *   }
 * }
 * ```
 * @example
 * ```ts
 * class PlayerMovements extends PhysicsComponent {
 *   protected init(options?: InitOptions): void {
 *     // executed after instantiation
 *   }
 *   protected start(): void {
 *     // executed in the first available frame
 *   }
 *   protected update(): void {
 *     // executed on every frame
 *   }
 * }
 * ```
 */
export abstract class PhysicsComponent extends Component {
    protected readonly updateEvent: FrameEvent = FrameEvent.UpdatePhysics;
}

/** @private */
export abstract class TransformComponent extends Component {
    protected readonly updateEvent: FrameEvent = FrameEvent.UpdateTransform;
}

/**
 * Base class for all components that execute logic before rendering. Ideal for components that translate cameras.
 * @public
 * @category Core
 * @example
 * ```js
 * class FollowPlayerCamera extends PreRenderComponent {
 *   init(options) {
 *     // executed after instantiation
 *   }
 *   start() {
 *     // executed in the first available frame
 *   }
 *   update() {
 *     // executed on every frame
 *   }
 * }
 * ```
 * @example
 * ```ts
 * class FollowPlayerCamera extends PreRenderComponent {
 *   protected init(options?: InitOptions): void {
 *     // executed after instantiation
 *   }
 *   protected start(): void {
 *     // executed in the first available frame
 *   }
 *   protected update(): void {
 *     // executed on every frame
 *   }
 * }
 * ```
 */
export abstract class PreRenderComponent extends Component {
    protected readonly updateEvent: FrameEvent = FrameEvent.UpdatePreRender;
}

/** @private */
export abstract class CameraComponent extends Component {
    protected readonly updateEvent: FrameEvent = FrameEvent.UpdateCamera;
}

/** @private */
export abstract class RenderComponent extends Component {
    protected readonly updateEvent: FrameEvent = FrameEvent.UpdateRender;
}
