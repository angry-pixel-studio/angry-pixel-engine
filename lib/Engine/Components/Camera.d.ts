import { RenderComponent } from "../Component";
import { Rectangle } from "../Math/Rectangle";
export declare const TYPE_CAMERA: string;
export declare class Camera extends RenderComponent {
    private renderManager;
    private domManager;
    private _layers;
    private _depth;
    private _zoom;
    private _viewportRect;
    private _worldSpaceRect;
    private canvas;
    private cameraData;
    constructor();
    set layers(layers: string[]);
    get layers(): string[];
    set depth(depth: number);
    get depth(): number;
    set zoom(zoom: number);
    get zoom(): number;
    get worldSpaceRect(): Rectangle;
    get viewportRect(): Rectangle;
    addLayer(layer: string): void;
    protected update(): void;
    private updateViewportRect;
    private updateWorldSpaceRect;
    private updateCameraData;
}
