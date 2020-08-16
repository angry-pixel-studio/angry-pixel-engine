import Component from "../Component";
import SpriteRenderer from "./SpriteRenderer";

export default class Camera extends Component {
    constructor(gameObject) {
        super(gameObject);
    }

    gameLoop(event) {
        this.renderGameObjects(event.canvasContext);
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

        if (spriteRenderer.spriteLoaded === true) {
            canvasContext.drawImage(
                spriteRenderer.sprite,
                gameObject.transform.position.x,
                gameObject.transform.position.y,
                spriteRenderer.width,
                spriteRenderer.height
            );
        }
    }
}
