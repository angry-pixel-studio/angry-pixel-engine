import Vector2 from "../../../Helper/Vector2";

export enum RenderDataType {
    Image = "Image",
    Text = "Text",
    Geometric = "Geometric",
}

export default abstract class RenderData {
    public abstract type: RenderDataType;
    public ui: boolean = false;
    public layer: string = null;
    public position: Vector2 = new Vector2(0, 0);
}
