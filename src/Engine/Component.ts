import { EVENT_UPDATE } from "./Game";
import GameObject from "./GameObject";

export default abstract class Component {
    public id: string = null;
    public gameObject: GameObject = null;
    public active: boolean = true;
    private firstFrame: boolean = true;
    private processingLoop: boolean = false;

    constructor() {
        this.gameLoopEventHandler.bind(this);
        window.addEventListener(EVENT_UPDATE, this.gameLoopEventHandler);
    }

    private gameLoopEventHandler = (event: Event): void => {
        if (this.active === false || this.processingLoop === true) {
            return;
        }

        this.processingLoop = true;

        if (this.firstFrame === true) {
            this.start((event as CustomEvent).detail);
            this.firstFrame = false;
        } else {
            this.update((event as CustomEvent).detail);
        }

        this.processingLoop = false;
    }

    protected start(event: object): void { }

    protected update(event: object): void { }

    public getComponent<CType>(id: string): CType|null {
        return this.gameObject.getComponent<CType>(id);
    }

    public findGameObject<OType>(id: string): OType|null {
        return this.gameObject.scene.getGameObject<OType>(id);
    }

    public findGameObjectByTag<OType>(tag: string): OType|null {
        return this.gameObject.scene.getGameObjectByTag<OType>(tag);
    }

    public findGameObjectsByTag(tag: string): GameObject[] {
        return this.gameObject.scene.getGameObjectsByTag(tag);
    }

    public _destroy(): void {
        window.removeEventListener(EVENT_UPDATE, this.gameLoopEventHandler);

        // @ts-ignore
        Object.keys(this).forEach((key: any) => delete this[key]);
    }
}
