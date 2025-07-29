import { EngineComponent } from "../core/Component";
import { between, Vector2 } from "@angry-pixel/math";
/** @category Components */
export var ButtonType;
(function (ButtonType) {
    ButtonType[ButtonType["Rectangle"] = 0] = "Rectangle";
    ButtonType[ButtonType["Circumference"] = 1] = "Circumference";
})(ButtonType || (ButtonType = {}));
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
    constructor() {
        super(...arguments);
        /** @internal */
        this.allowMultiple = false;
        /** Width in pixels. Only for rectangle shaped buttons */
        this.width = 100;
        /** Height in pixels. Only for rectangle shaped buttons */
        this.height = 100;
        /** Radius in pixels. Only for circumference shaped buttons */
        this.radius = 50;
        /** Enables interaction with touch screens */
        this.touchEnabled = true;
        /** X-axis and Y-axis offset */
        this.offset = new Vector2();
        /** TRUE if is pressed */
        this.pressed = false;
        this.mouse = this.inputManager.mouse;
        this.touch = this.inputManager.touch;
        this.position = new Vector2();
        this.distance = new Vector2();
        this.pressedLastFrame = false;
        this.scaled = {
            width: 0,
            height: 0,
            radius: 0,
            offset: new Vector2(),
        };
    }
    init({ type, height, radius, touchEnabled, width, offset }) {
        this.type = type;
        this.width = width !== null && width !== void 0 ? width : this.width;
        this.height = height !== null && height !== void 0 ? height : this.height;
        this.radius = radius !== null && radius !== void 0 ? radius : this.radius;
        this.touchEnabled = touchEnabled !== null && touchEnabled !== void 0 ? touchEnabled : this.touchEnabled;
        this.offset = offset !== null && offset !== void 0 ? offset : this.offset;
    }
    update() {
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
    scale() {
        this.scaled.width = this.width * this.gameObject.transform.scale.x;
        this.scaled.height = this.width * this.gameObject.transform.scale.y;
        this.scaled.offset.x = this.offset.x * this.gameObject.transform.scale.x;
        this.scaled.offset.y = this.offset.y * this.gameObject.transform.scale.y;
        this.scaled.radius =
            this.radius *
                Math.max(Math.abs(this.gameObject.transform.scale.x), Math.abs(this.gameObject.transform.scale.y));
    }
    resolveMouseAndRectangle() {
        if (this.type === ButtonType.Rectangle) {
            this.pressed =
                between(this.mouse.positionInViewport.x, this.position.x - this.scaled.width / 2, this.position.x + this.scaled.width / 2) &&
                    between(this.mouse.positionInViewport.y, this.position.y - this.scaled.height / 2, this.position.y + this.scaled.height / 2);
        }
    }
    resolveMouseAndCircumference() {
        if (this.type === ButtonType.Circumference) {
            Vector2.subtract(this.distance, this.position, this.mouse.positionInViewport);
            this.pressed = this.distance.magnitude <= this.scaled.radius;
        }
    }
    resolveTouchAndRectangle() {
        if (this.type === ButtonType.Rectangle) {
            for (const { positionInViewport, radius } of this.touch.interactions) {
                if (this.pressed)
                    return;
                this.pressed =
                    this.position.x + this.scaled.width / 2 >= positionInViewport.x - radius.x &&
                        this.position.x - this.scaled.width / 2 <= positionInViewport.x + radius.x &&
                        this.position.y + this.scaled.height / 2 >= positionInViewport.y - radius.y &&
                        this.position.y - this.scaled.height / 2 <= positionInViewport.y + radius.y;
            }
        }
    }
    resolveTouchAndCircumference() {
        if (this.type === ButtonType.Circumference) {
            for (const { positionInViewport, radius } of this.touch.interactions) {
                if (this.pressed)
                    return;
                Vector2.subtract(this.distance, this.position, positionInViewport);
                this.pressed = this.distance.magnitude <= this.scaled.radius + Math.max(radius.x, radius.y);
            }
        }
    }
}
//# sourceMappingURL=Button.js.map