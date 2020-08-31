export default class Keyboard {
    keyPresses = {};

    constructor() {
        window.addEventListener('keydown', e => this.keyPresses[e.key] = true);
        window.addEventListener('keyup', e => this.keyPresses[e.key] = false);
    }

    isPressed(key) {
        return this.keyPresses[key] !== undefined && this.keyPresses[key] !== false;
    }
}