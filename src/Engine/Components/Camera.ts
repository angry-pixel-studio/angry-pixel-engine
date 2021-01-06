import { RenderComponent } from "../Component";
import { DomManager } from "../Core/Dom/DomManager";
import { CameraData } from "../Core/Rendering/CameraData";
import { RenderManager } from "../Core/Rendering/RenderManager";
import { container } from "../Game";
import { LAYER_DEFAULT } from "../GameObject";
import { Rectangle } from "../Math/Rectangle";

const DEFAULT_LAYERS: string[] = [LAYER_DEFAULT];

export const TYPE_CAMERA: string = "Camera";

interface Config {
    layers: string[];
    depth: number;
    zoom: number;
}

export class Camera extends RenderComponent {
    private renderManager: RenderManager = container.getSingleton<RenderManager>("RenderManager");
    private domManager: DomManager = container.getSingleton<DomManager>("DomManager");

    private _layers: string[] = DEFAULT_LAYERS;
    private _depth: number = 0;
    private _zoom: number = 1;
    private _viewportRect: Rectangle = new Rectangle(0, 0, 0, 0);
    private _worldSpaceRect: Rectangle = new Rectangle(0, 0, 0, 0);

    private canvasWidth: number;
    private canvasHeight: number;
    private canvasHalfWidth: number;
    private canvasHalfHeight: number;
    private cameraData: CameraData = new CameraData();

    constructor() {
        super();

        this.allowMultiple = false;
        this.type = TYPE_CAMERA;

        this.canvasWidth = this.domManager.gameCanvas.width;
        this.canvasHeight = this.domManager.gameCanvas.height;
        this.canvasHalfWidth = this.canvasWidth / 2;
        this.canvasHalfHeight = this.canvasHeight / 2;
    }

    public set layers(layers: string[]) {
        this._layers = [...DEFAULT_LAYERS, ...layers];
    }

    public get layers(): string[] {
        return this._layers;
    }

    public set depth(depth: number) {
        this._depth = depth;
    }

    public get depth(): number {
        return this._depth;
    }

    public set zoom(zoom: number) {
        if (this.zoom <= 0) {
            throw new Error("zoom must be greather than 0");
        }

        this._zoom = zoom;
    }

    public get zoom(): number {
        return this._zoom;
    }

    public get worldSpaceRect(): Rectangle {
        return this._worldSpaceRect;
    }

    public get viewportRect(): Rectangle {
        return this._viewportRect;
    }

    public addLayer(layer: string): void {
        this._layers.push(layer);
    }

    protected update(): void {
        this.updateViewportRect();
        this.updateWorldSpaceRect();
        this.updateCameraData();
    }

    private updateViewportRect(): void {
        const inverseZoom: number = 1 / this.zoom;

        this._viewportRect.x = -this.canvasHalfWidth * inverseZoom;
        this._viewportRect.y = -this.canvasHalfHeight * inverseZoom;
        this._viewportRect.width = this.canvasWidth * inverseZoom;
        this._viewportRect.height = this.canvasHeight * inverseZoom;
    }

    private updateWorldSpaceRect(): void {
        this._worldSpaceRect.x = this.gameObject.transform.position.x - this._viewportRect.width / 2;
        this._worldSpaceRect.y = this.gameObject.transform.position.y - this._viewportRect.height / 2;
        this._worldSpaceRect.width = this._viewportRect.width;
        this._worldSpaceRect.height = this._viewportRect.height;
    }

    private updateCameraData(): void {
        this.cameraData.depth = this._depth;
        this.cameraData.layers = this._layers;
        this.cameraData.viewportRect = this._viewportRect;
        this.cameraData.worldSpaceRect = this._worldSpaceRect;

        this.renderManager.addCameraData(this.cameraData);
    }
}
