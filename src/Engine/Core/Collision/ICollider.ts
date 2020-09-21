import Rectangle from "../../Helper/Rectangle";
import RenderData from "../Rendering/RenderData";

export default interface ICollider {
    getLayer(): string;
    getRectangle(): Rectangle;
    getRenderData(): RenderData;
    collidesWithLayer(layer: string): boolean;
}
