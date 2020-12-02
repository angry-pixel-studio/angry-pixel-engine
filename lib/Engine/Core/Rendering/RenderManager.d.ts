import { Rectangle } from "../../Math/Rectangle";
import { IContextRenderer } from "./IContextRenderer";
import { RenderData } from "./RenderData/RenderData";
export declare class RenderManager {
    private gameRenderer;
    private uiRenderer;
    private debugRenderer;
    private renderStack;
    private _renderLayers;
    private _worldSpaceViewRect;
    private _viewportRect;
    private cacheRect;
    constructor(gameRenderer: IContextRenderer, uiRenderer?: IContextRenderer, debugRenderer?: IContextRenderer);
    set renderLayers(renderLayers: string[]);
    set worldSpaceViewRect(worldSpaceRect: Rectangle);
    set viewportRect(viewportRect: Rectangle);
    clearCanvas(color?: string | null): void;
    addToRenderStack(renderData: RenderData): void;
    clearRenderStack(): void;
    render(): void;
    private setViewportPosition;
    private isInsideViewportRect;
}
