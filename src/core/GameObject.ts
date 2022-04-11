import { Component } from "./Component";
import { ComponentTypes } from "../component/ComponentTypes";
import { Transform } from "../component/Transform";
import { RigidBody } from "../component/RigidBody";
import { Exception } from "../utils/Exception";
import { GameObjectManager, GameObjectFactory } from "../core/managers/GameObjectManager";
import { SceneManager } from "../core/managers/SceneManager";
import { container } from "./Game";
import { Scene } from "./Scene";
import { uuid } from "../utils/UUID";
import { FrameEvent } from "./managers/IterationManager";

export const LAYER_DEFAULT = "Default";

export type ComponentFactory = () => Component;

export class GameObject {
    public readonly id: string = uuid();
    public name: string;
    public tag: string;
    public layer: string = LAYER_DEFAULT;
    public ui: boolean = false;
    public keep: boolean = false;

    private _active: boolean = true;
    private _parent: GameObject | null = null;
    private started: boolean = false;

    private sceneManager: SceneManager = container.getSingleton<SceneManager>("SceneManager");
    private gameObjectManager: GameObjectManager = container.getSingleton<GameObjectManager>("GameObjectManager");
    private components: Component[] = [];

    constructor() {
        this.addComponent(() => new Transform());
    }

    public get active(): boolean {
        return this._active;
    }

    public setActive(active: boolean): void {
        this._active = active;
    }

    public get transform(): Transform {
        return this.getComponentByType<Transform>(ComponentTypes.Transform);
    }

    public get rigidBody(): RigidBody {
        return this.getComponentByType(ComponentTypes.RigidBody);
    }

    public get parent(): GameObject | null {
        return this._parent;
    }

    public set parent(parent: GameObject | null) {
        this._parent = parent;
        this.transform.parent = parent ? parent.transform : null;
    }

    public dispatch(event: FrameEvent): void {
        if (event === FrameEvent.Init) {
            this.init();
            return;
        } else if (event === FrameEvent.Destroy) {
            this.destroy();
            this._destroy();
            return;
        }

        if (this.active === false || (this.parent && this.parent.active === false)) return;

        if (event === FrameEvent.Start && this.started === false) {
            this.start();
            this.started = true;
        } else if (event === FrameEvent.Update && this.started) {
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
     * This method is called before the object is destroyed.
     */
    protected destroy(): void {
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
     * Add a components to the game obejct
     *
     * @param componentFactory The factory function for the component
     * @param name (optional) The name of the component, this must not be used by another component
     * @returns The added component
     */
    public addComponent<T extends Component>(componentFactory: ComponentFactory, name: string | null = null): T {
        const component = componentFactory();
        this.checkMultipleComponent(component);

        component.name = name;
        component.gameObject = this;
        component.dispatch(FrameEvent.Init);
        this.components.push(component);

        return component as T;
    }

    private checkMultipleComponent(component: Component): void {
        if (component.allowMultiple === false && this.hasComponentOfType(component.type)) {
            throw new Exception(`GameObject only allows one component of type ${component.type}`);
        }
    }

    /**
     * @returns All the added components
     */
    public getComponents(): Component[] {
        return this.components;
    }

    /**
     * @param name The name of the component to find
     * @returns The found component
     */
    public getComponentByName<T extends Component>(name: string): T {
        return this.components.reduce((prev, component) => (component.name === name ? component : prev), null) as T;
    }

    /**
     * @param type The type of the component to find
     * @returns The found component
     */
    public getComponentByType<T extends Component>(type: string): T {
        return this.components.reduce((prev, component) => (component.type === type ? component : prev), null) as T;
    }

    /**
     * @param type The type of the components to find
     * @returns The found components
     */
    public getComponentsByType<T extends Component>(type: string): T[] {
        return this.components.filter<T>((component: Component): component is T => component.type === type);
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
        this.components.every((component: Component, index: number) => {
            if (component.name === name) {
                component.dispatch(FrameEvent.Destroy);
                delete this.components[index];

                return false;
            }
        });
    }

    /**
     * @param type The tyepe of the component to remove
     */
    public removeComponentByType(type: string): void {
        this.components.every((component: Component, index: number) => {
            if (component.type === type) {
                component.dispatch(FrameEvent.Destroy);
                delete this.components[index];

                return false;
            }
        });
    }

    /**
     * Add a child game object.
     *
     * @param gameObjectFactory The factory of the child game object
     * @param name The name of the child game object, this must not be used by another game object
     * @returns The added child game object
     */
    public addChild<T extends GameObject>(gameObjectFactory: GameObjectFactory, name: string): T {
        return this.gameObjectManager.addGameObject(gameObjectFactory, name, this) as T;
    }

    /**
     * @returns The children game objects
     */
    public getChildren(): GameObject[] {
        return this.gameObjectManager.findGameObjectsByParent(this);
    }

    /**
     * @param name The name of the child game object to find
     * @returns The found child game object
     */
    public getChild<T extends GameObject>(name: string): T {
        return this.gameObjectManager.findGameObjectByParentAndName(this, name) as T;
    }

    /**
     * Destroy all the children game objects
     */
    public destroyChildren(): void {
        this.gameObjectManager
            .findGameObjectsByParent(this)
            .forEach((gameObject: GameObject) => this.gameObjectManager.destroyGameObject(gameObject));
    }

    /**
     * Destroy one game objects by its name
     * @param name The name of the game object
     */
    public destroyGameObjectByName(name: string): void {
        this.destroyGameObject(this.findGameObjectByName(name));
    }

    /**
     * Destroy the game objects
     * @param gameObject The game object to destory
     */
    public destroyGameObject(gameObject: GameObject): void {
        this.gameObjectManager.destroyGameObject(gameObject);
    }

    private _destroy(): void {
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
