import GameObject from '../../Engine/GameObject';
import SpriteRenderer from '../../Engine/Components/SpriteRenderer';
import Sprite from '../../Engine/Sprite';

export default class Circuit extends GameObject {
    width = 900;
    height = 502;
    spots = [];

    constructor(spritePath, spots) {
        super();
        
        this.spots = spots;

        const image = new Image();
        image.src = spritePath;

        this.transform.position.x = 0;
        this.transform.position.y = 0;

        this.addComponent(() => new SpriteRenderer(this, {
            sprite: new Sprite({
                image: image,
                width: this.width,
                height: this.height,
            })
        }));
    }
}