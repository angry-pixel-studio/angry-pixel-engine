import Transform from "./Components/Transform";

export default class GameObject {
    components = [];
    transform = null;
    scene = null;

    constructor() {
        this.addComponent(() => new Transform(this, { position: { x: 0, y: 0 } }));
        this.transform = this.getComponent(Transform.name);

        window.addEventListener('gameLoop', this.gameLoopEventHandler);
    }

    addComponent(component) {
        if (typeof component === 'function') {
            component = component();
        }

        this.components = [...this.components, component];

        return this;
    }

    getComponent(type) {
        let components = this.getComponents(type);
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

    gameLoopEventHandler = event => this.gameLoop(event.detail);

    gameLoop() { }

    destroy() {
        this.components.forEach((component, key) => {
            component.destroy();
            this.components[key] = null;
        });

        Object.keys(this).forEach(key => this[key] = null);

        window.removeEventListener('gameLoop', this.gameLoopEventHandler);
    }
}
