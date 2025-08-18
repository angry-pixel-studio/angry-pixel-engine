import { SYMBOLS } from "@config/dependencySymbols";
import { inject, injectable } from "@angry-pixel/ioc";
import { WebGLManager, CameraData, RenderData } from "@angry-pixel/webgl";

/** @internal */
@injectable(SYMBOLS.RenderManager)
export class RenderManager {
    private renderData: RenderData[] = [];
    private cameraData: CameraData[] = [];

    constructor(@inject(SYMBOLS.WebGLManager) private readonly webGLManager: WebGLManager) {}

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
