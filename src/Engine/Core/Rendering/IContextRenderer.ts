import Rectangle from "../../Helper/Rectangle";
import RenderData from "./RenderData/RenderData";

export default interface IContextRenderer {
    render(renderData: RenderData, worldSpaceViewRect: Rectangle, viewportRect: Rectangle): void;
    clearCanvas(color: string | null): void;
}
