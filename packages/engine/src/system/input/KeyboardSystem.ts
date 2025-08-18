import { SYMBOLS } from "@config/dependencySymbols";
import { SYSTEM_SYMBOLS } from "@config/systemSymbols";
import { System } from "@angry-pixel/ecs";
import { Keyboard } from "@input";
import { inject, injectable } from "@angry-pixel/ioc";
import { InputManager } from "@manager/InputManager";

@injectable(SYSTEM_SYMBOLS.KeyboardSystem)
export class KeyboardSystem implements System {
    private readonly keyboard: Keyboard;
    private pressedKeys: string[] = [];

    constructor(
        @inject(SYMBOLS.CanvasElement) canvas: HTMLCanvasElement,
        @inject(SYMBOLS.InputManager) { keyboard }: InputManager,
    ) {
        this.keyboard = keyboard;
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
