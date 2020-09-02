import GameObject from "../../Engine/GameObject";
import SpriteRenderer from "../../Engine/Components/SpriteRenderer";
import Sprite from "../../Engine/Sprite";

export const LAYER_FOREGROUND = 'Foreground';
const SPRITE_PATH = 'image/demo/testmap.png';

export default class Foreground extends GameObject {
    width = 0;
    height = 0;
    spriteRenderer = null;

    constructor() {
        super();

        this.layer = LAYER_FOREGROUND;
        this.transform.position.x = 0;
        this.transform.position.y = 0;

        this.transform.scale.x = 3;
        this.transform.scale.y = 3;

        const image = new Image();
        image.src = SPRITE_PATH;
        
        this.addComponent(() => new SpriteRenderer(this, {
            sprite: new Sprite({
                image: image,
                smooth: false
            }),
        }));

        this.spriteRenderer = this.getComponent(SpriteRenderer.name);
    }

    update() {
        if (this.spriteRenderer.sprite.loaded && this.width === 0) {
            this.width = this.spriteRenderer.sprite.width * this.transform.scale.x;
            this.height = this.spriteRenderer.sprite.height * this.transform.scale.y;

            console.log(this.width);
            console.log(this.height);
        }
    }
}