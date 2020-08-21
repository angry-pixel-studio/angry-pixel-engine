import GameObject from '../../Engine/GameObject';
import SpriteRenderer from '../../Engine/Components/SpriteRenderer';
import { PIVOT_CENTER } from '../../Engine/Rendering/RenderPivots';

export default class Circuit extends GameObject {
    width = 900;
    height = 502;
    spots = [];

    constructor(spritePath, spots) {
        super();
        
        this.spots = spots;

        const sprite = new Image();
        sprite.src = spritePath;

        this.transform.position.x = 0;
        this.transform.position.y = 0;

        this.addComponent(() => new SpriteRenderer(this, {
            sprite: sprite,
            width: this.width,
            height: this.height,
            pivot: PIVOT_CENTER,
        }));
    }
}