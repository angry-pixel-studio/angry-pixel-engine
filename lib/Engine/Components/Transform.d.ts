import { Component } from "../Component";
import { Vector2 } from "../Math/Vector2";
export declare const TYPE_TRANSFORM: string;
export declare class Transform extends Component {
    private _position;
    private _innerPosition;
    private _scale;
    private _rotation;
    private parentTransform;
    constructor();
    get position(): Vector2;
    set position(position: Vector2);
    get innerPosition(): Vector2;
    set innerPosition(innerPosition: Vector2);
    get scale(): Vector2;
    set scale(scale: Vector2);
    get rotation(): number;
    set rotation(rotation: number);
    protected update(): void;
    private translateFromParent;
    forceUpdate(): void;
}
