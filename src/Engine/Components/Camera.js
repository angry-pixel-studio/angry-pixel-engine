import Component from "../Component";
import SpriteRenderer from "./SpriteRenderer";

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
        if (renderData.slice !== undefined && renderData.slice !== null) {
            canvasContext.drawImage(
                renderData.slice.x1,
                renderData.slice.y1,
                renderData.slice.x2,
                renderData.slice.y2,
                renderData.image, // sprite
                renderData.position.x - this.worldCameraRect.x1, // viewport position x
                this.worldCameraRect.y1 - renderData.position.y, // viewport position y
                renderData.width, // sprite width
                renderData.height // sprite height
            );
        } else {
            canvasContext.drawImage(
                renderData.image, // sprite
                renderData.position.x - this.worldCameraRect.x1, // viewport position x
                this.worldCameraRect.y1 - renderData.position.y, // viewport position y
                renderData.width, // sprite width
                renderData.height // sprite height
            );
        }
    }
}
