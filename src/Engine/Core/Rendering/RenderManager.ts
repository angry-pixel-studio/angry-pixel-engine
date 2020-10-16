import Rectangle from "../../Helper/Rectangle";
import Context2DRenderer from "./Context2D/Context2DRenderer";
import IContextRenderer from "./IContextRenderer";
import RenderData from "./RenderData/RenderData";
import WebGLRenderer from "./WebGL/WebGLRenderer";

export default class RenderManager {
    private webGLRenderer: IContextRenderer = null;
    private context2DRenderer: Context2DRenderer = null;

    private renderStack: RenderData[] = [];
    private _renderLayers: string[] = [];
    private _worldSpaceViewRect: Rectangle = new Rectangle(0, 0, 0, 0);
    private _viewportRect: Rectangle = new Rectangle(0, 0, 0, 0);

    constructor(gameCanvas: HTMLCanvasElement, UICanvas: HTMLCanvasElement = null) {
        this.webGLRenderer = new WebGLRenderer(gameCanvas);

        if (UICanvas !== null) {
            this.context2DRenderer = new Context2DRenderer(UICanvas);
        }
    }

    public set renderLayers(renderLayers: string[]) {
        this._renderLayers = [...renderLayers];
    }

    public set worldSpaceViewRect(worldSpaceRect: Rectangle) {
        this._worldSpaceViewRect.updateFromRect(worldSpaceRect);
    }

    public set viewportRect(viewportRect: Rectangle) {
        this._viewportRect.updateFromRect(viewportRect);
    }

    public clearCanvas(color: string | null = null): void {
        this.webGLRenderer.clearCanvas(color);

        // If UI enabled
        if (this.context2DRenderer) {
            this.context2DRenderer.clearCanvas();
        }
    }

    public addToRenderStack(renderData: RenderData): void {
        this.renderStack.push(renderData);
    }

    public clearRenderStack(): void {
        this.renderStack = [];
    }

    public render(): void {
        this.renderStack.forEach((renderData: RenderData) => {
            if (this._renderLayers.includes(renderData.layer) === false) {
                return;
            }

            if (renderData.ui !== true) {
                this.webGLRenderer.render(renderData, this._worldSpaceViewRect, this._viewportRect);
            } else if (this.context2DRenderer && renderData.ui === true) {
                this.context2DRenderer.render(renderData, this._worldSpaceViewRect, this._viewportRect);
            }
        });

        this.clearRenderStack();
    }
}
