import { CameraComponent } from "../core/Component";
import { Exception } from "../utils/Exception";
import { ICameraData, IRenderManager } from "angry-pixel-2d-renderer";
import { LAYER_DEFAULT } from "../core/GameObject";
import { Rectangle, Vector2 } from "angry-pixel-math";
import { DomManager } from "../core/managers/DomManager";

const DEFAULT_LAYERS: string[] = [LAYER_DEFAULT];

export class Camera extends CameraComponent {
    public readonly allowMultiple: boolean = false;

    private renderManager: IRenderManager = this.container.getSingleton<IRenderManager>("RenderManager");
    private canvas: HTMLCanvasElement = this.container.getSingleton<DomManager>("DomManager").canvas;

    public readonly viewportRect: Rectangle = new Rectangle(0, 0, 0, 0);
    public readonly worldSpaceRect: Rectangle = new Rectangle(0, 0, 0, 0);

    public depth: number = 0;
    public layers: string[] = DEFAULT_LAYERS;
    private _zoom: number = 1;

    private cameraData: ICameraData;

    public set zoom(zoom: number) {
        if (this.zoom <= 0) {
            throw new Exception("zoom must be greather than 0");
        }

        this._zoom = zoom;
    }

    public get zoom(): number {
        return this._zoom;
    }

    public addLayer(layer: string): void {
        this.layers.push(layer);
    }

    protected init(): void {
        this.cameraData = {
            position: new Vector2(),
            layers: [],
            depth: 1,
        };
    }

    protected update(): void {
        this.updateViewportRect();
        this.updateWorldSpaceRect();
        this.updateCameraData();
    }

    private updateViewportRect(): void {
        this.viewportRect.x = -this.canvas.width / 2;
        this.viewportRect.y = -this.canvas.height / 2;
        this.viewportRect.width = this.canvas.width;
        this.viewportRect.height = this.canvas.height;
    }

    private updateWorldSpaceRect(): void {
        this.worldSpaceRect.x = (this.gameObject.transform.position.x - this.viewportRect.width / 2) / this._zoom;
        this.worldSpaceRect.y = (this.gameObject.transform.position.y - this.viewportRect.height / 2) / this._zoom;
        this.worldSpaceRect.width = this.viewportRect.width / this._zoom;
        this.worldSpaceRect.height = this.viewportRect.height / this._zoom;
    }

    private updateCameraData(): void {
        this.cameraData.position.copy(this.gameObject.transform.position);
        this.cameraData.depth = this.depth;
        this.cameraData.layers = this.layers;
        this.cameraData.zoom = this._zoom;

        this.renderManager.addCameraData(this.cameraData);
    }
}
