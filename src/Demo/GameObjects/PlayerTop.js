import AssetManager from "../../Engine/AssetManager";
import GameObject, { LAYER_DEFAULT } from "../../Engine/GameObject";
import SpriteRenderer from '../../Engine/Components/Renderer/SpriteRenderer';
import RectangleCollider from '../../Engine/Components/Colliders/RectangleCollider';
import Sprite from "../../Engine/Sprite";
import Animator from "../../Engine/Components/Animator";
import { PlayerWalking } from "../Animations/PlayerTopAnimations";
import Rectangle from "../../Engine/Helper/Rectangle";
import Vector2 from "../../Engine/Helper/Vector2";
import Movements from "../Components/Player/Movements";
import Weapon from "../Components/Player/Weapon";
import { LAYER_PLAYER } from "../Config/renderLayers";
import RenderData, { GEOMETRIC_RECTANGLE } from "../../Engine/Core/Rendering/RenderData";

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

        this.addComponent(() => new SpriteRenderer({
            sprite: new Sprite({
                image: AssetManager.getImage('image/demo/player-top-down.png'),
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
        this.addComponent(() => new RectangleCollider({ width: 32, height: 32 }), 'RectangleCollider');
    }
}
