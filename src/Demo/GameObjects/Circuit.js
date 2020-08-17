import GameObject from '../../Engine/GameObject';
import SpriteRenderer from '../../Engine/Components/SpriteRenderer';

const WIDTH = 1600;
const HEIGHT = 800;

export default class Circuit extends GameObject {
    constructor(spritePath) {
        super();
        
        let sprite = new Image();
        sprite.src = spritePath;

        this.transform.position.x = -400;
        this.transform.position.y = 200;

        this.addComponent(() => new SpriteRenderer(this, {
            sprite: sprite,
            width: WIDTH,
            height: HEIGHT
        }));
    }
}