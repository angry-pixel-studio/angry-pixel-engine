import { Rectangle } from "../../Libs/Geometric/Shapes/Rectangle";
import { IContextRenderer } from "./IContextRenderer";
import { RenderData } from "./RenderData/RenderData";
export declare class RenderManager {
    private gameRenderer;
    private UIRenderer;
    private renderStack;
    private _renderLayers;
    private _worldSpaceViewRect;
    private _viewportRect;
    constructor(gameRenderer: IContextRenderer, UIRenderer: IContextRenderer | null);
    set renderLayers(renderLayers: string[]);
    set worldSpaceViewRect(worldSpaceRect: Rectangle);
    set viewportRect(viewportRect: Rectangle);
    clearCanvas(color?: string | null): void;
    addToRenderStack(renderData: RenderData): void;
    clearRenderStack(): void;
    render(): void;
}
