import { EVENT_START, EVENT_UPDATE } from "./Game";

export default class Component {
    id = null;
    gameObject = null;
    active = true;

    constructor() {
        window.addEventListener(EVENT_START, this.gameLoopEventHandler);
        window.addEventListener(EVENT_UPDATE, this.gameLoopEventHandler);
        this.gameLoopEventHandler.bind(this);
    }

    gameLoopEventHandler = event => {
        if (this.active === false) {
            return;
        }

        if (event.type === EVENT_START) {
            this.start(event.detail);
        } else if (event.type === EVENT_UPDATE) {
            this.update(event.detail);
        }
    }

    start() { }

    update() { }

    _destroy() {
        window.removeEventListener(EVENT_START, this.gameLoopEventHandler);
        window.removeEventListener(EVENT_UPDATE, this.gameLoopEventHandler);

        Object.keys(this).forEach(key => delete this[key]);
    }
}
