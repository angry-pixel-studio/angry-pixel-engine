import { Component } from "../Component";
import { Vector2 } from "../Helper/Vector2";
export declare const TYPE_TRANSFORM: string;
export declare class Transform extends Component {
    position: Vector2;
    innerPosition: Vector2;
    scale: Vector2;
    rotation: number;
    private parentTransform;
    constructor();
    protected start(): void;
    protected update(): void;
    private translateFromParent;
    forceUpdate(): void;
}
