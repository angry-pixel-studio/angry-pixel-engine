import RenderData from "./RenderData";
import Rectangle from "../../Helper/Rectangle";
import IContextRenderer from "./IContextRenderer";

export default class RenderManager {
    private contextRenderer: IContextRenderer = null;
    private renderStack: RenderData[] = [];
    private _renderLayers: string[] = [];
    private _worldSpaceViewRect: Rectangle = new Rectangle(0, 0, 0, 0);
    private _viewportRect: Rectangle = new Rectangle(0, 0, 0, 0);

    constructor(contextRenderer: IContextRenderer) {
        this.contextRenderer = contextRenderer;
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

    public clearCanvas(color: string | null = null) {
        this.contextRenderer.clearCanvas(color);
    }

    public addToRenderStack(renderData: RenderData): void {
        this.renderStack.push(renderData);
    }

    public clearRenderStack() {
        this.renderStack = [];
    }

    public render() {
        this.renderStack.forEach((renderData: RenderData) => {
            if (this._renderLayers.includes(renderData.layer) === false) {
                return;
            }

            this.contextRenderer.render(renderData, this._worldSpaceViewRect, this._viewportRect);
        });

        this.clearRenderStack();
    }
}
