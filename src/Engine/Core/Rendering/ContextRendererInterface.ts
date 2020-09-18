import Rectangle from "../../Helper/Rectangle";
import RenderData from "./RenderData";

export default interface ContextRendererInterface {
    renderInWorldSpace(renderData: RenderData, worldSpaceViewRect: Rectangle): void
    clearCanvas(color: string|null): void;   
}