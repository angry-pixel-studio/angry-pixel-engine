import { EVENT_START, EVENT_UPDATE } from "./Game";
import GameObject from "./GameObject";

export default abstract class Component {
    public id: string = null;
    public gameObject: GameObject = null;
    public active: boolean = true;

    constructor() {
        window.addEventListener(EVENT_START, this.gameLoopEventHandler);
        window.addEventListener(EVENT_UPDATE, this.gameLoopEventHandler);
        this.gameLoopEventHandler.bind(this);
    }

    private gameLoopEventHandler = (event: Event): void => {
        if (this.active === false) {
            return;
        }

        if (event.type === EVENT_START) {
            this.start((event as CustomEvent).detail);
        } else if (event.type === EVENT_UPDATE) {
            this.update((event as CustomEvent).detail);
        }
    }

    protected start(event: object): void { }

    protected update(event: object): void { }

    public _destroy(): void {
        window.removeEventListener(EVENT_START, this.gameLoopEventHandler);
        window.removeEventListener(EVENT_UPDATE, this.gameLoopEventHandler);

        //Object.keys(this).forEach((key: any) => delete this[key]);
    }
}
