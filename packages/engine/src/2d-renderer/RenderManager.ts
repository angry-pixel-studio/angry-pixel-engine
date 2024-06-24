import { ICameraData } from "./CameraData";
import { ICullingManager } from "./CullingManager";
import { IRenderData, RenderDataType } from "./renderData/RenderData";
import { ITilemapRenderData } from "./renderData/TilemapRenderData";
import { processTilemapRenderData } from "./Utils";
import { IWebGLManager } from "./webgl/WebGLManager";

/**
 * @internal
 */
export interface IRenderManager {
    addRenderData<T extends IRenderData>(data: T): void;
    addCameraData(data: ICameraData): void;
    render(): void;
    /** @deprecated use clearRenderData and clearCameraData instead */
    clearData(): void;
    clearRenderData(): void;
    clearCameraData(): void;
    clearScreen(hexColor: string): void;
    preloadTexture(image: HTMLImageElement, smooth?: boolean): void;
    canvas: HTMLCanvasElement | OffscreenCanvas;
}

export class RenderManager implements IRenderManager {
    private renderData: IRenderData[] = [];
    private cameraData: ICameraData[] = [];

    public constructor(
        private readonly webglManager: IWebGLManager,
        private readonly cullingManager: ICullingManager,
    ) {}

    public get canvas(): HTMLCanvasElement | OffscreenCanvas {
        return this.webglManager.gl.canvas;
    }

    public addRenderData<T extends IRenderData>(data: T): void {
        this.renderData.push(data);
    }

    public addCameraData(data: ICameraData): void {
        this.cameraData.push(data);
    }

    public render(): void {
        this.cameraData.sort((a, b) => a.depth - b.depth).forEach((data) => this.renderByCamera(data));
    }

    private renderByCamera(cameraData: ICameraData): void {
        this.cullingManager
            .applyCulling(
                cameraData,
                this.renderData
                    .filter((renderData) => cameraData.layers.includes(renderData.layer))
                    .sort((a, b) => cameraData.layers.indexOf(a.layer) - cameraData.layers.indexOf(b.layer))
                    .map((renderData) =>
                        renderData.type === RenderDataType.Tilemap
                            ? processTilemapRenderData(renderData as ITilemapRenderData)
                            : renderData,
                    ),
            )
            .forEach((renderData) => this.webglManager.render(renderData, cameraData));
    }

    public clearData(): void {
        this.renderData = [];
        this.cameraData = [];
    }

    public clearRenderData(): void {
        this.renderData = [];
    }

    public clearCameraData(): void {
        this.cameraData = [];
    }

    public clearScreen(hexColor: string): void {
        this.webglManager.clearCanvas(hexColor);
    }

    public preloadTexture(image: HTMLImageElement): void {
        this.webglManager.createTexture(image);
    }
}
