import { Vector2 } from "../../Helper/Vector2";
import { Rectangle } from "../../Libs/Geometric/Shapes/Rectangle";
import { IContextRenderer } from "./IContextRenderer";
import { GeometricRenderData } from "./RenderData/GeometricRenderData";
import { ImageRenderData } from "./RenderData/ImageRenderData";
import { RenderData, RenderDataType } from "./RenderData/RenderData";

interface Config {
    gameRenderer: IContextRenderer;
    uiRenderer: IContextRenderer | null;
    debugRenderer: IContextRenderer | null;
}

export class RenderManager {
    private gameRenderer: IContextRenderer = null;
    private uiRenderer: IContextRenderer = null;
    private debugRenderer: IContextRenderer = null;

    private renderStack: RenderData[] = [];
    private _renderLayers: string[] = [];
    private _worldSpaceViewRect: Rectangle = new Rectangle(0, 0, 0, 0);
    private _viewportRect: Rectangle = new Rectangle(0, 0, 0, 0);

    private cacheRect: Rectangle = new Rectangle(0, 0, 0, 0);

    constructor(
        gameRenderer: IContextRenderer,
        uiRenderer: IContextRenderer = null,
        debugRenderer: IContextRenderer = null
    ) {
        this.gameRenderer = gameRenderer;
        this.uiRenderer = uiRenderer;
        this.debugRenderer = debugRenderer;
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
        if (this.uiRenderer !== null) {
            this.uiRenderer.clearCanvas(null);
        }

        // If debug enabled
        if (this.debugRenderer !== null) {
            this.debugRenderer.clearCanvas(null);
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

            this.setViewportPosition(renderData);

            if (this.uiRenderer !== null && renderData.ui === true) {
                this.uiRenderer.render(renderData);
            } else if (this.debugRenderer !== null && renderData.debug === true) {
                this.debugRenderer.render(renderData);
            } else if (
                renderData.ui !== true &&
                renderData.debug !== true &&
                this.isInsideViewportRect(renderData as ImageRenderData) !== false
            ) {
                this.gameRenderer.render(renderData);
            }
        });

        this.clearRenderStack();
    }

    private setViewportPosition(renderData: RenderData): void {
        if (renderData.ui !== true) {
            renderData.viewportPosition.x = Number(
                (renderData.position.x - this._worldSpaceViewRect.x - this._worldSpaceViewRect.width / 2).toFixed(0)
            );
            renderData.viewportPosition.y = Number(
                (renderData.position.y - this._worldSpaceViewRect.y + this._worldSpaceViewRect.height / 2).toFixed(0)
            );
        } else {
            renderData.viewportPosition = renderData.position;
        }
    }

    private isInsideViewportRect(renderData: ImageRenderData): boolean {
        this.cacheRect.set(
            renderData.viewportPosition.x - renderData.width / 2,
            renderData.viewportPosition.y + renderData.height / 2,
            renderData.width,
            renderData.height
        );

        return this._viewportRect.overlappingRectangle(this.cacheRect);
    }
}
