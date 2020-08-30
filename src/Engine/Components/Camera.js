import Component from "../Component";
import { PIVOT_TOP_LEFT, PIVOT_CENTER } from "../Rendering/RenderPivots";

const RECT = { x1: 0, x2: 0, y1: 0, y2: 0 };

export default class Camera extends Component {
    viewportRect = null;
    worldCameraRect = { ...RECT };
    size = 2;

    constructor(gameObject) {
        super(gameObject);
    }

    start(event) {
        this.setupViewportRect(event.canvas);
    }

    update(event) {

        this.updateWorldCameraRect();
        this.render(event.canvasContext, event.renderManager);
    }

    setupViewportRect(canvas) {
        this.viewportRect = { ...RECT }
        this.viewportRect.x1 = 0;
        this.viewportRect.x2 = canvas.width;
        this.viewportRect.y1 = 0;
        this.viewportRect.y2 = canvas.height;
    }

    updateWorldCameraRect() {
        const vpHalfWidth = (this.viewportRect.x2 - this.viewportRect.x1) / 2;
        const vpHalfHeight = (this.viewportRect.y2 - this.viewportRect.y1) / 2;
        const position = this.gameObject.transform.position;

        this.worldCameraRect.x1 = position.x - vpHalfWidth;
        this.worldCameraRect.x2 = position.x + vpHalfWidth;
        this.worldCameraRect.y1 = position.y + vpHalfHeight;
        this.worldCameraRect.y2 = position.y - vpHalfHeight;
    }

    render(canvasContext, renderManager) {
        renderManager.getRenderStack().forEach(
            renderData => {
                if (renderData.image && renderData.ui != true) {
                    this.renderImageInWorldSpace(renderData, canvasContext)
                }
            }
        );
        renderManager.clearRenderStack();
    }

    renderImageInWorldSpace(renderData, canvasContext) {
        let renderPosition = this.calcuateWorldSpacePosition(renderData);
        
        canvasContext.save();
        canvasContext.translate(renderPosition.x, renderPosition.y)
        canvasContext.imageSmoothingEnabled = renderData.smooth;

        canvasContext.scale(
            renderData.flipHorizontal ? -1 : 1, 
            renderData.flipVertical ? -1 : 1
        );
        
        if (renderData.slice !== undefined && renderData.slice !== null) {
            canvasContext.drawImage(
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
            canvasContext.drawImage(
                renderData.image,
                0,
                0,
                renderData.width,
                renderData.height
            );
        }

        canvasContext.restore();
    }

    calcuateWorldSpacePosition(renderData) {
        // PIVOT_TOP_LEFT is the canvas default position
        let renderPosition = { 
            x: renderData.position.x - this.worldCameraRect.x1,
            y: this.worldCameraRect.y1 - renderData.position.y
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
