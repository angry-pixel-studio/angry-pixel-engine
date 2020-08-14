import Component from '../Component';

export default class SpriteRenderer extends Component {
    sprite = null;
    loaded = false;
    width = null;
    height = null;
    gameObject = null;

    constructor (gameObject, config) {
        super(gameObject);

        this.gameObject = gameObject;
        this.sprite = config.sprite;

        this.width = config.width !== undefined ? config.width : null;
        this.height = config.height !== undefined ? config.height : null;
        
        this.sprite.onload = () => {
            this.width = this.width === null ? this.sprite.naturalWidth : this.width;
            this.height = this.height === null ? this.sprite.naturalHeight : this.height;
            this.loaded = true;
        }
    }

    gameLoop = e => {
        if (this.loaded === true) {
            let position = this.gameObject.transform.position;
            e.canvasContext.drawImage(this.sprite, position.x, position.y, this.width, this.height);
        }
    };
}