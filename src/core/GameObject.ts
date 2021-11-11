import { Component } from "./Component";
import { ComponentTypes } from "../component/ComponentTypes";
import { Transform } from "../component/Transform";
import { Exception, exceptionName } from "../utils/Exception";
import { GameObjectManager, GameObjectFactory } from "../core/managers/GameObjectManager";
import { SceneManager } from "../core/managers/SceneManager";
import { container } from "./Game";
import { Scene } from "./Scene";
import { uuid } from "../utils/UUID";
import { EVENT_START, EVENT_UPDATE } from "./managers/IterationManager";

export const LAYER_DEFAULT = "Default";

export type ComponentFactory = () => Component;

export class GameObject {
    public readonly id: string = uuid();
    public name: string = null;
    public tag: string = null;
    public layer: string = LAYER_DEFAULT;
    public ui: boolean = false;

    private _active: boolean = true;
    private _parent: GameObject | null = null;
    private started: boolean = false;

    private sceneManager: SceneManager = container.getSingleton<SceneManager>("SceneManager");
    private gameObjectManager: GameObjectManager = container.getSingleton<GameObjectManager>("GameObjectManager");
    private components: Component[] = [];
    private inactiveComponents: string[] = [];
    private inactiveChildren: string[] = [];

    constructor() {
        this.addComponent(() => new Transform());

        window.addEventListener(EVENT_START, this.gameLoopEventHandler);
        window.addEventListener(EVENT_UPDATE, this.gameLoopEventHandler);
    }

    public get transform(): Transform {
        return this.getComponentByType<Transform>(ComponentTypes.Transform);
    }

    public get active(): boolean {
        return this._active;
    }

    public get parent(): GameObject {
        return this._parent;
    }

    public set parent(parent: GameObject | null) {
        this._parent = parent;
        this.transform.parent = parent ? parent.transform : null;
    }

    private gameLoopEventHandler = (event: Event): void => {
        if (this._active === false) {
            return;
        }

        try {
            if (!this.started && event.type === EVENT_START) {
                this.start();
                this.started = true;
            } else if (this.started && event.type === EVENT_UPDATE) {
                this.update();
            }
        } catch (error: unknown) {
            if ((error as Error).name === exceptionName) {
                throw error;
            } else {
                throw new Exception((error as Error).message);
            }
        }
    };

    /**
     * This method is only ever called once.
     * Recommended for GameObject cration.
     */
    public init(): void {
        return;
    }

    /**
     * This method is only ever called once.
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
        component.init();
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
                component.destroy();
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
                component.destroy();
                delete this.components[index];

                return false;
            }
        });
    }

    /**
     * Remove all added components
     */
    public removeComponents(): void {
        this.components.every((component: Component, index: number) => {
            component.destroy();
            return delete this.components[index];
        });

        this.components = [];
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
     * If the object become inactive, every component and child game object will stop their execution.
     *
     * @param active TRUE or FALE
     */
    public setActive(active: boolean): void {
        if (active === false) {
            this.updateInactiveCache();
        }

        this.components
            .filter((component: Component) => this.inactiveComponents.indexOf(component.id) === -1)
            .forEach((component: Component) => component.setActive(active));

        this.getChildren()
            .filter((gameObject: GameObject) => this.inactiveChildren.indexOf(gameObject.id) === -1)
            .forEach((gameObject: GameObject) => gameObject.setActive(active));

        // this.transform.forceUpdate();
        this._active = active;
    }

    private updateInactiveCache(): void {
        this.inactiveComponents = [];
        this.inactiveChildren = [];

        this.components
            .filter((component: Component) => component.active === false)
            .forEach((component: Component) => this.inactiveComponents.push(component.id));

        this.getChildren()
            .filter((gameObject: GameObject) => gameObject.active === false)
            .forEach((gameObject: GameObject) => this.inactiveChildren.push(gameObject.id));
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

    /**
     * @description NOTE: do not use this method. Use GameObject.destroyGameObject or Scene.destroyGameObject instead.
     */
    public destroy(): void {
        window.removeEventListener(EVENT_START, this.gameLoopEventHandler);
        window.removeEventListener(EVENT_UPDATE, this.gameLoopEventHandler);

        this.removeComponents();

        // @ts-ignore
        Object.keys(this).forEach((key) => delete this[key]);
    }
}
