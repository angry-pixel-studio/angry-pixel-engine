import GameObject from '../../Engine/GameObject';
import SpriteRenderer from '../../Engine/Components/SpriteRenderer';

export default class Circuit extends GameObject {
    width = 1600;
    height = 800;

    constructor(spritePath) {
        super();
        
        const sprite = new Image();
        sprite.src = spritePath;

        this.transform.position.x = -800;
        this.transform.position.y = 400;

        this.addComponent(() => new SpriteRenderer(this, {
            sprite: sprite,
            width: this.width,
            height: this.height
        }));
    }
}