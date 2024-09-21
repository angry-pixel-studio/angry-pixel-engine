import { IInputManager, Mouse, TouchScreen } from "../../../input";
import { Vector2, between } from "../../../math";
import { Button, ButtonShape } from "../../component/Button";
import { Transform } from "../../component/Transform";
import { System } from "../../../ecs/SystemManager";
import { EntityManager } from "../../../ecs/EntityManager";
import { TYPES } from "../../config/types";
import { inject } from "../../../ioc/container";

type ScaledButton = { width: number; height: number; radius: number; position: Vector2 };

export class ButtonSystem implements System {
    private readonly mouse: Mouse;
    private readonly touchScreen: TouchScreen;

    // cache
    private scaled: ScaledButton = { position: new Vector2(), width: 0, height: 0, radius: 0 };
    private distance: Vector2 = new Vector2();
    private pressedLastFrame: boolean = false;

    constructor(
        @inject(TYPES.EntityManager) private readonly entityManager: EntityManager,
        @inject(TYPES.InputManager) inputManager: IInputManager,
    ) {
        this.mouse = inputManager.mouse;
        this.touchScreen = inputManager.touchScreen;
    }

    public onUpdate(): void {
        this.entityManager.search(Button).forEach(({ entity, component: button }) => {
            const transform = this.entityManager.getComponent(entity, Transform);
            if (!transform) throw new Error("Button component needs a Transform");

            this.pressedLastFrame = button.pressed;
            button.pressed = false;

            this.scale(button, transform);

            if (this.mouse.leftButtonPressed) {
                this.resolveMouseAndRectangle(button);
                this.resolveMouseAndCircumference(button);
            }

            if (button.touchEnabled && this.touchScreen.touching) {
                this.resolveTouchAndRectangle(button);
                this.resolveTouchAndCircumference(button);
            }

            if (button.onClick && !this.pressedLastFrame && button.pressed) {
                button.onClick();
            }

            if (button.onPressed && button.pressed) {
                button.onPressed();
            }
        });
    }

    private scale(button: Button, { localPosition, localScale }: Transform): void {
        this.scaled.width = button.width * localScale.x;
        this.scaled.height = button.width * localScale.y;
        this.scaled.position.x = localPosition.x + button.offset.x * localScale.x;
        this.scaled.position.y = localPosition.y + button.offset.y * localScale.y;
        this.scaled.radius = button.radius * Math.max(Math.abs(localScale.x), Math.abs(localScale.y));
    }

    protected resolveMouseAndRectangle(button: Button): void {
        if (button.shape === ButtonShape.Rectangle) {
            button.pressed =
                between(
                    this.mouse.positionInViewport.x,
                    this.scaled.position.x - this.scaled.width / 2,
                    this.scaled.position.x + this.scaled.width / 2,
                ) &&
                between(
                    this.mouse.positionInViewport.y,
                    this.scaled.position.y - this.scaled.height / 2,
                    this.scaled.position.y + this.scaled.height / 2,
                );
        }
    }

    protected resolveMouseAndCircumference(button: Button): void {
        if (button.shape === ButtonShape.Circumference) {
            Vector2.subtract(this.distance, this.scaled.position, this.mouse.positionInViewport);
            button.pressed = this.distance.magnitude <= this.scaled.radius;
        }
    }

    protected resolveTouchAndRectangle(button: Button): void {
        if (button.shape === ButtonShape.Rectangle) {
            for (const { positionInViewport, radius } of this.touchScreen.interactions) {
                if (button.pressed) return;

                button.pressed =
                    this.scaled.position.x + this.scaled.width / 2 >= positionInViewport.x - radius.x &&
                    this.scaled.position.x - this.scaled.width / 2 <= positionInViewport.x + radius.x &&
                    this.scaled.position.y + this.scaled.height / 2 >= positionInViewport.y - radius.y &&
                    this.scaled.position.y - this.scaled.height / 2 <= positionInViewport.y + radius.y;
            }
        }
    }

    protected resolveTouchAndCircumference(button: Button): void {
        if (button.shape === ButtonShape.Circumference) {
            for (const { positionInViewport, radius } of this.touchScreen.interactions) {
                if (button.pressed) return;

                Vector2.subtract(this.distance, this.scaled.position, positionInViewport);
                button.pressed = this.distance.magnitude <= this.scaled.radius + Math.max(radius.x, radius.y);
            }
        }
    }
}
