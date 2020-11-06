import { Component } from "./Component";
import { Transform } from "./Components/Transform";
import { GameObjectFactory } from "./Core/GameObject/GameObjectManager";
import { Scene } from "./Scene";
export declare const LAYER_DEFAULT = "Default";
declare type ComponentConstructor = () => Component;
export declare class GameObject {
    private readonly _uuid;
    name: string;
    tag: string;
    layer: string;
    ui: boolean;
    private _active;
    private firstFrame;
    private _parent;
    private sceneManager;
    private gameObjectManager;
    private components;
    private inactiveComponents;
    private inactiveChildren;
    constructor();
    get uuid(): string;
    get transform(): Transform;
    get active(): boolean;
    get parent(): GameObject;
    set parent(parent: GameObject | null);
    getCurrentScene<T extends Scene>(): T;
    private gameLoopEventHandler;
    protected start(): void;
    protected update(): void;
    findGameObjectByName<T extends GameObject>(name: string): T | null;
    findGameObjectsByTag(tag: string): GameObject[];
    findGameObjectByTag<T extends GameObject>(tag: string): T | null;
    addComponent<T extends Component>(componentConstructor: ComponentConstructor, name?: string | null): T;
    private checkMultipleComponent;
    getComponents(): Component[];
    getComponentByName<T extends Component>(name: string): T | null;
    getComponentByType<T extends Component>(type: string): T | null;
    getComponentsByType<T extends Component>(type: string): T[];
    hasComponentOfName(name: string): boolean;
    hasComponentOfType(type: string): boolean;
    removeComponentByName(name: string): void;
    removeComponentByType(type: string): void;
    removeComponents(): void;
    addChild(gameObjectFactory: GameObjectFactory, name: string): this;
    getChildren(): GameObject[];
    getChild<T extends GameObject>(name: string): T;
    destroyChildren(): void;
    setActive(active: boolean): void;
    private updateInactiveCache;
    destroyGameObjectByName(name: string): void;
    destroyGameObject(gameObject: GameObject): void;
    /**
     * @description NOTE: do not use this method. Use GameObject.destroyGameObject or Scene.destroyGameObject instead.
     */
    destroy(): void;
}
export {};
