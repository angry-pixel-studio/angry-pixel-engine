import { GameObject } from "./GameObject";
import { Scene } from "./Scene";
export declare abstract class Component {
    private sceneManager;
    private gameObjectManager;
    readonly uuid: string;
    name: string;
    gameObject: GameObject;
    private _active;
    private firstFrame;
    constructor();
    get active(): boolean;
    setActive(active: boolean): void;
    private gameLoopEventHandler;
    protected start(): void;
    protected update(): void;
    getCurrentScene<T extends Scene>(): T;
    getComponent<T extends Component>(name: string): T | null;
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
