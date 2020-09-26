import RenderData from "./RenderData";

import Rectangle from "../../Helper/Rectangle";
import IContextRenderer from "./IContextRenderer";

export default class RenderManager {
    private renderStack: Array<RenderData> = [];
    private contextRenderer: IContextRenderer = null;

    constructor(contextRenderer: IContextRenderer) {
        this.contextRenderer = contextRenderer;
    }

    public addToRenderStack(renderData: RenderData): void {
        this.renderStack.push(renderData);
    }

    public getRenderStack(): Array<RenderData> {
        return this.renderStack;
    }

    public shiftFromRenderStack(): RenderData {
        return this.renderStack[0] !== undefined
            ? this.renderStack.shift()
            : null;
    }

    public clearRenderStack() {
        this.renderStack = [];
    }

    public clearCanvas(color: string | null = null) {
        this.contextRenderer.clearCanvas(color);
    }

    public render(
        renderLayers: Array<string>,
        worldSpaceViewRect: Rectangle,
        viewportRect: Rectangle
    ) {
        this.renderStack.forEach((renderData) => {
            if (renderLayers.includes(renderData.layer) === false) {
                return;
            }

            this.contextRenderer.render(
                renderData,
                worldSpaceViewRect,
                viewportRect
            );
        });

        this.clearRenderStack();
    }
}
