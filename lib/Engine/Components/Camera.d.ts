import { Component } from "../Component";
import { Rectangle } from "../Libs/Geometric/Shapes/Rectangle";
export declare class Camera extends Component {
    private _vpHalfWidth;
    private _vpHalfHeight;
    private _viewportRect;
    private _worldSpaceRect;
    private _renderLayers;
    private renderManager;
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
