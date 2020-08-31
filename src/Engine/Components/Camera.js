import Component from "../Component";
import { PIVOT_TOP_LEFT, PIVOT_CENTER } from "../Core/Rendering/RenderPivots";
import { LAYER_DEFAULT } from "../GameObject";
import Rectangle from "../Helper/Rectangle";
import Transform from "./Transform";

const RECT = { x1: 0, x2: 0, y1: 0, y2: 0 };

export default class Camera extends Component {
    viewportRect = null;
    worldCameraRect = null;
    renderLayers = [LAYER_DEFAULT]

    // size = 1; to implement

    constructor(gameObject) {
        super(gameObject);

        if (gameObject.hasComponent(Transform.name) === false) {
            throw 'Transform is required in the GameObject'
        }
    }

    start(event) {
        this.worldCameraRect = new Rectangle(0, 0, 0, 0);
        this.setupViewportRect(event.canvas);
    }

    update(event) {
        this.updateWorldCameraRect();
        this.render(event.canvasContext, event.renderManager);
    }

    setupViewportRect(canvas) {
        this.viewportRect = new Rectangle(0, 0, canvas.width, canvas.height);
    }

    updateWorldCameraRect() {
        const vpHalfWidth = (this.viewportRect.width - this.viewportRect.x) / 2;
        const vpHalfHeight = (this.viewportRect.height - this.viewportRect.y) / 2;
        const position = this.gameObject.transform.position;

        this.worldCameraRect.x = position.x - vpHalfWidth;
        this.worldCameraRect.y = position.y + vpHalfHeight;
        this.worldCameraRect.width = position.x + vpHalfWidth;
        this.worldCameraRect.height = position.y - vpHalfHeight;
    }

    addLayerToRender(layer) {
        this.renderLayers.push(layer);
    }

    render(canvasContext, renderManager) {
        renderManager.getRenderStack().forEach(
            renderData => {
                if (this.renderLayers.includes(renderData.layer) === false) {
                    return;
                }

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
            x: renderData.position.x - this.worldCameraRect.x,
            y: this.worldCameraRect.y - renderData.position.y
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
