import Rectangle from "../../Libs/Geometric/Shapes/Rectangle";
import RenderData from "../Rendering/RenderData";

export default interface ICollider {
    getLayer(): string;
    getRectangle(): Rectangle;
    getRenderData(): RenderData;
    collidesWithLayer(layer: string): boolean;
}
