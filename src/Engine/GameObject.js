import Transform from "./Components/Transform";
import { EVENT_START, EVENT_UPDATE } from "./Game";

export default class GameObject {
    tag = null;
    components = [];
    transform = null;
    scene = null;

    constructor() {
        this.addComponent(() => new Transform(this, { position: { x: 0, y: 0 } }));
        this.transform = this.getComponent(Transform.name);

        window.addEventListener(EVENT_START, this.gameLoopEventHandler);
        window.addEventListener(EVENT_UPDATE, this.gameLoopEventHandler);
    }

    gameLoopEventHandler = event => {
        if (event.type === EVENT_START) {
            this.start(event.detail);
        } else if (event.type === EVENT_UPDATE) {
            this.update(event.detail);
        }
    }

    start() { }

    update() { }

    addComponent(component) {
        if (typeof component === 'function') {
            component = component();
        }

        this.components = [...this.components, component];

        return this;
    }

    getComponent(type) {
        const components = this.getComponents(type);
        return components.length > 0 ? components[0] : null;
    }

    getComponents(type) {
        if (type !== undefined) {
            return this.components.filter(component => component.constructor.name === type);
        }

        return this.components;
    }

    hasComponent(type) {
        return this.getComponent(type) !== null;
    }

    destroy() {
        this.components.forEach((component, key) => {
            component.destroy();
            this.components[key] = null;
        });

        Object.keys(this).forEach(key => this[key] = null);

        window.removeEventListener('gameLoop', this.gameLoopEventHandler);
    }
}
