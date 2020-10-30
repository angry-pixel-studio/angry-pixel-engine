import { Rectangle } from "../../../Libs/Geometric/Shapes/Rectangle";
import { IContextRenderer } from "../IContextRenderer";
import { RenderData } from "../RenderData/RenderData";
export declare class Context2DRenderer implements IContextRenderer {
    private canvas;
    private canvasContext;
    private renderPosition;
    private imagePosition;
    private cacheRect;
    constructor(canvas: HTMLCanvasElement);
    clearCanvas(color?: string | null): void;
    render(renderData: RenderData, worldSpaceViewRect: Rectangle, viewportRect: Rectangle): void;
    private renderImage;
    private renderText;
    private renderGeometric;
    private isInsideViewRect;
    private updateRenderPosition;
    private centerImage;
}
