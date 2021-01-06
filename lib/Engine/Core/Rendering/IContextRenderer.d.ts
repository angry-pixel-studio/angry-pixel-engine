import { CameraData } from "./CameraData";
import { RenderData } from "./RenderData/RenderData";
export interface IContextRenderer {
    render(camera: CameraData, renderData: RenderData): void;
    clearCanvas(color: string | null): void;
}
