import { v4 as uuidv4 } from "uuid";
import Component from "./Component";
import Transform from "./Components/Transform";
import { GameObjectFactory } from "./Core/GameObject/GameObjectManager";
import Game, { EVENT_UPDATE } from "./Game";
import Scene from "./Scene";

export const LAYER_DEFAULT = "Default";
export const TRANSFORM_ID = "Transform";

type componentFunction = () => Component;

export default class GameObject {
    private _uuid: string = uuidv4();

    public name: string = null;
    public tag: string = null;
    public layer: string = LAYER_DEFAULT;
    public ui: boolean = false;

    public active: boolean = true;
    public scene: Scene = null;
    private firstFrame: boolean = true;
    private _parent: GameObject | null = null;

    private components: Array<any> = [];
    private gameObjects: Array<any> = [];
    private inactiveComponents: Array<any> = [];
    private inactiveChildren: Array<any> = [];

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

    gameLoopEventHandler = (event: Event): void => {
        if (this.active === false) {
            return;
        }

        if (this.firstFrame === true) {
            this.start((event as CustomEvent).detail);
            this.firstFrame = false;
        } else {
            this.update((event as CustomEvent).detail);
        }
    };

    protected start(event: Record<string, unknown>): void {
        // do nothing
    }

    protected update(event: Record<string, unknown>): void {
        // do nothing
    }

    public findGameObjectByName<T extends GameObject>(name: string): T | null {
        return Game.gameObjectManager.findGameObjectByName(name) as T;
    }

    public findGameObjectsByTag(tag: string): GameObject[] {
        return Game.gameObjectManager.findGameObjectsByTag(tag);
    }

    public findGameObjectByTag<T extends GameObject>(tag: string): T | null {
        return Game.gameObjectManager.findGameObjectByTag(tag) as T;
    }

    public addComponent(componentFunction: componentFunction, id: string | null = null): this {
        const component = componentFunction();
        component.id = id;
        component.gameObject = this;
        this.components.push(component);

        return this;
    }

    public getComponents(): Component[] {
        return this.components;
    }

    public getComponent<CType>(id: string): CType | null {
        return this.components.reduce((prev, component) => (component.id === id ? component : prev), null);
    }

    public hasComponent(id: string): boolean {
        return this.getComponent(id) !== null;
    }

    public removeComponent(id: string): void {
        this.components.every((component, index) => {
            if (component.id === id) {
                component._destroy();
                delete this.components[index];

                return false;
            }
        });
    }

    public removeComponents(): void {
        this.components.every((component, index) => {
            component._destroy();
            return delete this.components[index];
        });
    }

    public addChild(gameObjectFactory: GameObjectFactory, name: string): this {
        Game.gameObjectManager.addGameObject(gameObjectFactory, this.scene, name, this);

        return this;
    }

    public getChildren(): GameObject[] {
        return Game.gameObjectManager.findGameObjectsByParent(this);
    }

    public getChild<T extends GameObject>(name: string): T {
        return Game.gameObjectManager.findGameObjectByParentAndName(this, name) as T;
    }

    public destroyChildren(): void {
        Game.gameObjectManager
            .findGameObjectsByParent(this)
            .every((gameObject) => Game.gameObjectManager.destroyGameObject(gameObject));
    }

    public setActive(value: boolean) {
        this.components
            .filter((component) => this.inactiveComponents.indexOf(component.id) === -1)
            .forEach((component) => (component.active = value));

        this.getChildren()
            .filter((gameObject) => this.inactiveChildren.indexOf(gameObject.uuid) === -1)
            .forEach((gameObject) => gameObject.setActive(value));

        this.transform.update();
        this.active = value;
    }

    public setComponentActive(id: string, active: boolean): void {
        const component = this.getComponent<Component>(id);

        if (component === null) {
            throw new Error(`Component with id ${id} does not exists`);
        }

        const inactiveIndex = this.inactiveComponents.indexOf(id);

        if (active === false && inactiveIndex === -1) {
            this.inactiveComponents.push(id);
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
