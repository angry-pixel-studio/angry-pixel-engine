import { PIVOT_CENTER } from "./RenderPivots";
import Rectangle from "../../Helper/Rectangle";

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
        if (this.isInsideWorldSpaceRect(worldSpaceRect, renderData) === false) {
            return;
        }
        
        const renderPosition = this.calcuateWorldSpacePosition(renderData, worldSpaceRect);
        const imgPos = {x: 0, y: 0};

        this.canvasContext.save();

        if (renderData.rotation) {
            this.canvasContext.translate(
                renderPosition.x + renderData.width/2,
                renderPosition.y + renderData.height/2
            );
            imgPos.x = -renderData.width/2;
            imgPos.y = -renderData.height/2;

            this.canvasContext.rotate(renderData.rotation * Math.PI / 180);
        } else {
            this.canvasContext.translate(renderPosition.x, renderPosition.y);
            imgPos.x = renderData.flipHorizontal ? -renderData.width : imgPos.x;
            imgPos.y = renderData.flipVertical ? -renderData.height : imgPos.y;
        }

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
                imgPos.x,
                imgPos.y,
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

    isInsideWorldSpaceRect(worldSpaceRect, renderData) {
        const cacheRect = new Rectangle(0, 0, 0, 0);
        
        cacheRect.x = renderData.position.x;
        cacheRect.y = renderData.position.y;
        cacheRect.width = renderData.width;
        cacheRect.height = renderData.height;

        return worldSpaceRect.overlappingRectangle(cacheRect);
    }

    calcuateWorldSpacePosition(renderData, worldSpaceRect) {
        let renderPosition = {
            x: renderData.position.x - worldSpaceRect.x,
            y: worldSpaceRect.y - renderData.position.y
        };

        return renderPosition;
    }
}