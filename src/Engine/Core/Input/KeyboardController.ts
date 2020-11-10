export class KeyboardController {
    private keyPresses: { [k: string]: boolean } = {};

    constructor() {
        window.addEventListener("keydown", this.eventHandler);
        window.addEventListener("keyup", this.eventHandler);
    }

    private eventHandler = (event: KeyboardEvent) => {
        if (event.type === "keydown") {
            this.keyPresses[event.key] = true;
        }

        if (event.type === "keyup") {
            this.keyPresses[event.key] = false;
        }
    };

    public isPressed(key: string): boolean {
        return this.keyPresses[key] !== undefined && this.keyPresses[key] !== false;
    }
}
