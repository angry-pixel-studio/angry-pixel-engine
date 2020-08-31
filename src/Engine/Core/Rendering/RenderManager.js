import WorldSapceRenderer from "./WorldSpaceRenderer";

export default class RenderManager {
    game = null;
    renderStack = [];
    worldSpaceRenderer = null;

    constructor(game) {
        this.game = game;
        this.worldSpaceRenderer = new WorldSapceRenderer(this, game.canvasContext);
    }

    addToRenderStack(renderData) {
        this.renderStack.push(renderData);
    }

    getRenderStack() {
        return this.renderStack;
    }

    shiftFromRenderStack() {
        return this.renderData[0] !== undefined
            ? this.renderData.shift()
            : null;
    }

    clearRenderStack() {
        this.renderStack = [];
    }

    renderInWorldSpace(renderLayers, worldSpaceRect) {
        this.worldSpaceRenderer.render(renderLayers, worldSpaceRect);
    }
}