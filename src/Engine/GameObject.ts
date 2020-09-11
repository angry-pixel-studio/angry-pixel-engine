import Transform from "./Components/Transform";
import { EVENT_START, EVENT_UPDATE } from "./Game";
import Scene from "./Scene";
import Component from "./Component";

export const LAYER_DEFAULT = 'Default';
export const TRANSFORM_ID = 'Transform';

export default class GameObject {
    public id: string = null;
    public tag: string  = null;
    public layer: string = LAYER_DEFAULT;
    public active: boolean = true;
    
    public scene: Scene = null;
    public parent: GameObject|null = null;
    
    private components: Array<any> = [];
    private gameObjects: Array<any> = [];
    private inactiveComponents: Array<any> = [];
    private inactiveGameObjects: Array<any> = [];
    private processingLoop: boolean = false;

    constructor() {
        this.addComponent(() => new Transform(), TRANSFORM_ID);

        window.addEventListener(EVENT_START, this.gameLoopEventHandler);
        window.addEventListener(EVENT_UPDATE, this.gameLoopEventHandler);
    }

    gameLoopEventHandler = (event: Event): void => {
        if (this.active === false || this.processingLoop === true) {
            return;
        }

        if (event.type === EVENT_START) {
            this.processingLoop = true;
            this.start((event as CustomEvent).detail);
        } else if (event.type === EVENT_UPDATE) {
            this.processingLoop = true;
            this.update((event as CustomEvent).detail);
        }

        this.processingLoop = false;
    }

    protected start(event: object): void { }

    protected update(event: object): void { }

    get transform(): Transform {
        return this.getComponent<Transform>(TRANSFORM_ID);
    }

    public addComponent(componentFunction: Function , id: string|null = null): this {
        const component = componentFunction();
        component.id = id;
        component.gameObject = this;
        this.components.push(component);

        return this;
    }

    public getComponents(): Component[] {
        return this.components;
    }

    public getComponent<CType>(id: string): CType|null {
        return this.components.reduce(
            (prev, component) => component.id === id
                ? component
                : prev
            , null
        );
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

    public addChild(gameObjectFunction: Function, id: string|null = null): this {
        const gameObject = gameObjectFunction();
        gameObject.id = id;
        gameObject.parent = this;
        gameObject.scene = this.scene;
        this.gameObjects.push(gameObject);

        return this;
    }

    public getChildren(): GameObject[] {
        return this.gameObjects;
    }

    public getChild<CType>(id: string): CType|null {
        return this.gameObjects.reduce(
            (prev, child) => child.id === id
                ? child
                : prev
            , null
        );
    }

    public getChildrenByTag(tag: string): Array<GameObject> {
        return this.gameObjects.filter(object => object.tag === tag);
    }

    public getChildByTag<CType>(tag: string): CType|null {
        const objects = this.gameObjects.filter(object => object.tag === tag);
        return objects.length > 0 ? objects[0] : null;
    }

    public destroyChild(id: string): void {
        this.gameObjects.every((gameObject, index) => {
            if (gameObject.id === id) {
                gameObject._destroy();
                delete this.gameObjects[index];

                return false;
            }
        });
    }

    public destroyChildren(): void {
        this.gameObjects.every((gameObject, index) => {
            gameObject._destroy();
            return delete this.gameObjects[index];
        });
    }

    public setActive(value: boolean) {
        this.components
            .filter(component => this.inactiveComponents.indexOf(component.id) === -1)
            .forEach(component => component.active = value);

        this.gameObjects
            .filter(gameObject => this.inactiveGameObjects.indexOf(gameObject.id) === -1)
            .forEach(gameObject => gameObject.setActive(value));

        this.active = value;
    }

    public setComponentActive(id: string, active: boolean): void {
        const component = this.getComponent<Component>(id);
        
        if (component === null) {
            throw `Component ith id ${id} does not exists`;
        }

        const inactiveIndex = this.inactiveComponents.indexOf(id);

        if (active === false && inactiveIndex === -1) {
            this.inactiveComponents.push(id);
        } else if (active === true && inactiveIndex !== -1) {
            delete this.inactiveComponents[inactiveIndex];
        }

        component.active = active;
    }

    public setChildActive(id: string, active: boolean): void {
        const gameObject = this.getChild<GameObject>(id);
        
        if (gameObject === null) {
            throw `GameObject with id ${id} does not exists`;
        }

        const inactiveIndex = this.inactiveGameObjects.indexOf(id);

        if (active === false && inactiveIndex === -1) {
            this.inactiveGameObjects.push(id);
        } else if (active === true && inactiveIndex !== -1) {
            delete this.inactiveGameObjects[inactiveIndex];
        }

        gameObject.setActive(active);
    }

    public _destroy(): void {
        window.removeEventListener(EVENT_START, this.gameLoopEventHandler);
        window.removeEventListener(EVENT_UPDATE, this.gameLoopEventHandler);

        this.removeComponents();
        this.destroyChildren();

        //Object.keys(this).forEach(key => delete this[key]);
    }
}
