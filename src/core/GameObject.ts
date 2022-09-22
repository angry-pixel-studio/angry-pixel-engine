import { Component, ComponentClass } from "./Component";
import { Transform } from "../component/Transform";
import { RigidBody } from "../component/RigidBody";
import { Exception } from "../utils/Exception";
import { SceneManager } from "../core/managers/SceneManager";
import { container } from "./Game";
import { Scene } from "./Scene";
import { uuid } from "../utils/UUID";
import { FrameEvent } from "./managers/IterationManager";
import { GameActor, InitOptions } from "./GameActor";

export const LAYER_DEFAULT = "Default";

export type GameObjectClass<T extends GameObject = GameObject> = new (name?: string, parent?: GameObject) => T;

export class GameObject extends GameActor {
    public readonly id: string = uuid();
    public readonly name: string;

    public tag: string;
    public layer: string = LAYER_DEFAULT;
    public ui: boolean = false;
    public keep: boolean = false;
    private _parent: GameObject | null = null;

    private _active: boolean = true;

    private sceneManager: SceneManager = container.getSingleton<SceneManager>("SceneManager");
    private components: Component[] = [];
    private activeComponentsCache: Component[] = [];
    private activeChildrenCache: GameObject[] = [];

    constructor(name: string = "", parent?: GameObject) {
        super();

        this.name = name;
        this.addComponent(Transform);

        this.parent = parent ?? null; // using the setter instead of the private attribute
    }

    public get active(): boolean {
        return this._active;
    }

    public set active(active: boolean) {
        if (this._active === active) return;

        this._active = active;

        this.onActiveChange();
        this.updateComponentsActiveStatus();
        this.updateChildrenActiveStatus();
    }

    public get parent(): GameObject | null {
        return this._parent;
    }

    public set parent(parent: GameObject | null) {
        this._parent = parent;
        this.transform.parent = parent !== null ? parent.transform : null;
    }

    private updateComponentsActiveStatus(): void {
        if (this.active === false) this.activeComponentsCache = this.components.filter((component) => component.active);
        this.activeComponentsCache.forEach((component) => (component.active = this.active));
        if (this.active === true) this.activeComponentsCache = [];
    }

    private updateChildrenActiveStatus(): void {
        if (this.active === false) this.activeChildrenCache = this.getChildren().filter((children) => children.active);
        this.activeChildrenCache.forEach((children) => (children.active = this.active));
        if (this.active === true) this.activeChildrenCache = [];
    }

    public get transform(): Transform {
        return this.getComponent<Transform>(Transform);
    }

    public get rigidBody(): RigidBody {
        return this.getComponent<RigidBody>(RigidBody);
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
     * Add a component to the game obejct
     * @param componentClass The class of the component
     * @param options [optional] The options passed to the init method of the component
     * @param name [optional] The name of the component
     * @returns The added component
     */
    public addComponent<ComponentType extends Component = Component, OptionsType extends InitOptions = InitOptions>(
        componentClass: ComponentClass<ComponentType>,
        options?: OptionsType,
        name?: string
    ): ComponentType {
        const component = new componentClass(this, name);
        this.checkMultipleComponent(component, componentClass);

        this.components.push(component);
        component.dispatch(FrameEvent.Init, options);

        return component;
    }

    private checkMultipleComponent(component: Component, componentClass: ComponentClass): void {
        if (component.allowMultiple === false && this.hasComponent(componentClass)) {
            throw new Exception(`GameObject only allows one component of type ${componentClass.name}`);
        }
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
            componentClass
                ? this.components.filter<T>(
                      (component: Component): component is T => component instanceof componentClass
                  )
                : this.components
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
                ? this.components.find((component) => component.name === filter)
                : this.components.find((component) => component instanceof filter)
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
            ? this.components.some((component) => component.name === filter)
            : this.components.some((component) => component instanceof filter);
    }

    public removeComponent(component: Component): void {
        const index: number = this.components.indexOf(component);

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
    public addChild<T extends GameObject>(
        gameObjectClass: GameObjectClass<T>,
        options?: InitOptions,
        name?: string
    ): T {
        const child = this.gameObjectManager.addGameObject<T>(gameObjectClass, options, this, name);

        child.transform.innerPosition.set(0, 0);
        child.transform.position.copy(this.transform.position);

        return child;
    }

    /**
     * @returns The children game objects
     */
    public getChildren<T extends GameObject>(): T[] {
        return this.gameObjectManager.findGameObjectsByParent<T>(this);
    }

    /**
     * Returns the first child found for the given class, or undefined otherwise.
     * @param gameObjectClass The class of the child game object to find
     * @returns The found child game object
     */
    public getChild<T extends GameObject>(gameObjectClass: GameObjectClass<T>): T;
    /**
     * Returns the first child found for the given name, or undefined otherwise.
     * @param name The name of the child game object to find
     * @returns The found child game object
     */
    public getChild<T extends GameObject>(name: string): T;
    public getChild<T extends GameObject>(filter: GameObjectClass<T> | string): T {
        return typeof filter === "string"
            ? this.gameObjectManager.findGameObjectByParent(this, filter as string)
            : this.gameObjectManager.findGameObjectByParent(this, filter as GameObjectClass<T>);
    }

    /**
     * Destroy all the children game objects
     */
    public destroyChildren(): void {
        this.gameObjectManager
            .findGameObjectsByParent(this)
            .forEach((gameObject: GameObject) => this.gameObjectManager.destroyGameObject(gameObject));
    }

    protected _destroy(): void {
        this.destroyComponents();

        // @ts-ignore
        Object.keys(this).forEach((key) => delete this[key]);
    }

    private destroyComponents(): void {
        for (let i = 0; i < this.components.length; i++) {
            this.components[i].dispatch(FrameEvent.Destroy);
            delete this.components[i];
        }

        this.components = [];
    }
}
