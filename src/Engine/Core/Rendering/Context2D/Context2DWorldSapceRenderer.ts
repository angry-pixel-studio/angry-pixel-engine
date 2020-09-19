import Rectangle from "../../../Helper/Rectangle";
import Vector2 from "../../../Helper/Vector2";
import RenderData, { GEOMETRIC_RECTANGLE } from "../RenderData";
import WorldSpaceRendererInterface from "../WorldSpaceRendererInterface";

export default class Context2DWorldSapceRenderer implements WorldSpaceRendererInterface {
    private canvasContext: CanvasRenderingContext2D = null;
    private renderPosition = new Vector2(0, 0);
    private imagePosition = new Vector2(0, 0);

    constructor(canvas: HTMLCanvasElement) {
        this.canvasContext = canvas.getContext('2d');
    }

    public renderImage(renderData: RenderData, worldSpaceViewRect: Rectangle): void {
        if (this.isInsideWorldSpaceRect(renderData, worldSpaceViewRect) === false) {
            return;
        }
        
        this.updateRenderPosition(renderData, worldSpaceViewRect);
        this.imagePosition.set(0, 0);
        this.canvasContext.save();

        if (renderData.rotation) {
            this.canvasContext.translate(
                this.renderPosition.x + renderData.width/2,
                this.renderPosition.y + renderData.height/2
            );
            this.imagePosition.set(-renderData.width/2, -renderData.height/2);
            this.canvasContext.rotate(renderData.rotation * Math.PI / 180);
        } else {
            this.canvasContext.translate(this.renderPosition.x, this.renderPosition.y);
            this.imagePosition.x = renderData.flipHorizontal ? -renderData.width : this.imagePosition.x;
            this.imagePosition.y = renderData.flipVertical ? -renderData.height : this.imagePosition.y;
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
                this.imagePosition.x,
                this.imagePosition.y,
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

    public renderText(renderData: RenderData, worldSpaceViewRect: Rectangle): void {
        this.updateRenderPosition(renderData, worldSpaceViewRect);

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
                            this.renderPosition.x,
                            this.renderPosition.y + lineSeparation
                        );
                    
                    first = false;
                });
        } else {
            this.canvasContext.fillText(renderData.text, this.renderPosition.x, this.renderPosition.y);
        }
        
        this.canvasContext.restore();
    }

    public renderGeometric(renderData: RenderData, worldSpaceViewRect: Rectangle): void {
        this.canvasContext.save();

        this.updateRenderPosition(renderData, worldSpaceViewRect);

        switch (renderData.geometricType) {
            case GEOMETRIC_RECTANGLE:
                this.canvasContext.strokeStyle = renderData.color;
                this.canvasContext.strokeRect(
                    this.renderPosition.x,
                    this.renderPosition.y,
                    renderData.geometric.width,
                    renderData.geometric.height,
                );
                break;
        }

        this.canvasContext.restore();
    }

    private isInsideWorldSpaceRect(renderData: RenderData, worldSpaceViewRect: Rectangle): boolean {
        const rect = new Rectangle(0, 0, 0, 0);
        
        rect.x = renderData.position.x;
        rect.y = renderData.position.y;
        rect.width = renderData.width;
        rect.height = renderData.height;

        return worldSpaceViewRect.overlappingRectangle(rect);
    }

    private updateRenderPosition(renderData: RenderData, worldSpaceViewRect: Rectangle) {
        this.renderPosition.x = Number((renderData.position.x - worldSpaceViewRect.x).toFixed(0));
        this.renderPosition.y = Number((worldSpaceViewRect.y - renderData.position.y).toFixed(0));
    }
}