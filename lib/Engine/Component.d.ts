import { GameObject } from "./GameObject";
import { Scene } from "./Scene";
export declare abstract class Component {
    private sceneManager;
    private gameObjectManager;
    readonly uuid: string;
    allowMultiple: boolean;
    type: string;
    name: string;
    gameObject: GameObject;
    private _active;
    private firstFrame;
    constructor();
    protected createEventListener(): void;
    protected destroyEventListener(): void;
    get active(): boolean;
    setActive(active: boolean): void;
    protected gameLoopEventHandler: () => void;
    protected start(): void;
    protected update(): void;
    getCurrentScene<T extends Scene>(): T;
    getComponentByName<T extends Component>(name: string): T | null;
    getComponentByType<T extends Component>(type: string): T | null;
    getComponentsByType<T extends Component>(type: string): T[];
    findGameObjectByName<T extends GameObject>(name: string): T | null;
    findGameObjectsByTag(tag: string): GameObject[];
    findGameObjectByTag<T extends GameObject>(tag: string): T | null;
    destroyGameObjectByName(name: string): void;
    destroyGameObject(gameObject: GameObject): void;
    /**
     * @description NOTE: Do not call this method. Use GameObject.setComponentActive instead.
     */
    destroy(): void;
}
export declare class PhysicsComponent extends Component {
    protected createEventListener(): void;
    protected destroyEventListener(): void;
}
export declare class RenderComponent extends Component {
    protected createEventListener(): void;
    protected destroyEventListener(): void;
}
