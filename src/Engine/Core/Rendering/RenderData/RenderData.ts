import { Rectangle } from "../../../Math/Rectangle";
import { Vector2 } from "../../../Math/Vector2";

export enum RenderDataType {
    Image,
    Text,
    Geometric,
    Collider,
}

export abstract class RenderData {
    public abstract type: RenderDataType;
    public ui: boolean = false;
    public debug: boolean = false;
    public layer: string = null;
    public viwportRect: Rectangle;

    private _position: Vector2 = new Vector2(0, 0);
    private _positionInViewport: Vector2 = new Vector2(0, 0);

    public get position(): Vector2 {
        return this._position;
    }

    public set position(position: Vector2) {
        this._position.set(position.x, position.y);
    }

    public get positionInViewport(): Vector2 {
        return this._positionInViewport;
    }

    public set positionInViewport(position: Vector2) {
        this._positionInViewport.set(position.x, position.y);
    }
}
