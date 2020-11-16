import { Vector2 } from "../../../Helper/Vector2";
export declare enum RenderDataType {
    Image = 0,
    Text = 1,
    Geometric = 2
}
export declare abstract class RenderData {
    abstract type: RenderDataType;
    ui: boolean;
    debug: boolean;
    layer: string;
    private _position;
    private _viewportPosition;
    get position(): Vector2;
    set position(position: Vector2);
    get viewportPosition(): Vector2;
    set viewportPosition(position: Vector2);
}
