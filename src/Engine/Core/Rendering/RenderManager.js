import WorldSapceRenderer from "./WorldSpaceRenderer";
import RenderData from "./RenderData";
import Game from "../../Game";

/**
 * @property {Game} game
 * @property {Array.<RenderData>} renderData
 * @property {WorldSapceRenderer} worldSpaceRenderer
 */
export default class RenderManager {
    game = null;
    renderStack = [];
    worldSpaceRenderer = null;

    /**
     * @param {Game} game 
     */
    constructor(game) {
        this.game = game;
        this.worldSpaceRenderer = new WorldSapceRenderer(this, game.canvasContext);
    }

    /**
     * @param {RenderData} renderData 
     */
    addToRenderStack(renderData) {
        this.renderStack.push(renderData);
    }

    /**
     * @returns {Array.<RenderData>}
     */
    getRenderStack() {
        return this.renderStack;
    }

    /** 
     * @returns {boolean}
     */
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