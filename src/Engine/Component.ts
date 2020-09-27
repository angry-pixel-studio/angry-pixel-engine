import Game, { EVENT_UPDATE } from "./Game";
import GameObject from "./GameObject";

export default abstract class Component {
    public id: string = null;
    public gameObject: GameObject = null;
    public active: boolean = true;
    private firstFrame: boolean = true;

    constructor() {
        this.gameLoopEventHandler.bind(this);
        window.addEventListener(EVENT_UPDATE, this.gameLoopEventHandler);
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

    public getComponent<T extends Component>(id: string): T | null {
        return this.gameObject.getComponent<T>(id);
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

    public _destroy(): void {
        window.removeEventListener(EVENT_UPDATE, this.gameLoopEventHandler);

        // @ts-ignore
        Object.keys(this).forEach((key: any) => delete this[key]);
    }
}
