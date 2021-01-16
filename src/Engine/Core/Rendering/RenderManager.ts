import { Vector2 } from "../../Math/Vector2";
import { Rectangle } from "../../Math/Rectangle";
import { IContextRenderer } from "./IContextRenderer";
import { GeometricRenderData } from "./RenderData/GeometricRenderData";
import { ImageRenderData } from "./RenderData/ImageRenderData";
import { RenderData, RenderDataType } from "./RenderData/RenderData";
import { CameraData } from "./CameraData";

export class RenderManager {
    private gameRenderer: IContextRenderer = null;

    private renderStack: RenderData[] = [];
    private cameras: CameraData[] = [];

    private cacheRect: Rectangle = new Rectangle(0, 0, 0, 0);

    constructor(gameRenderer: IContextRenderer) {
        this.gameRenderer = gameRenderer;
    }

    public clearCanvas(color: string | null = null): void {
        this.gameRenderer.clearCanvas(color);
    }

    public addToRenderStack(renderData: RenderData): void {
        this.renderStack.push(renderData);
    }

    public addCameraData(cameraData: CameraData): void {
        this.cameras.push(cameraData);
    }

    public render(): void {
        this.cameras
            .sort((a: CameraData, b: CameraData) => a.depth - b.depth)
            .forEach((camera: CameraData) => this.renderByCamera(camera));

        this.clear();
    }

    public clear(): void {
        this.renderStack = [];
        this.cameras = [];
    }

    private renderByCamera(camera: CameraData): void {
        this.renderStack.forEach((renderData: RenderData) => {
            if (camera.layers.includes(renderData.layer) === false) {
                return;
            }

            this.setViewportPosition(camera, renderData);

            if (renderData.ui === true) {
                this.gameRenderer.render(camera, renderData);
            } else if (renderData.debug === true) {
                // render debug
            } else if (this.isInsideViewportRect(camera, renderData as ImageRenderData) !== false) {
                this.gameRenderer.render(camera, renderData);
            }
        });
    }

    private setViewportPosition(camera: CameraData, renderData: RenderData): void {
        if (renderData.ui !== true) {
            renderData.viewportPosition.set(
                Number((renderData.position.x - camera.worldSpaceRect.x - camera.worldSpaceRect.width / 2).toFixed(0)),
                Number((renderData.position.y - camera.worldSpaceRect.y - camera.worldSpaceRect.height / 2).toFixed(0))
            );
        } else {
            renderData.viewportPosition = renderData.position;
        }
    }

    private isInsideViewportRect(camera: CameraData, renderData: ImageRenderData): boolean {
        this.cacheRect.set(
            renderData.viewportPosition.x - renderData.width / 2,
            renderData.viewportPosition.y - renderData.height / 2,
            renderData.width,
            renderData.height
        );

        return camera.viewportRect.overlappingRectangle(this.cacheRect);
    }
}
