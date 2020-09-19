import Rectangle from "../../../Helper/Rectangle";
import ContextRendererInterface from "../ContextRendererInterface";
import RenderData from "../RenderData";
import Context2DWorldSapceRenderer from "./Context2DWorldSapceRenderer";

const DEFAULT_COLOR: string = '#000000';

export default class Context2DRenderer implements ContextRendererInterface {
    private canvas: HTMLCanvasElement = null;
    private canvasContext: CanvasRenderingContext2D = null;
    private worldSpaceRenderer: Context2DWorldSapceRenderer = null;

    public constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.canvasContext = canvas.getContext('2d');
        this.worldSpaceRenderer = new Context2DWorldSapceRenderer(canvas);
    }

    public renderInWorldSpace(renderData: RenderData, worldSpaceViewRect: Rectangle): void {
        if (renderData.image) {
            this.worldSpaceRenderer.renderImage(renderData, worldSpaceViewRect);
        }

        if (renderData.text) {
            this.worldSpaceRenderer.renderText(renderData, worldSpaceViewRect);
        }

        if (renderData.geometric) {
            this.worldSpaceRenderer.renderGeometric(renderData, worldSpaceViewRect);
        }
    }

    public clearCanvas(color: string|null = null): void {
        this.canvasContext.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientWidth);
        this.canvasContext.fillStyle = color ? color : DEFAULT_COLOR;
        this.canvasContext.fillRect(0, 0, this.canvas.clientWidth, this.canvas.clientWidth);
    }
}