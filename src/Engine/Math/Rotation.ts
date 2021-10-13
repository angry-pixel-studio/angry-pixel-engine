import { Vector2 } from "./Vector2";

export class Rotation {
    private _degrees: number = 0;
    private _radians: number = 0;
    private _direction: Vector2 = new Vector2();

    constructor(config?: { radians?: number; degrees?: number }) {
        if (config && config.radians) {
            this.radians = config.radians;
        } else if (config && config.degrees) {
            this.degrees = config.degrees;
        }
    }

    public set degrees(degrees: number) {
        this._degrees = degrees;
        this._radians = (degrees * Math.PI) / 180;
        this.updateDirection();
    }

    public get degrees(): number {
        return this._degrees;
    }

    public set radians(radians: number) {
        this._radians = radians;
        this._degrees = (radians * 180) / Math.PI;
        this.updateDirection();
    }

    public get radians(): number {
        return this._radians;
    }

    public get direction(): Vector2 {
        return this._direction;
    }

    private updateDirection(): void {
        this._direction.set(Math.cos(this._radians), Math.sin(this._radians));
    }
}
