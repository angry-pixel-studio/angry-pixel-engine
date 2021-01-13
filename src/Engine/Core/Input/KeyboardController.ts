export class KeyboardController {
    private keyPresses: Map<string, boolean> = new Map<string, boolean>();

    constructor() {
        window.addEventListener("keydown", this.eventHandler);
        window.addEventListener("keyup", this.eventHandler);
    }

    private eventHandler = (event: KeyboardEvent) => {
        if (event.type === "keydown") {
            this.keyPresses.set(event.code, true);
        }

        if (event.type === "keyup") {
            this.keyPresses.set(event.code, false);
        }
    };

    public isPressed(keyCode: string): boolean {
        return this.keyPresses.get(keyCode) ?? false;
    }
}
