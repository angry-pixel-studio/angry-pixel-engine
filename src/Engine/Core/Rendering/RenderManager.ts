import RenderData from "./RenderData";
import Rectangle from "../../Helper/Rectangle";
import ContextRendererInterface from "./ContextRendererInterface";

export default class RenderManager {
    private renderStack: Array<RenderData> = [];
    private contextRenderer: ContextRendererInterface = null;

    constructor(contextRenderer: ContextRendererInterface) {
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

    public clearCanvas(color: string|null = null) {
        this.contextRenderer.clearCanvas(color);
    }

    public render(renderLayers: Array<string>, worldSpaceViewRect: Rectangle) {
        this.renderStack.forEach(renderData => {
            if (renderLayers.includes(renderData.layer) === false) {
                return;
            }

            if (renderData.ui === false) {
                this.contextRenderer.renderInWorldSpace(renderData, worldSpaceViewRect);
            }
        });

        this.clearRenderStack();
    }
}