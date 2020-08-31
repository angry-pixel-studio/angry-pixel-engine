import Component from '../Component';
import { PIVOT_CENTER } from '../Core/Rendering/RenderPivots';

export * from '../Core/Rendering/RenderPivots'

export default class SpriteRenderer extends Component {
    sprite = null;
    offsetX = 0;
    offsetY = 0;
    pivot = PIVOT_CENTER;
    flipHorizontal = false;
    flipVertical = false;

    constructor(gameObject, config) {
        super(gameObject);

        // required
        this.gameObject = gameObject;
        this.sprite = config.sprite;

        // optional
        this.pivot = config.pivot ? config.pivot : this.pivot;
        this.offsetX = config.offsetX ? config.offsetX : this.offsetX;
        this.offsetY = config.offsetY ? config.offsetY : this.offsetY;
        this.smooth = config.smooth ? config.smooth : this.smooth
    }

    update(event) {
        if (this.sprite.loaded === true) {
            event.renderManager.addToRenderStack({
                ui: false,
                layer: this.gameObject.layer,
                image: this.sprite.image,
                width: this.sprite.width * this.gameObject.transform.scale.x,
                height: this.sprite.height * this.gameObject.transform.scale.y,
                slice: this.sprite.slice,
                pivot: this.pivot,
                position: this.gameObject.transform.position,
                offsetX: this.offsetX,
                offsetY: this.offsetY,
                flipHorizontal: this.flipHorizontal,
                flipVertical: this.flipVertical
            });
        }
    }
}