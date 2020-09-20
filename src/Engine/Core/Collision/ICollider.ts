import Rectangle from "../../Helper/Rectangle";
import RenderData from "../Rendering/RenderData";

export default interface ICollider {
    collidesWith(other: ICollider): boolean;
    getLayer(): string;
    getRectangle(): Rectangle;
    getRenderData(): RenderData;
    isPasive(): boolean;
}
