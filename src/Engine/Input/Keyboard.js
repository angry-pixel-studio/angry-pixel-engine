export default class Keyboard {
    keyPresses = {};

    constructor(game) {
        window.addEventListener('keydown', e => this.keyPresses[e.key] = true);
        window.addEventListener('keyup', e => this.keyPresses[e.key] = false);
    }

    isPressed = key => this.keyPresses[key] !== undefined && this.keyPresses[key] !== false;
}