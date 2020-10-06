import { v4 as uuidv4 } from "uuid";
import GameObjectManager from "./Core/GameObject/GameObjectManager";
import Game, { EVENT_UPDATE } from "./Game";
import GameObject from "./GameObject";

export default abstract class Component {
    private gameObjectManager: GameObjectManager = Game.get<GameObjectManager>("GameObjectManager");

    private readonly _uuid: string = uuidv4();
    public name: string = null;
    public gameObject: GameObject = null;
    public active: boolean = true;
    private firstFrame: boolean = true;

    constructor() {
        this.gameLoopEventHandler.bind(this);
        window.addEventListener(EVENT_UPDATE, this.gameLoopEventHandler);
    }

    public get uuid(): string {
        return this._uuid;
    }

    private gameLoopEventHandler = (event: Event): void => {
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

    protected start(event: unknown): void {
        // do nothing
    }

    protected update(event: Record<string, unknown>): void {
        // do nothing
    }

    public getComponent<T extends Component>(name: string): T | null {
        return this.gameObject.getComponent<T>(name);
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

    public _destroy(): void {
        window.removeEventListener(EVENT_UPDATE, this.gameLoopEventHandler);

        // @ts-ignore
        Object.keys(this).forEach((key: any) => delete this[key]);
    }
}
