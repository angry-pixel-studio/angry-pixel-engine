import WorldSapceRenderer from "./WorldSpaceRenderer";
import RenderData from "./RenderData";
import Game from "../../Game";
import Rectangle from "../../Helper/Rectangle";

export default class RenderManager {
    private renderStack: Array<RenderData> = [];
    private worldSpaceRenderer: WorldSapceRenderer = null;

    constructor(game: Game) {
        this.worldSpaceRenderer = new WorldSapceRenderer(this, game.canvasContext);
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

    public renderInWorldSpace(renderLayers: Array<string>, worldSpaceRect: Rectangle) {
        this.worldSpaceRenderer.render(renderLayers, worldSpaceRect);
    }
}