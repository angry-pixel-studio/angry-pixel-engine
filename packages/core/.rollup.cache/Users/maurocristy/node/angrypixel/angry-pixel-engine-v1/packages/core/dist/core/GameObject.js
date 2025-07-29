import { Transform } from "../component/Transform";
import { RigidBody } from "../component/RigidBody";
import { Exception } from "../utils/Exception";
import { FrameEvent } from "./managers/IterationManager";
import { GameActor } from "./GameActor";
/** @internal */
export const LAYER_DEFAULT = "Default";
/**
 * Base class for all objects in the scene.
 * @public
 * @category Core
 * @example
 * ```js
 * class Player extends GameObject {
 *   init(options) {
 *     this.tag = "Tag";
 *     this.layer = "Default";
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
 * class Player extends GameObject {
 *   protected init(options?: InitOptions): void {
 *     this.tag = "Tag";
 *     this.layer = "Default";
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
export class GameObject extends GameActor {
    /** @internal */
    constructor(container, id, name = "", parent = null) {
        super(container);
        /** Layer used for rendering and physics. Default value is "Default". */
        this.layer = LAYER_DEFAULT;
        /** TRUE for UI objects. Default value is FALSE. Renders the object outside the game world coordinates. */
        this.ui = false;
        /** TRUE to prevent the object from being automatically destroyed when changing the scene. Default value is FALSE. */
        this.keep = false;
        /** @internal */
        this._parent = null;
        /** @internal */
        this._active = true;
        /** @internal */
        this.components = [];
        /** @internal */
        this.activeComponentsCache = [];
        /** @internal */
        this.activeChildrenCache = [];
        this.id = id;
        this.name = name;
        this.addComponent(Transform);
        if (parent) {
            this.transform.position = parent.transform.position;
            this.parent = parent; // using the setter instead of the private attribute
        }
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
        this.updateComponentsActiveStatus();
        this.updateChildrenActiveStatus();
        this.onActiveChange();
    }
    /** Parent game object. A child object depends on the parent's Transform. */
    get parent() {
        return this._parent;
    }
    /** Parent game object. A child object depends on the parent's Transform. */
    set parent(parent) {
        this._parent = parent;
        this.transform.parent = parent !== null ? parent.transform : null;
    }
    /** @internal */
    updateComponentsActiveStatus() {
        if (this.active === false)
            this.activeComponentsCache = this.components.filter((component) => component.active);
        this.activeComponentsCache.forEach((component) => (component.active = this.active));
        if (this.active === true)
            this.activeComponentsCache = [];
    }
    /** @internal */
    updateChildrenActiveStatus() {
        if (this.active === false)
            this.activeChildrenCache = this.getChildren().filter((children) => children.active);
        this.activeChildrenCache.forEach((children) => (children.active = this.active));
        if (this.active === true)
            this.activeChildrenCache = [];
    }
    /**
     * Transform component added natively in the object
     */
    get transform() {
        return this.getComponent(Transform);
    }
    /** RigidBody Component (if any) */
    get rigidBody() {
        return this.getComponent(RigidBody);
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
    addComponent(componentClass, arg2, arg3) {
        const options = typeof arg2 === "string" ? undefined : arg2;
        const name = typeof arg2 === "string" ? arg2 : arg3;
        const component = new componentClass(this.container, this, name);
        this.checkMultipleComponent(component, componentClass);
        this.components.push(component);
        component.dispatch(FrameEvent.Init, options);
        return component;
    }
    /** @internal */
    checkMultipleComponent(component, componentClass) {
        if (component.allowMultiple === false && this.hasComponent(componentClass)) {
            throw new Exception(`GameObject only allows one component of type ${componentClass.name}`);
        }
    }
    getComponents(componentClass) {
        return (componentClass
            ? this.components.filter((component) => component instanceof componentClass)
            : this.components);
    }
    getComponent(filter) {
        return (typeof filter === "string"
            ? this.components.find((component) => component.name === filter)
            : this.components.find((component) => component instanceof filter));
    }
    hasComponent(filter) {
        return typeof filter === "string"
            ? this.components.some((component) => component.name === filter)
            : this.components.some((component) => component instanceof filter);
    }
    removeComponent(component) {
        const index = this.components.indexOf(component);
        if (index !== -1) {
            const component = this.components.splice(index, 1)[0];
            component.dispatch(FrameEvent.Destroy);
        }
    }
    /**
     * Add a child game object.
     * @param gameObjectClass The class of the child game object
     * @param options [optional] This options will be passed to the init method
     * @param name [optional] The name of the game object
     * @returns The added child game object
     */
    addChild(gameObjectClass, options, name) {
        const child = this.gameObjectManager.addGameObject(gameObjectClass, options, this, name);
        child.transform.innerPosition.set(0, 0);
        child.transform.position.copy(this.transform.position);
        return child;
    }
    /**
     * @returns The children game objects
     */
    getChildren() {
        return this.gameObjectManager.findGameObjectsByParent(this);
    }
    getChild(filter) {
        return typeof filter === "string"
            ? this.gameObjectManager.findGameObjectByParent(this, filter)
            : this.gameObjectManager.findGameObjectByParent(this, filter);
    }
    /**
     * Destroy all the children game objects
     */
    destroyChildren() {
        this.gameObjectManager
            .findGameObjectsByParent(this)
            .forEach((gameObject) => this.gameObjectManager.destroyGameObject(gameObject));
    }
    /** @internal */
    _destroy() {
        this.destroyComponents();
        // @ts-ignore
        Object.keys(this).forEach((key) => delete this[key]);
    }
    /** @internal */
    destroyComponents() {
        for (let i = 0; i < this.components.length; i++) {
            this.components[i].dispatch(FrameEvent.Destroy);
            delete this.components[i];
        }
        this.components = [];
    }
    /** @internal */
    _stopGame() {
        // do nothing
    }
}
//# sourceMappingURL=GameObject.js.map