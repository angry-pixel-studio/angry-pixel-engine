import { Vector2 } from "@math";

/** @category Components */
export interface TransformOptions {
    position: Vector2;
    scale: Vector2;
    rotation: number;
    parent: Transform;
    localPosition: Vector2;
    localScale: Vector2;
    localRotation: number;
}

/** @category Components */
export class Transform {
    /** Position relative to the zero point of the simulated world, or relative to the parent if it has one */
    position: Vector2 = new Vector2();
    /** Scale on x-axis and y-axis */
    scale: Vector2 = new Vector2(1, 1);
    /** Rotation expressed in radians */
    rotation: number = 0;

    /** The real position in the simulated world. It has the same value as `position` property if there is no parent */
    localPosition: Vector2 = new Vector2();
    /** The real scale in the simulated world. It has the same value as `scale` property if there is no parent */
    localScale: Vector2 = new Vector2(1, 1);
    /** The real rotation in the simulated world. It has the same value as `rotation` property if there is no parent */
    localRotation: number = 0;

    private _parent: Transform = undefined;

    /** The parent transform. The position property became relative to this transform */
    get parent(): Transform {
        return this._parent;
    }

    /** The parent transform. The position property became relative to this transform */
    set parent(parent: Transform) {
        if (this._parent === parent) return;

        this._parent = parent;

        if (this._parent) {
            this.localPosition.copy(this.position);
            Vector2.subtract(this.position, this.position, this._parent.position);
        } else {
            this.position.copy(this.localPosition);
        }
    }

    constructor(options?: Partial<TransformOptions>) {
        Object.assign(this, options);
    }
}
