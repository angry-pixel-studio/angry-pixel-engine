import {
    Animation,
    Animator,
    BoxCollider,
    Component,
    EdgeCollider,
    AssetManager,
    LightRenderer,
    RigidBody,
    RigidBodyType,
    SpriteRenderer,
    Transform,
    Vector2,
    randomInt,
} from "angry-pixel-ecs";
import { COLLISION_LAYERS, RENDER_LAYERS } from "@config/layers";
import { ASSETS } from "@config/assets";
import { GoblinMovement } from "@component/goblin/GoblinMovement";

export const goblinArchetype = (assetManager: AssetManager, position: Vector2): Component[] => [
    new Transform({ position }),
    new SpriteRenderer({ layer: RENDER_LAYERS.Goblin }),
    new Animator({
        animations: new Map([["walk", walkAnimation(assetManager)]]),
        animation: "walk",
    }),
    new BoxCollider({
        layer: COLLISION_LAYERS.Goblin,
        width: 12,
        height: 16,
    }),
    new EdgeCollider({
        layer: COLLISION_LAYERS.Goblin,
        vertexModel: [new Vector2(8, -7), new Vector2(12, -7), new Vector2(12, -11)],
        physics: false,
    }),
    new RigidBody({
        type: RigidBodyType.Dynamic,
        gravity: 1000,
    }),
    new GoblinMovement({ walkSpeed: randomInt(20, 60) }),
    new LightRenderer({
        radius: 64,
        layer: RENDER_LAYERS.Shadow,
        smooth: true,
        intensity: 0.5,
    }),
];

const walkAnimation = (assetManager: AssetManager): Animation => {
    const animation = new Animation();
    animation.image = assetManager.getImage(ASSETS.images.goblin);

    animation.fps = 10;
    animation.loop = true;
    animation.slice.size.set(16, 16);
    animation.frames = [0, 1, 2, 3, 4, 5];

    return animation;
};
