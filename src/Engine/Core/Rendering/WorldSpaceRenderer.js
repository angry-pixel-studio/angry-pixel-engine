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
                    this.renderImageInWorldSpace(renderData, worldSpaceRect);
                }

                if (renderData.text) {
                    this.renderTextInWorldSpace(renderData, worldSpaceRect);
                }
            }
        );
        this.renderManager.clearRenderStack();
    }

    renderImageInWorldSpace(renderData, worldSpaceRect) {
        //console.log(renderData.position);
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

    renderTextInWorldSpace(renderData, worldSpaceRect) {
        let renderPosition = this.calcuateWorldSpacePosition(renderData, worldSpaceRect);

        this.canvasContext.save();
       
        let font = [
            renderData.bold ? 'bold' : '',
            renderData.italic ? 'italic' : '',
            renderData.textSize + 'px',
            renderData.font
        ];

        this.canvasContext.font = font.join(' ');
        this.canvasContext.fillStyle = renderData.color;

        if (Array.isArray(renderData.text)) {
            let first = true;    
            let lineSeparation = 0;

            renderData
                .text
                .forEach(text => {
                    lineSeparation = first 
                        ? lineSeparation
                        : (renderData.lineSeparation + renderData.textSize);

                    this.canvasContext
                        .fillText(
                            text,
                            renderPosition.x,
                            renderPosition.y + lineSeparation
                        );
                    
                    first = false;
                });
        } else {
            this.canvasContext.fillText(renderData.text, renderPosition.x, renderPosition.y);
        }
        
        this.canvasContext.restore();
    }

    calcuateWorldSpacePosition(renderData, worldSpaceRect) {
        // PIVOT_TOP_LEFT is the canvas default position
        
        let renderPosition = {
            x: renderData.position.x - worldSpaceRect.x,
            y: worldSpaceRect.y - renderData.position.y
        };

        // offset
        renderPosition.x += renderData.offsetX !== undefined ? renderData.offsetX : 0;
        renderPosition.y += renderData.offsetY !== undefined ? renderData.offsetY : 0;

        if (renderData.pivot === null) {
            return renderPosition;
        }

        switch (renderData.pivot) {
            case PIVOT_CENTER:
                renderPosition.x -= (Math.floor(renderData.width / 2));
                renderPosition.y -= (Math.floor(renderData.height / 2));
                break;
        }

        return renderPosition;
    }
}