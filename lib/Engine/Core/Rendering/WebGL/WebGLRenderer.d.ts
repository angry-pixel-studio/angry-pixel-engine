import { IContextRenderer } from "../IContextRenderer";
import { RenderData } from "../RenderData/RenderData";
import { WebGLImageRenderer } from "./WebGLImageRenderer";
export declare class WebGLRenderer implements IContextRenderer {
    private canvas;
    private gl;
    private imageRenderer;
    constructor(canvas: HTMLCanvasElement, imageRenderer: WebGLImageRenderer);
    clearCanvas(color: string): void;
    private hexToRgb;
    render(renderData: RenderData): void;
    private renderImage;
}
