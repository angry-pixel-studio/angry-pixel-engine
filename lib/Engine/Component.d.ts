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
    private started;
    constructor();
    protected get updateEvent(): string;
    get active(): boolean;
    setActive(active: boolean): void;
    protected gameLoopEventHandler: (event: Event) => void;
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
    protected get updateEvent(): string;
}
export declare class RenderComponent extends Component {
    protected get updateEvent(): string;
}
