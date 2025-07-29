import { FrameEvent } from "./managers/IterationManager";
import { GameActor } from "./GameActor";
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
export class Component extends GameActor {
    /** @internal */
    constructor(container, gameObject, name = "") {
        super(container);
        /** TRUE if several instances of this component are allowed in the same object. */
        this.allowMultiple = true;
        /** @internal */
        this._active = true;
        this.gameObject = gameObject;
        this.name = name;
    }
    /** TRUE for enabled object, FALSE for disabled object. */
    get active() {
        return this._active;
    }
    /** TRUE for enabled object, FALSE for disabled object. */
    set active(active) {
        if (this._active === active)
            return;
        this._active = active;
        this.onActiveChange();
    }
    /**
     * This method is called when the active state changes.
     */
    onActiveChange() {
        return;
    }
    /**
     * @returns The current loaded scene
     */
    getCurrentScene() {
        return this.sceneManager.getLoadedScene();
    }
    /**
     * @returns The GameObject to which this component is attached
     */
    getGameObject() {
        return this.gameObject;
    }
    getComponents(componentClass) {
        return (componentClass ? this.gameObject.getComponents(componentClass) : this.gameObject.getComponents());
    }
    getComponent(filter) {
        return (typeof filter === "string"
            ? this.gameObject.getComponent(filter)
            : this.gameObject.getComponent(filter));
    }
    hasComponent(filter) {
        return typeof filter === "string"
            ? this.gameObject.hasComponent(filter)
            : this.gameObject.hasComponent(filter);
    }
    /**
     * Removes the given component in the GameObject
     * @param component The class of the component to remnove
     */
    removeComponent(component) {
        this.gameObject.removeComponent(component);
    }
    /** @internal */
    _destroy() {
        // @ts-ignore
        Object.keys(this).forEach((key) => delete this[key]);
    }
    /** @internal */
    _stopGame() {
        // do nothing
    }
}
/** @internal */
export class EngineComponent extends Component {
    constructor() {
        super(...arguments);
        this.updateEvent = FrameEvent.UpdateEngine;
    }
}
/** @internal */
export class ColliderComponent extends Component {
    constructor() {
        super(...arguments);
        this.updateEvent = FrameEvent.UpdateCollider;
    }
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
export class PhysicsComponent extends Component {
    constructor() {
        super(...arguments);
        this.updateEvent = FrameEvent.UpdatePhysics;
    }
}
/** @internal */
export class TransformComponent extends Component {
    constructor() {
        super(...arguments);
        this.updateEvent = FrameEvent.UpdateTransform;
    }
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
export class PreRenderComponent extends Component {
    constructor() {
        super(...arguments);
        this.updateEvent = FrameEvent.UpdatePreRender;
    }
}
/** @internal */
export class CameraComponent extends Component {
    constructor() {
        super(...arguments);
        this.updateEvent = FrameEvent.UpdateCamera;
    }
}
/** @internal */
export class RenderComponent extends Component {
    constructor() {
        super(...arguments);
        this.updateEvent = FrameEvent.UpdateRender;
    }
}
//# sourceMappingURL=Component.js.map