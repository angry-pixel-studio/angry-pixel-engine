export class KeyboardController {
    private canvas: HTMLCanvasElement;
    private keyPresses: Map<string, boolean> = new Map<string, boolean>();

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;

        this.canvas.addEventListener("keydown", this.eventHandler);
        this.canvas.addEventListener("keyup", this.eventHandler);
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

    public orPressed(keyCodes: string[]): boolean {
        return keyCodes.reduce<boolean>((result, keyCode) => result || (this.keyPresses.get(keyCode) ?? false), false);
    }

    public andPressed(keyCodes: string[]): boolean {
        return keyCodes.reduce<boolean>((result, keyCode) => result && (this.keyPresses.get(keyCode) ?? false), true);
    }

    public isPressedReturn<T>(keyCode: string, returnTrue: T, returnFalse: T): T {
        return this.keyPresses.get(keyCode) ? returnTrue : returnFalse;
    }

    public orPressedReturn<T>(keyCodes: string[], returnTrue: T, returnFalse: T): T {
        return keyCodes.reduce<boolean>((result, keyCode) => result || (this.keyPresses.get(keyCode) ?? false), false)
            ? returnTrue
            : returnFalse;
    }

    public andPressedReturn<T>(keyCodes: string[], returnTrue: T, returnFalse: T): T {
        return keyCodes.reduce<boolean>((result, keyCode) => result && (this.keyPresses.get(keyCode) ?? false), true)
            ? returnTrue
            : returnFalse;
    }
}
