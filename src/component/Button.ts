import { Component } from "../core/Component";
import { InitOptions } from "../core/GameActor";
import { InputManager } from "../input/InputManager";
import { MouseController } from "../input/MouseController";
import { TouchController } from "../input/TouchController";
import { between, Vector2 } from "angry-pixel-math";

export enum ButtonType {
    Rectangle,
    Circumference,
}

export interface ButtonOptions extends InitOptions {
    type: ButtonType;
    width?: number;
    height?: number;
    radius?: number;
    touchEnabled?: boolean;
    offset?: Vector2;
}

export class Button extends Component {
    public readonly allowMultiple: boolean = false;

    public type: ButtonType;
    public width: number = 100;
    public height: number = 100;
    public radius: number = 50;
    public touchEnabled: boolean = true;
    private _offset: Vector2 = new Vector2();

    public pressed: boolean = false;

    private mouse: MouseController = this.container.getSingleton<InputManager>("InputManager").mouse;
    private touch: TouchController = this.container.getSingleton<InputManager>("InputManager").touch;
    private position: Vector2 = new Vector2();
    private distance: Vector2 = new Vector2();
    private pressedLastFrame: boolean = false;

    private scaled: { width: number; height: number; radius: number; offset: Vector2 } = {
        width: 0,
        height: 0,
        radius: 0,
        offset: new Vector2(),
    };

    public onClick: () => void;
    public onPressed: () => void;

    public get offset(): Vector2 {
        return this._offset;
    }

    public set offset(offset: Vector2) {
        this._offset = offset;
    }

    protected init({ type, height, radius, touchEnabled, width, offset }: ButtonOptions): void {
        this.type = type;
        this.width = width ?? this.width;
        this.height = height ?? this.height;
        this.radius = radius ?? this.radius;
        this.touchEnabled = touchEnabled ?? this.touchEnabled;
        this._offset = offset ?? this._offset;
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
        this.scaled.offset.x = this._offset.x * this.gameObject.transform.scale.x;
        this.scaled.offset.y = this._offset.y * this.gameObject.transform.scale.y;
        this.scaled.radius =
            this.radius *
            Math.max(Math.abs(this.gameObject.transform.scale.x), Math.abs(this.gameObject.transform.scale.y));
    }

    protected resolveMouseAndRectangle(): void {
        if (this.type === ButtonType.Rectangle) {
            this.pressed ||=
                between(
                    this.mouse.positionInViewport.x,
                    this.position.x - this.scaled.width / 2,
                    this.position.x + this.scaled.width / 2
                ) &&
                between(
                    this.mouse.positionInViewport.y,
                    this.position.y - this.scaled.height / 2,
                    this.position.y + this.scaled.height / 2
                );
        }
    }

    protected resolveMouseAndCircumference(): void {
        if (this.type === ButtonType.Circumference) {
            Vector2.subtract(this.distance, this.position, this.mouse.positionInViewport);
            this.pressed ||= this.distance.magnitude <= this.scaled.radius;
        }
    }

    protected resolveTouchAndRectangle(): void {
        if (this.type === ButtonType.Rectangle) {
            this.pressed ||=
                this.position.x + this.scaled.width / 2 >= this.touch.positionInViewport.x - this.touch.radius.x &&
                this.position.x - this.scaled.width / 2 <= this.touch.positionInViewport.x + this.touch.radius.x &&
                this.position.y + this.scaled.height / 2 >= this.touch.positionInViewport.y - this.touch.radius.y &&
                this.position.y - this.scaled.height / 2 <= this.touch.positionInViewport.y + this.touch.radius.y;
        }
    }

    protected resolveTouchAndCircumference(): void {
        if (this.type === ButtonType.Circumference) {
            Vector2.subtract(this.distance, this.position, this.touch.positionInViewport);
            this.pressed ||= this.distance.magnitude <= this.scaled.radius + this.touch.radius.x;
        }
    }
}
