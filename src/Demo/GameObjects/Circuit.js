import GameObject from '../../Engine/GameObject';
import { SPRITE_RENDERER } from '../../Engine/Component';
import SpriteRenderer from '../../Engine/Components/SpriteRenderer';

const WIDTH = 800;
const HEIGHT = 400;

export default class Circuit extends GameObject {
    width = 0;
    height = 0;
    sprite = new Image();
    spots = [];

    constructor(spritePath, spots) {
        super();
        
        this.sprite.src = spritePath;
        this.spots = spots;

        this.components[SPRITE_RENDERER] = new SpriteRenderer(this, {sprite: this.sprite,
            width: WIDTH,
            height: HEIGHT
        });
    }
}