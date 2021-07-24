import { TransformComponent } from "../Component";
import { Rotation } from "../Math/Rotation";
import { Vector2 } from "../Math/Vector2";

export const TYPE_TRANSFORM: string = "Transform";

export class Transform extends TransformComponent {
    private _position: Vector2 = new Vector2();
    private _scale: Vector2 = new Vector2(1, 1);
    private _rotation: Rotation = new Rotation();
    private _innerPosition: Vector2 = new Vector2();
    private _parent: Transform | null = null;

    public parentScale: boolean = true;
    public parentRotation: boolean = true;

    private cache: Vector2 = new Vector2();
    private lastParentRadians: number = 0;
    private lastPosition: Vector2 = new Vector2();

    constructor() {
        super();

        this.allowMultiple = false;
        this.type = TYPE_TRANSFORM;
    }

    public get position(): Vector2 {
        return this._position;
    }

    public set position(position: Vector2) {
        this._position.copy(position);
    }

    public get scale(): Vector2 {
        return this._scale;
    }

    public set scale(scale: Vector2) {
        this._scale.copy(scale);
    }

    public get rotation(): Rotation {
        return this._rotation;
    }

    public get direction(): Vector2 {
        return this._rotation.direction;
    }

    public get innerPosition(): Vector2 {
        return this._innerPosition;
    }

    public set innerPosition(innerPosition: Vector2) {
        this._innerPosition.copy(innerPosition);
    }

    public get parent(): Transform | null {
        return this._parent;
    }

    public set parent(parent: Transform | null) {
        this._parent = parent;
        if (this._parent !== null) {
            this.updateInnerPositionFromParent();
        }
    }

    protected update(): void {
        if (this._parent !== null) {
            if (this.lastPosition.equals(this._position) === false) {
                this.updateInnerPositionFromParent();
            }
            this.setPositionFromParent();
        } else {
            this._innerPosition.copy(this._position);
        }

        this.lastPosition.copy(this._position);
    }

    private updateInnerPositionFromParent(): void {
        Vector2.subtract(this._innerPosition, this._position, this._parent.position);
    }

    private setPositionFromParent(): void {
        if (this._innerPosition.magnitude > 0) {
            if (this._parent.rotation.radians !== 0 && this.lastParentRadians !== this._parent.rotation.radians) {
                this.translateInnerPosition();
                this.lastParentRadians = this._parent.rotation.radians;
            }

            Vector2.add(this._position, this._parent.position, this._innerPosition);
        } else {
            this._position.copy(this._parent.position);
        }

        this._rotation.radians = this.parentRotation ? this._parent.rotation.radians : this.rotation.radians;
        this.parentScale ? this._scale.copy(this._parent.scale) : null;
    }

    private translateInnerPosition(): void {
        const translatedRadians =
            Math.atan2(this._innerPosition.y, this._innerPosition.x) +
            (this._parent.rotation.radians - this.lastParentRadians);
        this.cache.set(Math.cos(translatedRadians), Math.sin(translatedRadians));

        Vector2.scale(this._innerPosition, this.cache, this._innerPosition.magnitude);
    }
}
