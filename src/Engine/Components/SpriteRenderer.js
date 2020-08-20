import Component from '../Component';
import { PIVOT_CENTER } from '../Rendering/RenderPivots';

export default class SpriteRenderer extends Component {
    sprite = null;
    spriteLoaded = false;
    width = null;
    height = null;
    ofssetX = 0;
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
        this.width = config.width !== undefined ? config.width : this.width;
        this.height = config.height !== undefined ? config.height : this.height;
        this.pivot = config.pivot !== undefined ? config.pivot : this.pivot;
        this.offsetX = config.offsetX !== undefined ? config.offsetX : this.offsetX;
        this.offsetY = config.offsetY !== undefined ? config.offsetY : this.offsetY;

        this.sprite.onload = () => {
            this.width = this.width === null ? this.sprite.naturalWidth : this.width;
            this.height = this.height === null ? this.sprite.naturalHeight : this.height;
            this.spriteLoaded = true;
        }
    }

    update(event) {
        if (this.spriteLoaded === true) {
            event.renderManager.addToRenderStack({
                image: this.sprite,
                pivot: this.pivot,
                position: this.gameObject.transform.position,
                width: this.width,
                height: this.height,
                offsetX: this.offsetX,
                offsetY: this.offsetY,
                flipHorizontal: this.flipHorizontal,
                flipVertical: this.flipVertical
            });
        }
    }
}