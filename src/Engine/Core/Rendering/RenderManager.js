export default class RenderManager {
    renderStack = [];

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
}