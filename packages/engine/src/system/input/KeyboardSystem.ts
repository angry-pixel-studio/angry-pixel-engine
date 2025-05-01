import { DEPENDENCY_TYPES } from "@config/dependencyTypes";
import { SYSTEM_TYPES } from "@config/systemTypes";
import { System } from "@ecs";
import { Keyboard } from "@input";
import { inject, injectable } from "@ioc";
import { InputManager } from "@manager/InputManager";

@injectable(SYSTEM_TYPES.KeyboardSystem)
export class KeyboardSystem implements System {
    private readonly keyboard: Keyboard;
    private pressedKeys: string[] = [];

    constructor(
        @inject(DEPENDENCY_TYPES.CanvasElement) canvas: HTMLCanvasElement,
        @inject(DEPENDENCY_TYPES.InputManager) { keyboard }: InputManager,
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
