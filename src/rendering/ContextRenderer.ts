import { CameraData } from "./CameraData";
import { RenderData } from "./renderData/RenderData";

export interface ContextRenderer {
    render(camera: CameraData, renderData: RenderData): void;
    clearCanvas(color: string | null): void;
}
