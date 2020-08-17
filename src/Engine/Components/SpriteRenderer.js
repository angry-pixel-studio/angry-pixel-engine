import Component from '../Component';

export default class SpriteRenderer extends Component {
    sprite = null;
    spriteLoaded = false;
    width = null;
    height = null;
    pivot = 'center';

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
}