import { TYPES } from "@config/types";
import { inject, injectable } from "@ioc";
import { WebGLManager } from "@webgl";
import { CameraData, RenderData } from "../utils/webgl/renderer/Renderer";

@injectable(TYPES.RenderManager)
export class RenderManager {
    private renderData: RenderData[] = [];
    private cameraData: CameraData[] = [];

    constructor(@inject(TYPES.WebGLManager) private readonly webGLManager: WebGLManager) {}

    public addCameraData(cameraData: CameraData): void {
        this.cameraData.push(cameraData);
    }

    public addRenderData(renderData: RenderData): void {
        this.renderData.push(renderData);
    }

    public setRenderData(renderData: RenderData[]): void {
        this.renderData = renderData;
    }

    public getCameraData(): CameraData[] {
        return this.cameraData;
    }

    public getRenderData(): RenderData[] {
        return this.renderData;
    }

    public removeCameraData(): void {
        this.cameraData = [];
    }

    public removeRenderData(): void {
        this.renderData = [];
    }

    public render(): void {
        this.cameraData
            .sort((a, b) => a.depth - b.depth)
            .forEach((cameraData) =>
                this.renderData
                    .filter((renderData) => cameraData.layers.includes(renderData.layer))
                    .sort((a, b) => cameraData.layers.indexOf(a.layer) - cameraData.layers.indexOf(b.layer))
                    .forEach((renderData) => this.webGLManager.render(renderData, cameraData)),
            );
    }
}
