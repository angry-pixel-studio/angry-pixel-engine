import { EngineComponent } from "../core/Component";
import { InitOptions } from "../core/GameActor";
import { MouseController, TouchController } from "@angry-pixel/input";
import { between, Vector2 } from "@angry-pixel/math";

/** @category Components */
export enum ButtonType {
    Rectangle,
    Circumference,
}

/**
 * Button configuration options
 * @public
 * @category Components
 * @example
 * ```js
 * cosnt button = this.addComponent(Button, {
    type: ButtonType.Rectangle,
    width: 64,
    height: 64,
    touchEnabled: true,
    offset: new Vector2(0, 0),
  });

  cosnt button = this.addComponent(Button, {
    type: ButtonType.Circumference,
    radius: 32,
    touchEnabled: true,
    offset: new Vector2(0, 0),
  });
 * ```
 */
export interface ButtonOptions extends InitOptions {
    /** The shape of the button */
    type: ButtonType;
    /** Width in pixels. Only for rectangle shaped buttons */
    width?: number;
    /** Height in pixels. Only for rectangle shaped buttons */
    height?: number;
    /** Radius in pixels. Only for circumference shaped buttons */
    radius?: number;
    /** Enables interaction with touch screens */
    touchEnabled?: boolean;
    /** X-axis and Y-axis offset */
    offset?: Vector2;
}

/**
 * The Button component is used to interact with the mouse and touch screens.
 * @public
 * @category Components
 * @example
 * ```js
 * cosnt button = this.addComponent(Button, {
    type: ButtonType.Rectangle,
    width: 64,
    height: 64,
    touchEnabled: true,
  });

  button.onClick = () => {
    // some action on click
  };

  button.onPressed = () => {
    // some action on pressed
  };
 * ```
 * @example
 * ```js
 * cosnt button = this.addComponent(Button, {
    type: ButtonType.Circumference,
    radius: 32,
    touchEnabled: true,
  });

  button.onClick = () => {
    // some action on click
  };

  button.onPressed = () => {
    // some action on pressed
  };
 * ```
 */
export class Button extends EngineComponent {
    /** @internal */
    public readonly allowMultiple: boolean = false;
    /** The shape of the button */
    public type: ButtonType;
    /** Width in pixels. Only for rectangle shaped buttons */
    public width: number = 100;
    /** Height in pixels. Only for rectangle shaped buttons */
    public height: number = 100;
    /** Radius in pixels. Only for circumference shaped buttons */
    public radius: number = 50;
    /** Enables interaction with touch screens */
    public touchEnabled: boolean = true;
    /** X-axis and Y-axis offset */
    public offset: Vector2 = new Vector2();
    /** TRUE if is pressed */
    public pressed: boolean = false;
    /** Function executed when the button's click */
    public onClick: () => void;
    /** Function executed when the button is pressed */
    public onPressed: () => void;

    private mouse: MouseController = this.inputManager.mouse;
    private touch: TouchController = this.inputManager.touch;
    private position: Vector2 = new Vector2();
    private distance: Vector2 = new Vector2();
    private pressedLastFrame: boolean = false;
    private scaled: { width: number; height: number; radius: number; offset: Vector2 } = {
        width: 0,
        height: 0,
        radius: 0,
        offset: new Vector2(),
    };

    protected init({ type, height, radius, touchEnabled, width, offset }: ButtonOptions): void {
        this.type = type;
        this.width = width ?? this.width;
        this.height = height ?? this.height;
        this.radius = radius ?? this.radius;
        this.touchEnabled = touchEnabled ?? this.touchEnabled;
        this.offset = offset ?? this.offset;
    }

    protected update(): void {
        this.scale();

        Vector2.add(this.position, this.gameObject.transform.position, this.scaled.offset);
        this.pressedLastFrame = this.pressed;
        this.pressed = false;

        if (this.mouse.leftButtonPressed) {
            this.resolveMouseAndRectangle();
            this.resolveMouseAndCircumference();
        }

        if (this.touchEnabled && this.touch.touching) {
            this.resolveTouchAndRectangle();
            this.resolveTouchAndCircumference();
        }

        if (this.onClick && !this.pressedLastFrame && this.pressed) {
            this.onClick();
        }

        if (this.onPressed && this.pressed) {
            this.onPressed();
        }
    }

    private scale(): void {
        this.scaled.width = this.width * this.gameObject.transform.scale.x;
        this.scaled.height = this.width * this.gameObject.transform.scale.y;
        this.scaled.offset.x = this.offset.x * this.gameObject.transform.scale.x;
        this.scaled.offset.y = this.offset.y * this.gameObject.transform.scale.y;
        this.scaled.radius =
            this.radius *
            Math.max(Math.abs(this.gameObject.transform.scale.x), Math.abs(this.gameObject.transform.scale.y));
    }

    protected resolveMouseAndRectangle(): void {
        if (this.type === ButtonType.Rectangle) {
            this.pressed =
                between(
                    this.mouse.positionInViewport.x,
                    this.position.x - this.scaled.width / 2,
                    this.position.x + this.scaled.width / 2,
                ) &&
                between(
                    this.mouse.positionInViewport.y,
                    this.position.y - this.scaled.height / 2,
                    this.position.y + this.scaled.height / 2,
                );
        }
    }

    protected resolveMouseAndCircumference(): void {
        if (this.type === ButtonType.Circumference) {
            Vector2.subtract(this.distance, this.position, this.mouse.positionInViewport);
            this.pressed = this.distance.magnitude <= this.scaled.radius;
        }
    }

    protected resolveTouchAndRectangle(): void {
        if (this.type === ButtonType.Rectangle) {
            for (const { positionInViewport, radius } of this.touch.interactions) {
                if (this.pressed) return;

                this.pressed =
                    this.position.x + this.scaled.width / 2 >= positionInViewport.x - radius.x &&
                    this.position.x - this.scaled.width / 2 <= positionInViewport.x + radius.x &&
                    this.position.y + this.scaled.height / 2 >= positionInViewport.y - radius.y &&
                    this.position.y - this.scaled.height / 2 <= positionInViewport.y + radius.y;
            }
        }
    }

    protected resolveTouchAndCircumference(): void {
        if (this.type === ButtonType.Circumference) {
            for (const { positionInViewport, radius } of this.touch.interactions) {
                if (this.pressed) return;

                Vector2.subtract(this.distance, this.position, positionInViewport);
                this.pressed = this.distance.magnitude <= this.scaled.radius + Math.max(radius.x, radius.y);
            }
        }
    }
}
