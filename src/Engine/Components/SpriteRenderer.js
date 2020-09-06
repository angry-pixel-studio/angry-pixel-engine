import Component from '../Component';
import RenderData from '../Core/Rendering/RenderData';
import { PIVOT_CENTER } from '../Core/Rendering/RenderPivots';
import Vector2 from '../Helper/Vector2';

export * from '../Core/Rendering/RenderPivots';

export default class SpriteRenderer extends Component {
    sprite = null;
    offsetX = 0;
    offsetY = 0;
    pivot = PIVOT_CENTER;
    flipHorizontal = false;
    flipVertical = false;
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
            this.renderData.pivot = this.pivot;
            this.renderData.position.x = this.gameObject.transform.position.x;
            this.renderData.position.y = this.gameObject.transform.position.y;
            this.renderData.offsetX = this.offsetX;
            this.renderData.offsetY = this.offsetY;
            this.renderData.flipHorizontal = this.flipHorizontal;
            this.renderData.flipVertical = this.flipVertical;

            event.renderManager.addToRenderStack(this.renderData);
        }
    }
}