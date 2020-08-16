import Component from '../Component';

export default class SpriteRenderer extends Component {
    sprite = null;
    spriteLoaded = false;
    width = null;
    height = null;

    constructor(gameObject, config) {
        super(gameObject);

        this.gameObject = gameObject;
        this.sprite = config.sprite;

        this.width = config.width !== undefined ? config.width : null;
        this.height = config.height !== undefined ? config.height : null;

        this.sprite.onload = () => {
            this.width = this.width === null ? this.sprite.naturalWidth : this.width;
            this.height = this.height === null ? this.sprite.naturalHeight : this.height;
            this.spriteLoaded = true;
        }
    }
}