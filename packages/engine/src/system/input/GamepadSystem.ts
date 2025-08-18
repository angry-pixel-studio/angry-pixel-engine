import { SYMBOLS } from "@config/dependencySymbols";
import { SYSTEM_SYMBOLS } from "@config/systemSymbols";
import { System } from "@angry-pixel/ecs";
import { GamepadController } from "@input";
import { inject, injectable } from "@angry-pixel/ioc";
import { InputManager } from "@manager/InputManager";

@injectable(SYSTEM_SYMBOLS.GamepadSystem)
export class GamepadSystem implements System {
    private readonly gamepads: Map<number, Gamepad> = new Map();

    constructor(@inject(SYMBOLS.InputManager) private readonly inputManager: InputManager) {
        window.addEventListener("gamepadconnected", this.eventHandler);
        window.addEventListener("gamepaddisconnected", this.eventHandler);
    }

    private eventHandler = (e: GamepadEvent) => {
        if (e.type === "gamepadconnected") {
            this.gamepadConnected(e.gamepad);
        } else if (e.type === "gamepaddisconnected") {
            this.gamepadDisconected(e.gamepad);
        }
    };

    private gamepadConnected(gamepad: Gamepad): void {
        this.gamepads.set(gamepad.index, gamepad);

        if (!this.inputManager.gamepads[gamepad.index]) {
            this.inputManager.gamepads[gamepad.index] = new GamepadController();
            this.inputManager.gamepads[gamepad.index].index = gamepad.index;
        }

        this.inputManager.gamepads[gamepad.index].id = gamepad.id;
        this.inputManager.gamepads[gamepad.index].connected = true;
    }

    private gamepadDisconected(gamepad: Gamepad): void {
        this.gamepads.delete(gamepad.index);
        this.inputManager.gamepads[gamepad.index].connected = false;
    }

    public onUpdate(): void {
        for (const gamepad of this.getGamepadsFromBrowser()) {
            if (!gamepad) continue;

            if (this.gamepads.has(gamepad.index) === false) this.gamepadConnected(gamepad);
            else this.gamepads.set(gamepad.index, gamepad);
        }

        this.gamepads.forEach((gamepad) => {
            const gpc = this.inputManager.gamepads[gamepad.index];

            gamepad.buttons.forEach((button: GamepadButton, index: number) => gpc.buttons.set(index, button.pressed));
            gamepad.axes.forEach((axis: number, index: number) => gpc.axes.set(index, axis));

            if (gpc.vibrationInput) {
                gamepad.vibrationActuator
                    // @ts-ignore
                    .playEffect(gamepad.vibrationActuator.type, {
                        duration: gpc.vibrationInput.duration,
                        weakMagnitude: gpc.vibrationInput.weakMagnitude,
                        strongMagnitude: gpc.vibrationInput.strongMagnitude,
                        startDelay: gpc.vibrationInput.startDelay,
                    })
                    .catch(() => (gpc.vibrating = false))
                    .finally(() => (gpc.vibrating = false));

                gpc.vibrating = true;
                gpc.vibrationInput = undefined;
            }
        });
    }

    private getGamepadsFromBrowser(): Gamepad[] {
        return navigator.getGamepads
            ? navigator.getGamepads()
            : // @ts-ignore
              navigator.webkitGetGamepads
              ? // @ts-ignore
                navigator.webkitGetGamepads
              : [];
    }
}
