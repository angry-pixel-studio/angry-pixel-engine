import { EngineComponent } from "../Component";
import { Vector2 } from "../Math/Vector2";

export const TYPE_TRANSFORM: string = "Transform";

export class Transform extends EngineComponent {
    private _position: Vector2 = new Vector2(0, 0);
    private _innerPosition: Vector2 = new Vector2(0, 0);
    private _scale: Vector2 = new Vector2(1, 1);
    private _rotation: number = 0;

    private parentTransform: Transform = null;
    private v2: Vector2 = new Vector2();

    constructor() {
        super();

        this.allowMultiple = false;
        this.type = TYPE_TRANSFORM;
    }

    public get position(): Vector2 {
        return this._position;
    }

    public set position(position: Vector2) {
        if (this.parentTransform !== null) {
            Vector2.add(this._innerPosition, this._innerPosition, Vector2.subtract(this.v2, position, this._position));
        }
        this._position.set(position.x, position.y);
    }

    public get innerPosition(): Vector2 {
        return this._innerPosition;
    }

    public set innerPosition(innerPosition: Vector2) {
        if (innerPosition.equals(this._innerPosition) === false) {
            this._innerPosition.set(innerPosition.x, innerPosition.y);
            this.update();
        }
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
            this.setInnerPositionFromParent();
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
        if (this._innerPosition.magnitude > 0) {
            const parentRad: number = (this.parentTransform.rotation * Math.PI) / 180.0;
            const thisRad: number = Math.atan2(this._innerPosition.x, this._innerPosition.y);
            const radius: number = Math.hypot(this._innerPosition.x, this._innerPosition.y);

            this._position.set(
                this.parentTransform.position.x + radius * Math.sin(thisRad - parentRad),
                this.parentTransform.position.y + radius * Math.cos(thisRad - parentRad)
            );
        } else {
            this._position.set(this.parentTransform.position.x, this.parentTransform.position.y);
        }

        this._rotation = this.parentTransform.rotation;
    }

    public forceUpdate(): void {
        this.update();
    }

    private setInnerPositionFromParent(): void {
        this._innerPosition.set(
            this._position.x - this.parentTransform.position.x,
            this._position.y - this.parentTransform.position.y
        );
    }
}
