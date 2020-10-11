import { v4 as uuidv4 } from "uuid";
import Component from "./Component";
import Transform from "./Components/Transform";
import GameObjectManager, { GameObjectFactory } from "./Core/GameObject/GameObjectManager";
import SceneManager from "./Core/Scene/SceneManager";
import { container, EVENT_UPDATE } from "./Game";
import Scene from "./Scene";

export const LAYER_DEFAULT = "Default";
export const TRANSFORM_ID = "Transform";

type ComponentConstructor = () => Component;

export default class GameObject {
    private readonly _uuid: string = uuidv4();

    public name: string = null;
    public tag: string = null;
    public layer: string = LAYER_DEFAULT;
    public ui: boolean = false;

    public active: boolean = true;
    private firstFrame: boolean = true;
    private _parent: GameObject | null = null;

    private sceneManager: SceneManager = container.getSingleton<SceneManager>("SceneManager");
    private gameObjectManager: GameObjectManager = container.getSingleton<GameObjectManager>("GameObjectManager");
    private components: Component[] = [];
    private inactiveComponents: string[] = [];
    private inactiveChildren: string[] = [];

    constructor() {
        this.addComponent(() => new Transform(), TRANSFORM_ID);

        this.gameLoopEventHandler.bind(this);
        window.addEventListener(EVENT_UPDATE, this.gameLoopEventHandler);
    }

    public get uuid(): string {
        return this._uuid;
    }

    public get transform(): Transform {
        return this.getComponent<Transform>(TRANSFORM_ID);
    }

    public get parent(): GameObject {
        return this._parent;
    }

    public set parent(parent: GameObject | null) {
        this._parent = parent;
        this.transform.update();
    }

    public getCurrentScene<T extends Scene>(): T {
        return this.sceneManager.getCurrentScene<T>();
    }

    gameLoopEventHandler = (): void => {
        if (this.active === false) {
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

    public addComponent(componentConstructor: ComponentConstructor, name: string | null = null): this {
        const component = componentConstructor();
        component.name = name;
        component.gameObject = this;
        this.components.push(component);

        return this;
    }

    public getComponents(): Component[] {
        return this.components;
    }

    public getComponent<T extends Component>(name: string): T | null {
        return this.components.reduce((prev, component) => (component.name === name ? component : prev), null) as T;
    }

    public hasComponent(name: string): boolean {
        return this.getComponent(name) !== null;
    }

    public removeComponent(name: string): void {
        this.components.every((component: Component, index: number) => {
            if (component.name === name) {
                component._destroy();
                delete this.components[index];

                return false;
            }
        });
    }

    public removeComponents(): void {
        this.components.every((component: Component, index: number) => {
            component._destroy();
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

    public setActive(value: boolean): void {
        this.components
            .filter((component: Component) => this.inactiveComponents.indexOf(component.uuid) === -1)
            .forEach((component: Component) => (component.active = value));

        this.getChildren()
            .filter((gameObject: GameObject) => this.inactiveChildren.indexOf(gameObject.uuid) === -1)
            .forEach((gameObject: GameObject) => gameObject.setActive(value));

        this.transform.update();
        this.active = value;
    }

    public setComponentActive(name: string, active: boolean): void {
        const component = this.getComponent(name);

        if (component === null) {
            throw new Error(`Component with id ${name} does not exists`);
        }

        const inactiveIndex = this.inactiveComponents.indexOf(component.uuid);

        if (active === false && inactiveIndex === -1) {
            this.inactiveComponents.push(component.uuid);
        } else if (active === true && inactiveIndex !== -1) {
            delete this.inactiveComponents[inactiveIndex];
        }

        component.active = active;
    }

    public setChildActive(name: string, active: boolean): void {
        const gameObject = this.getChild(name);

        if (gameObject === null) {
            throw `GameObject with name ${name} does not exists`;
        }

        const inactiveIndex = this.inactiveChildren.indexOf(gameObject.uuid);

        if (active === false && inactiveIndex === -1) {
            this.inactiveChildren.push(gameObject.uuid);
        } else if (active === true && inactiveIndex !== -1) {
            delete this.inactiveChildren[inactiveIndex];
        }

        gameObject.setActive(active);
    }

    public _destroy(): void {
        window.removeEventListener(EVENT_UPDATE, this.gameLoopEventHandler);

        this.removeComponents();

        // @ts-ignore
        Object.keys(this).forEach((key) => delete this[key]);
    }
}
