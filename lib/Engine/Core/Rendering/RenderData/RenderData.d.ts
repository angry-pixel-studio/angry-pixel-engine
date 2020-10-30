import { Vector2 } from "../../../Helper/Vector2";
export declare enum RenderDataType {
    Image = "Image",
    Text = "Text",
    Geometric = "Geometric"
}
export declare abstract class RenderData {
    abstract type: RenderDataType;
    ui: boolean;
    layer: string;
    private _position;
    set position(position: Vector2);
    get position(): Vector2;
}
