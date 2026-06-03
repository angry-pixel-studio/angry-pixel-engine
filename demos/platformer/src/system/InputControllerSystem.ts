import { GameSystem, GamepadController, Keyboard } from "angry-pixel";
import { InputController } from "@component/InputController";

export class InputControllerSystem extends GameSystem {
    private keyboard: Keyboard;
    private gamepad: GamepadController;

    public onCreate(): void {
        this.keyboard = this.inputManager.keyboard;
    }

    public onUpdate(): void {
        this.gamepad = this.inputManager.gamepads[0];
        this.entityManager.search(InputController).forEach(({ component: input }) => {
            this.updateKeyboard(input);
            if (this.gamepad) this.updateGamepad(input);
        });
    }

    private updateKeyboard(input: InputController): void {
        input.pause = this.keyboard.isPressed("KeyP");
        input.axes.x = this.keyboard.isPressedReturn("KeyA", -1, this.keyboard.isPressedReturn("KeyD", 1, 0));
        input.axes.y = this.keyboard.isPressedReturn("KeyW", 1, this.keyboard.isPressedReturn("KeyS", -1, 0));
        input.jump = this.keyboard.isPressed("Space");
    }

    private updateGamepad(input: InputController): void {
        input.pause = this.gamepad.start || input.pause;

        if (this.gamepad.dpadAxes.magnitude > 0) {
            input.axes.copy(this.gamepad.dpadAxes);
        } else if (this.gamepad.leftStickAxes.magnitude >= 0.5) {
            input.axes.set(Math.round(this.gamepad.leftStickAxes.x), Math.round(this.gamepad.leftStickAxes.y));
        }

        input.jump = this.gamepad.bottomFace || input.jump;
    }
}
