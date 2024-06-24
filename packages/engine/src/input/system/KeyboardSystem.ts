import { Keyboard } from "../input/Keyboard";

export class KeyboardSystem {
    private pressedKeys: string[] = [];

    constructor(
        canvas: HTMLCanvasElement,
        private readonly keyboard: Keyboard,
    ) {
        canvas.addEventListener("keydown", this.eventHandler);
        canvas.addEventListener("keyup", this.eventHandler);
        canvas.addEventListener("focusout", () => (this.pressedKeys = []));
    }

    private eventHandler = (event: KeyboardEvent) => {
        if (event.type === "keydown" && !this.pressedKeys.includes(event.code)) {
            this.pressedKeys.push(event.code);
        }

        if (event.type === "keyup" && this.pressedKeys.includes(event.code)) {
            this.pressedKeys.splice(this.pressedKeys.indexOf(event.code), 1);
        }
    };

    public onUpdate(): void {
        this.keyboard.pressedKeys = [...this.pressedKeys];
    }
}
