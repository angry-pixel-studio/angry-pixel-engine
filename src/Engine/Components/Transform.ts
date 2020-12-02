import { Component } from "../Component";
import { Vector2 } from "../Math/Vector2";

export const TYPE_TRANSFORM: string = "Transform";

export class Transform extends Component {
    private _position: Vector2 = new Vector2(0, 0);
    private _innerPosition: Vector2 = new Vector2(0, 0);
    private _scale: Vector2 = new Vector2(1, 1);
    private _rotation: number = 0;

    private parentTransform: Transform = null;

    constructor() {
        super();

        this.allowMultiple = false;
        this.type = TYPE_TRANSFORM;
    }

    public get position(): Vector2 {
        return this._position;
    }

    public set position(position: Vector2) {
        this._position.set(position.x, position.y);
    }

    public get innerPosition(): Vector2 {
        return this._innerPosition;
    }

    public set innerPosition(innerPosition: Vector2) {
        this._innerPosition.set(innerPosition.x, innerPosition.y);
    }

    public get scale(): Vector2 {
        return this._scale;
    }

    public set scale(scale: Vector2) {
        this._scale.set(scale.x, scale.y);
    }

    public get rotation(): number {
        return this._rotation;
    }

    public set rotation(rotation: number) {
        this._rotation = rotation;
    }

    protected update(): void {
        if (this.parentTransform === null && this.gameObject.parent !== null) {
            this.parentTransform = this.gameObject.parent.transform;
        }

        if (this.parentTransform !== null && this.gameObject.parent === null) {
            this.parentTransform = null;
        }

        if (this.parentTransform !== null) {
            this.translateFromParent();
        } else {
            this._innerPosition.set(this._position.x, this._position.y);
        }
    }

    private translateFromParent(): void {
        const parentRad: number = (this.parentTransform._rotation * Math.PI) / 180.0;
        const thisRad: number = Math.atan2(this._innerPosition.x, this._innerPosition.y);
        const radius: number = Math.hypot(this._innerPosition.x, this._innerPosition.y);

        this._position.set(
            this.parentTransform._position.x + radius * Math.sin(thisRad - parentRad),
            this.parentTransform._position.y + radius * Math.cos(thisRad - parentRad)
        );
        this._rotation = this.parentTransform._rotation;
    }

    public forceUpdate(): void {
        this.update();
    }
}
