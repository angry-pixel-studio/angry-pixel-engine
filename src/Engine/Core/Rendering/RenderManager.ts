import { Rectangle } from "../../Libs/Geometric/Shapes/Rectangle";
import { IContextRenderer } from "./IContextRenderer";
import { RenderData, RenderDataType } from "./RenderData/RenderData";

export class RenderManager {
    private gameRenderer: IContextRenderer = null;
    private UIRenderer: IContextRenderer | null = null;

    private renderStack: RenderData[] = [];
    private _renderLayers: string[] = [];
    private _worldSpaceViewRect: Rectangle = new Rectangle(0, 0, 0, 0);
    private _viewportRect: Rectangle = new Rectangle(0, 0, 0, 0);

    constructor(gameRenderer: IContextRenderer, UIRenderer: IContextRenderer | null) {
        this.gameRenderer = gameRenderer;
        this.UIRenderer = UIRenderer;
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
        this.gameRenderer.clearCanvas(color);

        // If UI enabled
        if (this.UIRenderer) {
            this.UIRenderer.clearCanvas(null);
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
                // TODO: temporary solution until resolve this with WebGL
                if (renderData.type === RenderDataType.Geometric && this.UIRenderer) {
                    this.UIRenderer.render(renderData, this._worldSpaceViewRect, this._viewportRect);
                } else {
                    this.gameRenderer.render(renderData, this._worldSpaceViewRect, this._viewportRect);
                }
            } else if (this.UIRenderer && renderData.ui === true) {
                this.UIRenderer.render(renderData, this._worldSpaceViewRect, this._viewportRect);
            }
        });

        this.clearRenderStack();
    }
}
