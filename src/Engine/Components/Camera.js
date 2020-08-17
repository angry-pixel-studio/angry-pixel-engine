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
        this.renderGameObjects(event.canvasContext);
    }

    setupViewportRect(canvas) {
        this.viewportRect = { ...RECT }
        this.viewportRect.x1 = 0;
        this.viewportRect.x2 = canvas.width;
        this.viewportRect.y1 = 0;
        this.viewportRect.y2 = canvas.height;
    }

    updateWorldCameraRect() {
        let vpHalfWidth = (this.viewportRect.x2 - this.viewportRect.x1) / 2;
        let vpHalfHeight = (this.viewportRect.y2 - this.viewportRect.y1) / 2;
        let position = this.gameObject.transform.position;

        this.worldCameraRect.x1 = position.x - vpHalfWidth;
        this.worldCameraRect.x2 = position.x + vpHalfWidth;
        this.worldCameraRect.y1 = position.y + vpHalfHeight;
        this.worldCameraRect.y2 = position.y - vpHalfHeight;
    }

    renderGameObjects(canvasContext) {
        this.gameObject.scene
            .getGameObjects()
            .forEach(object => {
                if (object.hasComponent(SpriteRenderer.name)) {
                    this.renderGameObject(object, canvasContext);
                }
            });
    }

    renderGameObject(gameObject, canvasContext) {
        let spriteRenderer = gameObject.getComponent(SpriteRenderer.name);
        let viewportPosition= this.getGameObjectViewportPosition(gameObject);

        if (spriteRenderer.spriteLoaded === true) {
            canvasContext.drawImage(
                spriteRenderer.sprite,
                viewportPosition.x,
                viewportPosition.y,
                spriteRenderer.width,
                spriteRenderer.height
            );
        }
    }

    getGameObjectViewportPosition(gameObject) {
        let position = gameObject.transform.position;

        return {
            x: position.x - this.worldCameraRect.x1,
            y: this.worldCameraRect.y1 - position.y
        }
    }
}
