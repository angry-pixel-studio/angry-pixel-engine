import { IContextRenderer } from "./IContextRenderer";
import { RenderData } from "./RenderData/RenderData";
import { CameraData } from "./CameraData";
export declare class RenderManager {
    private gameRenderer;
    private uiRenderer;
    private debugRenderer;
    private renderStack;
    private cameras;
    private cacheRect;
    constructor(gameRenderer: IContextRenderer, uiRenderer?: IContextRenderer, debugRenderer?: IContextRenderer);
    clearCanvas(color?: string | null): void;
    addToRenderStack(renderData: RenderData): void;
    addCameraData(cameraData: CameraData): void;
    render(): void;
    clear(): void;
    private renderByCamera;
    private setViewportPosition;
    private isInsideViewportRect;
}
