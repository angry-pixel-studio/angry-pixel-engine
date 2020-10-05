import Rectangle from "../../Helper/Rectangle";
import GeometricRenderData from "../Rendering/RenderData/GeometricRenderData";

export default interface ICollider {
    getLayer(): string;
    getRectangle(): Rectangle;
    getRenderData(): GeometricRenderData;
    collidesWithLayer(layer: string): boolean;
}
