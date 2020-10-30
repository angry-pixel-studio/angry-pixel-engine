import { Rectangle } from "../../../Libs/Geometric/Shapes/Rectangle";
import { IContextRenderer } from "../IContextRenderer";
import { RenderData } from "../RenderData/RenderData";
import { ImageRenderer } from "./ImageRenderer";
export declare class WebGLRenderer implements IContextRenderer {
    private canvas;
    private gl;
    private imageRenderer;
    private renderPosition;
    private cacheRect;
    constructor(canvas: HTMLCanvasElement, imageRenderer: ImageRenderer);
    clearCanvas(color: string): void;
    private hexToRgb;
    render(renderData: RenderData, worldSpaceViewRect: Rectangle, viewportRect: Rectangle): void;
    private renderImage;
    private isInsideViewRect;
    private updateRenderPosition;
}
