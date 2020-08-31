import { PIVOT_CENTER, PIVOT_TOP_LEFT, PIVOT_TOP_RIGHT, PIVOT_BOTTOM_LEFT, PIVOT_BOTTOM_RIGHT } from "./RenderPivots";

export default class WorldSapceRenderer {
    renderManager = null;
    canvasContext = null;

    constructor(renderManager, canvasContext) {
        this.renderManager = renderManager,
        this.canvasContext = canvasContext
    }

    render(renderLayers, worldSpaceRect) {
        this.renderManager.getRenderStack().forEach(
            renderData => {
                if (renderLayers.includes(renderData.layer) === false && renderData.ui === true) {
                    return;
                }

                if (renderData.image) {
                    this.renderImageInWorldSpace(renderData, worldSpaceRect)
                }
            }
        );
        this.renderManager.clearRenderStack();
    }

    renderImageInWorldSpace(renderData, worldSpaceRect) {
        let renderPosition = this.calcuateWorldSpacePosition(renderData, worldSpaceRect);

        this.canvasContext.save();
        this.canvasContext.translate(renderPosition.x, renderPosition.y)
        this.canvasContext.imageSmoothingEnabled = renderData.smooth;

        this.canvasContext.scale(
            renderData.flipHorizontal ? -1 : 1,
            renderData.flipVertical ? -1 : 1
        );

        if (renderData.slice !== undefined && renderData.slice !== null) {
            this.canvasContext.drawImage(
                renderData.image,
                renderData.slice.x,
                renderData.slice.y,
                renderData.slice.width,
                renderData.slice.height,
                renderData.flipHorizontal ? -renderData.width : 0,
                renderData.flipVertical ? -renderData.height : 0,
                renderData.width,
                renderData.height
            );
        } else {
            this.canvasContext.drawImage(
                renderData.image,
                0,
                0,
                renderData.width,
                renderData.height
            );
        }

        this.canvasContext.restore();
    }

    calcuateWorldSpacePosition(renderData, worldSpaceRect) {
        // PIVOT_TOP_LEFT is the canvas default position
        let renderPosition = {
            x: renderData.position.x - worldSpaceRect.x,
            y: worldSpaceRect.y - renderData.position.y
        };

        switch (renderData.pivot) {
            case PIVOT_CENTER:
                renderPosition.x -= (Math.floor(renderData.width / 2));
                renderPosition.y -= (Math.floor(renderData.height / 2));
                break;
        }

        // offset
        renderPosition.x += renderData.offsetX !== undefined ? renderData.offsetX : 0;
        renderPosition.y += renderData.offsetY !== undefined ? renderData.offsetY : 0;

        return renderPosition;
    }
}