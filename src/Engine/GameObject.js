import { TRANSFORM } from "./Component";
import Transform from "./Components/Transform";

export default class GameObject {
    components = {};
    transform = null

    constructor() {
        this.components[TRANSFORM] = new Transform(
            this,
            { position: { x: 0, y: 0 } }
        );

        this.transform = this.components[TRANSFORM];

        window.addEventListener('gameLoop', this.gameLoopEventHandler);
    }

    addComponent(key, component) {
        this.components[key] = component;
    }

    getComponent(key) {
        this.components[key];
    }

    gameLoopEventHandler = event => this.gameLoop(event.detail);

    gameLoop() { }

    destroy() {
        Object.keys(this.components).forEach(key => {
            this.components[key].destroy();
            this.components[key] = null;
        });

        Object.keys(this).forEach(key => this[key] = null);

        window.removeEventListener('gameLoop', this.gameLoopEventHandler);
    }
}
