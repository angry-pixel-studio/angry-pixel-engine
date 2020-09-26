export default class Keyboard {
    private keyPresses: { [k: string]: any } = {};

    constructor() {
        window.addEventListener(
            "keydown",
            (e: KeyboardEvent) => (this.keyPresses[e.key] = true)
        );
        window.addEventListener(
            "keyup",
            (e: KeyboardEvent) => (this.keyPresses[e.key] = false)
        );
    }

    public isPressed(key: string): boolean {
        return (
            this.keyPresses[key] !== undefined && this.keyPresses[key] !== false
        );
    }
}
