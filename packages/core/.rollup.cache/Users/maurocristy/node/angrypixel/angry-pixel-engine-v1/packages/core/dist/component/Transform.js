import { TransformComponent } from "../core/Component";
import { Rotation, Vector2 } from "@angry-pixel/math";
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
    constructor() {
        super(...arguments);
        /** @internal */
        this.allowMultiple = false;
        /** Apply scale relative to the parent. Default value is TRUE */
        this.parentScale = true;
        /** Apply rotation relative to the parent. Default value is TRUE */
        this.parentRotation = true;
        this._position = new Vector2();
        this._scale = new Vector2(1, 1);
        this._rotation = new Rotation();
        this._innerPosition = new Vector2();
        this._parent = null;
        this.cache = new Vector2();
        this.lastParentRadians = 0;
        this.lastPosition = new Vector2();
        this.scaledInnerPosition = new Vector2();
    }
    /** Position on x-axis and y-axis in pixels */
    get position() {
        return this._position;
    }
    /** Position on x-axis and y-axis in pixels */
    set position(position) {
        this._position.copy(position);
    }
    /** Scale on x-axis and y-axis in pixels */
    get scale() {
        return this._scale;
    }
    /** Scale on x-axis and y-axis in pixels */
    set scale(scale) {
        this._scale.copy(scale);
    }
    /** Rotation expressed in radians or degrees  */
    get rotation() {
        return this._rotation;
    }
    /** Direction vector based on the Rotation */
    get direction() {
        return this._rotation.direction;
    }
    /** Position vector relative to the parent */
    get innerPosition() {
        return this._innerPosition;
    }
    /** Position vector relative to the parent */
    set innerPosition(innerPosition) {
        this._innerPosition.copy(innerPosition);
    }
    /** Parent transform */
    get parent() {
        return this._parent;
    }
    /** Parent transform */
    set parent(parent) {
        this._parent = parent;
        if (this._parent !== null) {
            Vector2.subtract(this._innerPosition, this._position, this._parent.position);
        }
    }
    update() {
        if (this._parent !== null) {
            this.setPositionFromParent();
        }
        this.lastPosition.copy(this._position);
    }
    setPositionFromParent() {
        if (this._innerPosition.magnitude > 0) {
            if (this._parent.rotation.radians !== 0 && this.lastParentRadians !== this._parent.rotation.radians) {
                this.translateInnerPosition();
                this.lastParentRadians = this._parent.rotation.radians;
            }
            if (this.parentScale) {
                this.updateScaledInnerPosition();
                Vector2.add(this._position, this._parent.position, this.scaledInnerPosition);
            }
            else {
                Vector2.add(this._position, this._parent.position, this._innerPosition);
            }
        }
        else {
            this._position.copy(this._parent.position);
        }
        this._rotation.radians = this.parentRotation
            ? this._parent.rotation.radians + this._rotation.radians
            : this._rotation.radians;
        if (this.parentScale)
            this._scale.copy(this.parent._scale);
    }
    translateInnerPosition() {
        const translatedRadians = Math.atan2(this._innerPosition.y, this._innerPosition.x) +
            (this._parent.rotation.radians - this.lastParentRadians);
        this.cache.set(Math.cos(translatedRadians), Math.sin(translatedRadians));
        Vector2.scale(this._innerPosition, this.cache, this._innerPosition.magnitude);
    }
    updateScaledInnerPosition() {
        this.scaledInnerPosition.set(this._innerPosition.x * this._parent.scale.x, this._innerPosition.y * this._parent.scale.y);
    }
}
//# sourceMappingURL=Transform.js.map