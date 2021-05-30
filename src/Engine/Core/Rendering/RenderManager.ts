import { IContextRenderer } from "./IContextRenderer";
import { RenderData, RenderDataType } from "./RenderData/RenderData";
import { CameraData } from "./CameraData";
import { CullingService } from "./CullingService";
import { TilemapRenderData, TileRenderData } from "./RenderData/TilemapRenderData";

export class RenderManager {
    private gameRenderer: IContextRenderer;
    private cullingService: CullingService;
    private debug: boolean = false;

    private renderData: RenderData[] = [];
    private cameraData: CameraData[] = [];

    constructor(gameRenderer: IContextRenderer, cullingService: CullingService, debug: boolean = false) {
        this.gameRenderer = gameRenderer;
        this.cullingService = cullingService;
        this.debug = debug;
    }

    public clearCanvas(color: string | null = null): void {
        this.gameRenderer.clearCanvas(color);
    }

    public addRenderData(renderData: RenderData): void {
        if (this.debug === false && renderData.debug) return;

        this.renderData.push(renderData);
    }

    public addCameraData(cameraData: CameraData): void {
        this.cameraData.push(cameraData);
    }

    public render(): void {
        this.cameraData
            .sort((a: CameraData, b: CameraData) => a.depth - b.depth)
            .forEach((camera: CameraData) => this.renderByCamera(camera));

        this.clearData();
    }

    public clearData(): void {
        this.renderData = [];
        this.cameraData = [];
    }

    private renderByCamera(camera: CameraData): void {
        this.orderRendeData(camera);

        this.cullingService.applyCulling(camera, this.renderData).forEach((renderData: RenderData) => {
            this.updateFromCameraViewport(camera, renderData);
            this.gameRenderer.render(camera, renderData);
        });
    }

    private orderRendeData(camera: CameraData): void {
        this.renderData.sort(
            (a: RenderData, b: RenderData) => camera.layers.indexOf(a.layer) - camera.layers.indexOf(b.layer)
        );
    }

    private updateFromCameraViewport(camera: CameraData, renderData: RenderData): void {
        if (renderData.ui !== true) {
            if (renderData.type === RenderDataType.Tilemap) {
                (renderData as TilemapRenderData).tilesToRender.forEach((tileRenderData) =>
                    this.setPositionInViewport(camera, tileRenderData)
                );
            } else {
                this.setPositionInViewport(camera, renderData);
            }
        } else {
            renderData.positionInViewport = renderData.position;
        }
    }

    private setPositionInViewport(camera: CameraData, renderData: RenderData | TileRenderData): void {
        renderData.positionInViewport.set(
            renderData.position.x - camera.worldSpaceRect.x - camera.worldSpaceRect.width / 2,
            renderData.position.y - camera.worldSpaceRect.y - camera.worldSpaceRect.height / 2
        );
    }
}
