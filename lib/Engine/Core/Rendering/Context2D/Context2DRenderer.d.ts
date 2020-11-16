import { IContextRenderer } from "../IContextRenderer";
import { RenderData } from "../RenderData/RenderData";
export declare class Context2DRenderer implements IContextRenderer {
    private canvas;
    private canvasContext;
    private imagePosition;
    constructor(canvas: HTMLCanvasElement);
    clearCanvas(color?: string | null): void;
    render(renderData: RenderData): void;
    private renderImage;
    private renderText;
    private renderGeometric;
    private updateRenderPosition;
    private centerImage;
}
