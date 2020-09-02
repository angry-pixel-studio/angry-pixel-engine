import Component from '../Component';
import RenderData from '../Core/Rendering/RenderData';
import { PIVOT_CENTER } from '../Core/Rendering/RenderPivots';

export * from '../Core/Rendering/RenderPivots';

export default class SpriteRenderer extends Component {
    sprite = null;
    offsetX = 0;
    offsetY = 0;
    pivot = PIVOT_CENTER;
    flipHorizontal = false;
    flipVertical = false;
    renderData = null;

    constructor(gameObject, config) {
        super(gameObject);

        this.renderData = new RenderData();
        this.renderData.ui = false;
        this.renderData.layer = this.gameObject.layer;

        // required
        this.sprite = config.sprite;

        // optional
        this.pivot = config.pivot ? config.pivot : this.pivot;
        this.offsetX = config.offsetX ? config.offsetX : this.offsetX;
        this.offsetY = config.offsetY ? config.offsetY : this.offsetY;
        this.smooth = config.smooth ? config.smooth : this.smooth
    }


    update(event) {
        if (this.sprite.loaded === true) {
            this.renderData.image = this.sprite.image;
            this.renderData.width = this.sprite.width * this.gameObject.transform.scale.x;
            this.renderData.height = this.sprite.height * this.gameObject.transform.scale.y;
            this.renderData.slice = this.sprite.slice;
            this.renderData.pivot = this.pivot;
            this.renderData.position = this.gameObject.transform.position;
            this.renderData.offsetX = this.offsetX;
            this.renderData.offsetY = this.offsetY;
            this.renderData.flipHorizontal = this.flipHorizontal;
            this.renderData.flipVertical = this.flipVertical;

            event.renderManager.addToRenderStack(this.renderData);
        }
    }
}