export class KeyboardController {
    public pressedKeys: string[] = [];

    private keyMap: Map<string, boolean> = new Map<string, boolean>();

    constructor(canvas: HTMLCanvasElement) {
        canvas.addEventListener("keydown", this.eventHandler);
        canvas.addEventListener("keyup", this.eventHandler);
    }

    private eventHandler = (event: KeyboardEvent) => {
        if (event.type === "keydown") {
            this.keyMap.set(event.code, true);
            if (!this.pressedKeys.includes(event.code)) this.pressedKeys.push(event.code);
        }

        if (event.type === "keyup") {
            this.keyMap.set(event.code, false);

            const index = this.pressedKeys.indexOf(event.code);
            if (index !== -1) this.pressedKeys.splice(index, 1);
        }
    };

    public isPressed(keyCode: string): boolean {
        return this.keyMap.get(keyCode) ?? false;
    }

    public orPressed(keyCodes: string[]): boolean {
        return keyCodes.reduce<boolean>((result, keyCode) => result || (this.keyMap.get(keyCode) ?? false), false);
    }

    public andPressed(keyCodes: string[]): boolean {
        return keyCodes.reduce<boolean>((result, keyCode) => result && (this.keyMap.get(keyCode) ?? false), true);
    }

    public isPressedReturn<T>(keyCode: string, returnTrue: T, returnFalse: T): T {
        return this.keyMap.get(keyCode) ? returnTrue : returnFalse;
    }

    public orPressedReturn<T>(keyCodes: string[], returnTrue: T, returnFalse: T): T {
        return keyCodes.reduce<boolean>((result, keyCode) => result || (this.keyMap.get(keyCode) ?? false), false)
            ? returnTrue
            : returnFalse;
    }

    public andPressedReturn<T>(keyCodes: string[], returnTrue: T, returnFalse: T): T {
        return keyCodes.reduce<boolean>((result, keyCode) => result && (this.keyMap.get(keyCode) ?? false), true)
            ? returnTrue
            : returnFalse;
    }
}
