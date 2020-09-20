import GameObject, { LAYER_DEFAULT } from "../../Engine/GameObject";
import SpriteRenderer from '../../Engine/Components/Renderer/SpriteRenderer';
import Sprite from "../../Engine/Sprite";
import Animator from "../../Engine/Components/Animator";
import { PlayerWalking } from "../Animations/PlayerTopAnimations";
import Rectangle from "../../Engine/Helper/Rectangle";
import Vector2 from "../../Engine/Helper/Vector2";
import Movements from "../Components/Player/Movements";
import MovementsArrows from "../Components/Player/MovementsArrows";
import Weapon from "../Components/Player/Weapon";
import { LAYER_PLAYER } from "../Config/renderLayers";
import RenderData, { GEOMETRIC_RECTANGLE } from "../../Engine/Core/Rendering/RenderData";

const SPRITE_PATH = 'image/demo/player-top-down.png';

export const TAG_PLAYER = 'Player';

export default class PlayerTop extends GameObject {
    collider = new Rectangle(0, 0, 32, 32);
    renderData = new RenderData();

    constructor() {
        super();

        this.tag = TAG_PLAYER;
        this.layer = LAYER_PLAYER;
        this.transform.position.x = 0;
        this.transform.position.y = 0;

        const image = new Image();
        image.src = SPRITE_PATH;
        
        this.addComponent(() => new SpriteRenderer({
            sprite: new Sprite({
                image: image,
                slice: new Rectangle(0, 0, 32, 32),
                scale: new Vector2(2, 2),
                smooth: false
            }),
            rotation: 90
        }), 'SpriteRenderer');

        this.addComponent(() => new Animator({
            spriteRenderer: this.getComponent('SpriteRenderer')
        }), 'Animator');
        this.getComponent('Animator').addAnimation('PlayerWalking', PlayerWalking);

        this.addComponent(() => new Movements(), 'Movements');
        //this.addComponent(() => new MovementsArrows(), 'Movements');
        this.addComponent(() => new Weapon(), 'Weapon');
    }

    update(event) {
        this.updateCollidersPosition();
        //this.drawCollider(event.renderManager);
    }

    updateCollidersPosition() {
        this.collider.setPosition(
            this.transform.position.x - this.collider.width / 2,
            this.transform.position.y + this.collider.height / 2
        );
    }

    drawCollider(renderManager) {
        this.renderData.position = this.collider.position;
        this.renderData.layer = LAYER_DEFAULT;
        this.renderData.geometric = this.collider;
        this.renderData.geometricType = GEOMETRIC_RECTANGLE;
        this.renderData.color = '#7FE900';

        renderManager.addToRenderStack(this.renderData);
    }
}