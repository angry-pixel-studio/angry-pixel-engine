import { RenderComponent } from "../Component";
import { Rectangle } from "../Libs/Geometric/Shapes/Rectangle";
export declare const TYPE_CAMERA: string;
export declare class Camera extends RenderComponent {
    private renderManager;
    private domManager;
    private gameCanvas;
    private _vpHalfWidth;
    private _vpHalfHeight;
    private _viewportRect;
    private _worldSpaceRect;
    private _renderLayers;
    constructor();
    protected start(): void;
    private setupViewportRect;
    protected update(): void;
    private updateWorldSpaceRect;
    addLayerToRender(layer: string): void;
    set renderLayers(renderLayers: string[]);
    get renderLayers(): string[];
    get worldSpaceRect(): Rectangle;
    get viewportRect(): Rectangle;
}
