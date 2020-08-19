import Component from '../Component';

export const
    PIVOT_CENTER = 'center',
    PIVOT_TOP_LEFT = 'topLeft',
    PIVOT_TOP_RIGHT = 'topRight',
    PIVOT_BOTTOM_LEFT = 'bottomLeft',
    PIVOT_BOTTOM_RIGHT = 'bottomRight'
;

export default class SpriteRenderer extends Component {
    sprite = null;
    spriteLoaded = false;
    width = null;
    height = null;
    pivot = PIVOT_CENTER;

    constructor(gameObject, config) {
        super(gameObject);

        // required
        this.gameObject = gameObject;
        this.sprite = config.sprite;

        // optional
        this.width = config.width !== undefined ? config.width : this.width;
        this.height = config.height !== undefined ? config.height : this.height;
        this.pivot = config.pivot !== undefined ? config.pivot : this.pivot;

        this.sprite.onload = () => {
            this.width = this.width === null ? this.sprite.naturalWidth : this.width;
            this.height = this.height === null ? this.sprite.naturalHeight : this.height;
            this.spriteLoaded = true;
        }
    }

    gameLoop(event) {
        if (this.spriteLoaded === true) {
            event.renderManager.addToRenderStack({
                image: this.sprite,
                position: this.gameObject.transform.position,
                width: this.width,
                height: this.height
            });
        }
    }
}