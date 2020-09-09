import Component from '../Component';
import RenderData from '../Core/Rendering/RenderData';
import {
    PIVOT_CENTER,
    PIVOT_TOP_LEFT,
    PIVOT_TOP_RIGHT,
    PIVOT_BOTTOM_LEFT,
    PIVOT_BOTTOM_RIGHT
} from '../Core/Rendering/RenderPivots';
import Vector2 from '../Helper/Vector2';

export * from '../Core/Rendering/RenderPivots';

export default class SpriteRenderer extends Component {
    sprite = null;
    offsetX = 0;
    offsetY = 0;
    pivot = PIVOT_CENTER;
    flipHorizontal = false;
    flipVertical = false;
    rotation = 0;
    renderData = new RenderData();

    constructor(config) {
        super();

        this.renderData.ui = false;

        // required
        this.sprite = config.sprite;

        // optional
        this.pivot = config.pivot ? config.pivot : this.pivot;
        this.offsetX = config.offsetX ? config.offsetX : this.offsetX;
        this.offsetY = config.offsetY ? config.offsetY : this.offsetY;
        this.smooth = config.smooth ? config.smooth : this.smooth
        this.rotation = config.rotation ? config.rotation : this.rotation;
    }

    start(event) {
        this.update(event);
    }

    update(event) {
        if (this.sprite.loaded === true) {
            this.renderData.layer = this.gameObject.layer;
            this.renderData.image = this.sprite.image;
            this.renderData.width = this.sprite.width * this.gameObject.transform.scale.x;
            this.renderData.height = this.sprite.height * this.gameObject.transform.scale.y;
            this.renderData.slice = this.sprite.slice;
            this.renderData.flipHorizontal = this.flipHorizontal;
            this.renderData.flipVertical = this.flipVertical;
            this.renderData.rotation = this.gameObject.transform.rotation + this.rotation;

            this.calculateRenderPosition(this.renderData);

            event.renderManager.addToRenderStack(this.renderData);
        }
    }

    calculateRenderPosition() {
        this.renderData.position.x = this.gameObject.transform.position.x + this.offsetX;
        this.renderData.position.y = this.gameObject.transform.position.y + this.offsetY;

        switch (this.pivot) {
            case PIVOT_CENTER:
                this.renderData.position.x -= (Math.floor(this.renderData.width / 2));
                this.renderData.position.y += (Math.floor(this.renderData.height / 2));
                break;
            case PIVOT_TOP_RIGHT:
                this.renderData.position.x -= this.renderData.width;
                break;
            case PIVOT_BOTTOM_LEFT:
                this.renderData.position.y += this.renderData.height;
                break;
            case PIVOT_BOTTOM_RIGHT:
                this.renderData.position.x -= this.renderData.width;
                this.renderData.position.y += this.renderData.height;
                break;
            case PIVOT_TOP_LEFT:
                break;
            default:
                break;
        }
    }
}