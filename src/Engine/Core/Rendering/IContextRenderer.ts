import { Rectangle } from "../../Libs/Geometric/Shapes/Rectangle";
import { RenderData } from "./RenderData/RenderData";

export interface IContextRenderer {
    render(renderData: RenderData): void;
    clearCanvas(color: string | null): void;
}
