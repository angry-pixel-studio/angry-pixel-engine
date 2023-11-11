import { TransformComponent } from "../core/Component";
import { Rotation, Vector2 } from "angry-pixel-math";

/**
 * All GameObject have a Transform natively, so it cannot be added manually.
 * It is used to handle the position, rotation and scale of the object. If the object has a parent,
 * it can be scaled, rotated and translated hierarchically.
 * @public
 * @category Components
 * @example
 * ```js
 * this.transform.position = new Vector2(0, 0);
 * this.transform.position.set(0, 0);
 *
 * this.transform.scale = new Vector2(0, 0);
 * this.transform.scale.set(0, 0);
 *
 * this.transform.rotation.radians = 0;
 * this.transform.rotation.degrees = 0;
 *
 * // used to set position relative to the parent
 * this.transform.innerPosition = new Vector2(0, 0);
 * this.transform.innerPosition.set(0, 0);
 * ```
 */
export class Transform extends TransformComponent {
    /** @private */
    public readonly allowMultiple: boolean = false;

    /** Apply scale relative to the parent. Default value is TRUE */
    public parentScale: boolean = true;
    /** Apply rotation relative to the parent. Default value is TRUE */
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

    /** Position on x-axis and y-axis in pixels */
    public get position(): Vector2 {
        return this._position;
    }

    /** Position on x-axis and y-axis in pixels */
    public set position(position: Vector2) {
        this._position.copy(position);
    }

    /** Scale on x-axis and y-axis in pixels */
    public get scale(): Vector2 {
        return this._scale;
    }

    /** Scale on x-axis and y-axis in pixels */
    public set scale(scale: Vector2) {
        this._scale.copy(scale);
    }

    /** Rotation expressed in radians or degrees  */
    public get rotation(): Rotation {
        return this._rotation;
    }

    /** Direction vector based on the Rotation */
    public get direction(): Vector2 {
        return this._rotation.direction;
    }

    /** Position vector relative to the parent */
    public get innerPosition(): Vector2 {
        return this._innerPosition;
    }

    /** Position vector relative to the parent */
    public set innerPosition(innerPosition: Vector2) {
        this._innerPosition.copy(innerPosition);
    }

    /** Parent transform */
    public get parent(): Transform | null {
        return this._parent;
    }

    /** Parent transform */
    public set parent(parent: Transform | null) {
        this._parent = parent;

        if (this._parent !== null) {
            Vector2.subtract(this._innerPosition, this._position, this._parent.position);
        }
    }

    protected update(): void {
        if (this._parent !== null) {
            this.setPositionFromParent();
        }

        this.lastPosition.copy(this._position);
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

        if (this.parentScale) this._scale.copy(this.parent._scale);
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
