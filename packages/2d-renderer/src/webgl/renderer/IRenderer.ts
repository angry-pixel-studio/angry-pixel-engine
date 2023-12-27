import { ICameraData } from "../../CameraData";
import { IRenderData, RenderDataType } from "../../renderData/RenderData";

export interface IRenderer {
    readonly type: RenderDataType;
    render(renderData: IRenderData, cameraData: ICameraData, lastRender: RenderDataType): void;
}
