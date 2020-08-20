import GameObject from '../../Engine/GameObject';
import SpriteRenderer from '../../Engine/Components/SpriteRenderer';
import { PIVOT_TOP_LEFT } from '../../Engine/Rendering/RenderPivots';

export default class Circuit extends GameObject {
    width = 1600;
    height = 800;
    spots = [];

    constructor(spritePath, spots) {
        super();
        
        this.spots = spots;

        const sprite = new Image();
        sprite.src = spritePath;

        this.transform.position.x = -800;
        this.transform.position.y = 400;

        this.addComponent(() => new SpriteRenderer(this, {
            sprite: sprite,
            width: this.width,
            height: this.height,
            pivot: PIVOT_TOP_LEFT,
        }));
    }
}