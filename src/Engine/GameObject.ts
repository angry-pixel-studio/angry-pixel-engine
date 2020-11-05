import { v4 as uuidv4 } from "uuid";
import { Component } from "./Component";
import { Transform, TYPE_TRANSFORM } from "./Components/Transform";
import { GameObjectManager, GameObjectFactory } from "./Core/GameObject/GameObjectManager";
import { SceneManager } from "./Core/Scene/SceneManager";
import { container, EVENT_UPDATE } from "./Game";
import { Scene } from "./Scene";

export const LAYER_DEFAULT = "Default";

type ComponentConstructor = () => Component;

export class GameObject {
    private readonly _uuid: string = uuidv4();

    public name: string = null;
    public tag: string = null;
    public layer: string = LAYER_DEFAULT;
    public ui: boolean = false;

    private _active: boolean = true;
    private firstFrame: boolean = true;
    private _parent: GameObject | null = null;

    private sceneManager: SceneManager = container.getSingleton<SceneManager>("SceneManager");
    private gameObjectManager: GameObjectManager = container.getSingleton<GameObjectManager>("GameObjectManager");
    private components: Component[] = [];
    private inactiveComponents: string[] = [];
    private inactiveChildren: string[] = [];

    constructor() {
        this.addComponent(() => new Transform());

        this.gameLoopEventHandler.bind(this);
        window.addEventListener(EVENT_UPDATE, this.gameLoopEventHandler);
    }

    public get uuid(): string {
        return this._uuid;
    }

    public get transform(): Transform {
        return this.getComponentByType<Transform>(TYPE_TRANSFORM);
    }

    public get active(): boolean {
        return this._active;
    }

    public get parent(): GameObject {
        return this._parent;
    }

    public set parent(parent: GameObject | null) {
        this._parent = parent;
        this.transform.forceUpdate();
    }

    public getCurrentScene<T extends Scene>(): T {
        return this.sceneManager.getCurrentScene<T>();
    }

    private gameLoopEventHandler = (): void => {
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

    public findGameObjectByName<T extends GameObject>(name: string): T | null {
        return this.gameObjectManager.findGameObjectByName(name) as T;
    }

    public findGameObjectsByTag(tag: string): GameObject[] {
        return this.gameObjectManager.findGameObjectsByTag(tag);
    }

    public findGameObjectByTag<T extends GameObject>(tag: string): T | null {
        return this.gameObjectManager.findGameObjectByTag(tag) as T;
    }

    public addComponent<T extends Component>(
        componentConstructor: ComponentConstructor,
        name: string | null = null
    ): T {
        const component = componentConstructor();
        component.name = name;
        component.gameObject = this;
        this.components.push(component);

        return component as T;
    }

    public getComponents(): Component[] {
        return this.components;
    }

    public getComponentByName<T extends Component>(name: string): T | null {
        return this.components.reduce((prev, component) => (component.name === name ? component : prev), null) as T;
    }

    public getComponentByType<T extends Component>(type: string): T | null {
        return this.components.reduce((prev, component) => (component.type === type ? component : prev), null) as T;
    }

    public getComponentsByType<T extends Component>(type: string): T[] {
        return this.components.filter<T>((component: Component): component is T => component.type === type);
    }

    public hasComponentOfName(name: string): boolean {
        return this.getComponentByName(name) !== null;
    }

    public hasComponentOfType(type: string): boolean {
        return this.getComponentByType(type) !== null;
    }

    public removeComponentByName(name: string): void {
        this.components.every((component: Component, index: number) => {
            if (component.name === name) {
                component.destroy();
                delete this.components[index];

                return false;
            }
        });
    }

    public removeComponentByType(type: string): void {
        this.components.every((component: Component, index: number) => {
            if (component.type === type) {
                component.destroy();
                delete this.components[index];

                return false;
            }
        });
    }

    public removeComponents(): void {
        this.components.every((component: Component, index: number) => {
            component.destroy();
            return delete this.components[index];
        });

        this.components = [];
    }

    public addChild(gameObjectFactory: GameObjectFactory, name: string): this {
        this.gameObjectManager.addGameObject(gameObjectFactory, name, this);

        return this;
    }

    public getChildren(): GameObject[] {
        return this.gameObjectManager.findGameObjectsByParent(this);
    }

    public getChild<T extends GameObject>(name: string): T {
        return this.gameObjectManager.findGameObjectByParentAndName(this, name) as T;
    }

    public destroyChildren(): void {
        this.gameObjectManager
            .findGameObjectsByParent(this)
            .every((gameObject: GameObject) => this.gameObjectManager.destroyGameObject(gameObject));
    }

    public setActive(active: boolean): void {
        if (active === false) {
            this.updateInactiveCache();
        }

        this.components
            .filter((component: Component) => this.inactiveComponents.indexOf(component.uuid) === -1)
            .forEach((component: Component) => component.setActive(active));

        this.getChildren()
            .filter((gameObject: GameObject) => this.inactiveChildren.indexOf(gameObject.uuid) === -1)
            .forEach((gameObject: GameObject) => gameObject.setActive(active));

        this.transform.forceUpdate();
        this._active = active;
    }

    private updateInactiveCache(): void {
        this.inactiveComponents = [];
        this.inactiveChildren = [];

        this.components
            .filter((component: Component) => component.active === false)
            .forEach((component: Component) => this.inactiveComponents.push(component.uuid));

        this.getChildren()
            .filter((gameObject: GameObject) => gameObject.active === false)
            .forEach((gameObject: GameObject) => this.inactiveChildren.push(gameObject.uuid));
    }

    public destroyGameObjectByName(name: string): void {
        this.destroyGameObject(this.findGameObjectByName(name));
    }

    public destroyGameObject(gameObject: GameObject): void {
        this.gameObjectManager.destroyGameObject(gameObject);
    }

    /**
     * @description NOTE: do not use this method. Use GameObject.destroyGameObject or Scene.destroyGameObject instead.
     */
    public destroy(): void {
        window.removeEventListener(EVENT_UPDATE, this.gameLoopEventHandler);

        this.removeComponents();

        // @ts-ignore
        Object.keys(this).forEach((key) => delete this[key]);
    }
}
