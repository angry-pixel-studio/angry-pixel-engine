import GameObject from '../../Engine/GameObject';
import { SPRITE_RENDERER } from '../../Engine/Component';
import SpriteRenderer from '../../Engine/Components/SpriteRenderer';

const WIDTH = 1600;
const HEIGHT = 800;

export default class Circuit extends GameObject {
    width = 0;
    height = 0;
    sprite = new Image();

    constructor(spritePath) {
        super();
        
        this.sprite.src = spritePath;

        this.components[SPRITE_RENDERER] = new SpriteRenderer(this, {sprite: this.sprite,
            width: WIDTH,
            height: HEIGHT
        });
    }
}