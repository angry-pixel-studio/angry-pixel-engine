<<<<<<< HEAD
import Rectangle from "../../Libs/Geometric/Shapes/Rectangle";
import RenderData from "../Rendering/RenderData";
=======
import Rectangle from "../../Helper/Rectangle";
import GeometricRenderData from "../Rendering/RenderData/GeometricRenderData";
>>>>>>> master

export default interface ICollider {
    getLayer(): string;
    getRectangle(): Rectangle;
    getRenderData(): GeometricRenderData;
    collidesWithLayer(layer: string): boolean;
}
