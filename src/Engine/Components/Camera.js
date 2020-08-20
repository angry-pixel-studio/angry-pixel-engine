import Component from "../Component";
import { PIVOT_TOP_LEFT, PIVOT_CENTER } from "../Rendering/RenderPivots";

const RECT = { x1: 0, x2: 0, y1: 0, y2: 0 };

export default class Camera extends Component {
    viewportRect = null
    worldCameraRect = { ...RECT };

    constructor(gameObject) {
        super(gameObject);
    }

    gameLoop(event) {
        if (this.viewportRect === null) {
            this.setupViewportRect(event.canvas);
        }

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
                if (renderData.image !== undefined && renderData.image !== null) {
                    this.renderImage(renderData, canvasContext)
                }
            }
        );
        renderManager.clearRenderStack();
    }

    renderImage(renderData, canvasContext) {
        let renderPosition = this.calcuateRendrPosition(renderData);
        
        if (renderData.slice !== undefined && renderData.slice !== null) {
            canvasContext.drawImage(
                renderData.slice.x1,
                renderData.slice.y1,
                renderData.slice.x2,
                renderData.slice.y2,
                renderData.image, // sprite
                renderPosition.x, // viewport position x
                renderPosition.y, // viewport position y
                renderData.width, // sprite width
                renderData.height // sprite height
            );
        } else {
            canvasContext.drawImage(
                renderData.image, // sprite
                renderPosition.x, // viewport position x
                renderPosition.y, // viewport position y
                renderData.width, // sprite width
                renderData.height // sprite height
            );
        }
    }

    calcuateRendrPosition(renderData) {
        // PIVOT_TOP_LEFT is the canvas default position
        let renderPosition = { 
            x: renderData.position.x - this.worldCameraRect.x1 + (renderData.offsetX !== undefined ? renderData.offsetX : 0),
            y: this.worldCameraRect.y1 - renderData.position.y + (renderData.offsetY !== undefined ? renderData.offsetY : 0)
        };
        
        switch (renderData.pivot) {
            case PIVOT_CENTER:
                renderPosition.x -= (Math.floor(renderData.width / 2));
                renderPosition.y -= (Math.floor(renderData.height / 2));
                break;
        }

        return renderPosition;
    }
}
