import { GamepadController } from "../input/GamepadController";

export class GamepadSystem {
    private readonly gamepads: Map<number, Gamepad> = new Map();

    constructor(private readonly gamepadControllers: GamepadController[]) {
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

        if (!this.gamepadControllers[gamepad.index]) {
            this.gamepadControllers[gamepad.index] = new GamepadController();
            this.gamepadControllers[gamepad.index].index = gamepad.index;
        }

        this.gamepadControllers[gamepad.index].id = gamepad.id;
        this.gamepadControllers[gamepad.index].connected = true;
    }

    private gamepadDisconected(gamepad: Gamepad): void {
        this.gamepads.delete(gamepad.index);
        this.gamepadControllers[gamepad.index].connected = false;
    }

    public update(): void {
        for (const gamepad of this.getGamepadsFromBrowser()) {
            if (!gamepad) continue;

            if (this.gamepads.has(gamepad.index) === false) this.gamepadConnected(gamepad);
            else this.gamepads.set(gamepad.index, gamepad);
        }

        this.gamepads.forEach((gamepad) => {
            const gpc = this.gamepadControllers[gamepad.index];

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
