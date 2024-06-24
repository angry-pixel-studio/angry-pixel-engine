import { Vector2 } from "../../math";

export class Transform {
    /** Position relative to the zero point of the simulated world, or relative to the parent if it has one */
    public position: Vector2 = new Vector2();
    /** Scale on x-axis and y-axis */
    public scale: Vector2 = new Vector2(1, 1);
    /** Rotation expressed in radians */
    public rotation: number = 0;

    /** The real position in the simulated world. It has the same value as `position` property if there is no parent */
    public localPosition: Vector2 = new Vector2();
    /** The real scale in the simulated world. It has the same value as `scale` property if there is no parent */
    public localScale: Vector2 = new Vector2(1, 1);
    /** The real rotation in the simulated world. It has the same value as `rotation` property if there is no parent */
    public localRotation: number = 0;

    private _parent: Transform = undefined;

    /** The parent transform. The position property became relative to this transform */
    public get parent(): Transform {
        return this._parent;
    }

    /** The parent transform. The position property became relative to this transform */
    public set parent(parent: Transform) {
        this._parent = parent;

        if (this._parent) {
            this.localPosition.copy(this.position);
            Vector2.subtract(this.position, this.position, this._parent.position);
        } else {
            this.position.copy(this.localPosition);
        }
    }
}
