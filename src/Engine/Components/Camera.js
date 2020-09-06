import Component from "../Component";
import { PIVOT_TOP_LEFT, PIVOT_CENTER } from "../Core/Rendering/RenderPivots";
import { LAYER_DEFAULT } from "../GameObject";
import Rectangle from "../Helper/Rectangle";
import Transform from "./Transform";

const RECT = { x1: 0, x2: 0, y1: 0, y2: 0 };

export default class Camera extends Component {
    viewportRect = null;
    worldSpaceRect = null;
    renderLayers = [LAYER_DEFAULT]

    zoom = 1;

    start(event) {
        this.worldSpaceRect = new Rectangle(0, 0, 0, 0);
        this.setupViewportRect(event.canvas);
    }

    setupViewportRect(canvas) {
        this.viewportRect = new Rectangle(0, 0, canvas.width, canvas.height);
    }

    update(event) {
        this.updateWorldSpaceRect();
        event.renderManager.renderInWorldSpace(this.renderLayers, this.worldSpaceRect);
    }
    
    updateWorldSpaceRect() {
        const vpHalfWidth = (this.viewportRect.width - this.viewportRect.x) / 2;
        const vpHalfHeight = (this.viewportRect.height - this.viewportRect.y) / 2;
        const position = this.gameObject.transform.position;

        this.worldSpaceRect.x = position.x - vpHalfWidth;
        this.worldSpaceRect.y = position.y + vpHalfHeight;
        this.worldSpaceRect.width = position.x + vpHalfWidth;
        this.worldSpaceRect.height = position.y - vpHalfHeight;
    }

    addLayerToRender(layer) {
        this.renderLayers.push(layer);
    }
}
