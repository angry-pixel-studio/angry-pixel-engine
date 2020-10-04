import Rectangle from "../../Libs/Geometric/Shapes/Rectangle";
import RenderData from "./RenderData";

export default interface IContextRenderer {
    render(renderData: RenderData, worldSpaceViewRect: Rectangle, viewportRect: Rectangle): void;
    clearCanvas(color: string | null): void;
}
