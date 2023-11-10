import { CameraComponent } from "../core/Component";
import { Exception } from "../utils/Exception";
import { ICameraData } from "angry-pixel-2d-renderer";
import { LAYER_DEFAULT } from "../core/GameObject";
import { Rectangle, Vector2 } from "angry-pixel-math";

const DEFAULT_LAYERS: string[] = [LAYER_DEFAULT];

/**
 * The Camera component is used to organize the rendering order by layers and to manage the general zooming of these layers.
 * @public
 * @category Components
 * @example
 * ```js
 * const camera = this.addComponent(Camera);
 * camera.zoom = 1;
 * camera.depth = 0;
 * camera.layers = ["Background", "Foreground"];
 * camera.addLayer("UI");
 * ```
 */
export class Camera extends CameraComponent {
    /** @private */
    public readonly allowMultiple: boolean = false;
    /**
     * Rectangle representing the field of view of the camera from the perspective of the screen
     * @readonly
     */
    public readonly viewportRect: Rectangle = new Rectangle(0, 0, 0, 0);
    /**
     * Rectangle representing the field of view of the camera in the game world
     * @readonly
     */
    public readonly worldSpaceRect: Rectangle = new Rectangle(0, 0, 0, 0);

    /** In case you have more than one camera, the depth value determines which camera is rendered first */
    public depth: number = 0;
    /** Layers to be rendered by this camera */
    public layers: string[] = DEFAULT_LAYERS;

    private _zoom: number = 1;
    private cameraData: ICameraData;
    private canvas: HTMLCanvasElement;

    /** Camera zoom. Default value is 1 */
    public set zoom(zoom: number) {
        if (this.zoom <= 0) {
            throw new Exception("zoom must be greather than 0");
        }

        this._zoom = zoom;
    }

    /** Camera zoom. Default value is 1 */
    public get zoom(): number {
        return this._zoom;
    }

    /** Adds a new layer to the end of the stack */
    public addLayer(layer: string): void {
        this.layers.push(layer);
    }

    protected init(): void {
        this.canvas = this.domManager.canvas;
        this.cameraData = { position: new Vector2(), layers: [], depth: 1 };
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
