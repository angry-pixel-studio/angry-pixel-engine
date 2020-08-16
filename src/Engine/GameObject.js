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

        window.addEventListener('gameLoop', (e) => {
            this.gameLoop(e.detail);
        });
    }

    addComponent = (key, component) => this.components[key] = component;

    getComponent = key => this.components[key];

    gameLoop = event => { };
}
