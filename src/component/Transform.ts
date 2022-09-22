import { TransformComponent } from "../core/Component";
import { Rotation } from "../math/Rotation";
import { Vector2 } from "../math/Vector2";

export class Transform extends TransformComponent {
    public readonly allowMultiple: boolean = false;

    public parentScale: boolean = true;
    public parentRotation: boolean = true;

    private _position: Vector2 = new Vector2();
    private _scale: Vector2 = new Vector2(1, 1);
    private _rotation: Rotation = new Rotation();
    private _innerPosition: Vector2 = new Vector2();
    private _parent: Transform | null = null;

    private cache: Vector2 = new Vector2();
    private lastParentRadians: number = 0;
    private lastPosition: Vector2 = new Vector2();
    private scaledInnerPosition: Vector2 = new Vector2();

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
            Vector2.subtract(this._innerPosition, this._position, this._parent.position);
        }
    }

    protected update(): void {
        // this.setParent();

        if (this._parent !== null) {
            this.setPositionFromParent();
        }

        this.lastPosition.copy(this._position);
    }

    private setParent(): void {
        if (this.gameObject.parent !== null && this._parent !== this.gameObject.parent.transform) {
            this._parent = this.gameObject.parent.transform;
            Vector2.subtract(this._innerPosition, this._position, this._parent.position);
        } else if (this.gameObject.parent === null) {
            this._parent = null;
        }
    }

    private setPositionFromParent(): void {
        if (this._innerPosition.magnitude > 0) {
            if (this._parent.rotation.radians !== 0 && this.lastParentRadians !== this._parent.rotation.radians) {
                this.translateInnerPosition();
                this.lastParentRadians = this._parent.rotation.radians;
            }

            if (this.parentScale) {
                this.updateScaledInnerPosition();
                Vector2.add(this._position, this._parent.position, this.scaledInnerPosition);
            } else {
                Vector2.add(this._position, this._parent.position, this._innerPosition);
            }
        } else {
            this._position.copy(this._parent.position);
        }

        this._rotation.radians = this.parentRotation
            ? this._parent.rotation.radians + this._rotation.radians
            : this._rotation.radians;

        this.parentScale ? this._scale.copy(this._parent.scale) : null;
    }

    private translateInnerPosition(): void {
        const translatedRadians =
            Math.atan2(this._innerPosition.y, this._innerPosition.x) +
            (this._parent.rotation.radians - this.lastParentRadians);
        this.cache.set(Math.cos(translatedRadians), Math.sin(translatedRadians));

        Vector2.scale(this._innerPosition, this.cache, this._innerPosition.magnitude);
    }

    private updateScaledInnerPosition(): void {
        this.scaledInnerPosition.set(
            this._innerPosition.x * this._parent.scale.x,
            this._innerPosition.y * this._parent.scale.y
        );
    }
}
