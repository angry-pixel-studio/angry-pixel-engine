import {
    Animation,
    Animator,
    BoxCollider,
    EdgeCollider,
    LightRenderer,
    RigidBody,
    RigidBodyType,
    SpriteRenderer,
    Transform,
    Vector2,
    randomInt,
    Archetype,
} from "angry-pixel";
import { COLLISION_LAYERS, RENDER_LAYERS } from "@config/layers";
import { ASSETS } from "@config/assets";
import { GoblinMovement } from "@component/goblin/GoblinMovement";

const walkAnimation = new Animation({
    image: ASSETS.images.goblin,
    fps: 10,
    loop: true,
    slice: {
        size: new Vector2(16, 16),
        offset: new Vector2(0, 0),
        padding: new Vector2(0, 0),
    },
    frames: [0, 1, 2, 3, 4, 5],
});

export const goblinArchetype: Archetype = {
    components: [
        new Transform({ position: new Vector2(0, 0) }),
        new SpriteRenderer({ layer: RENDER_LAYERS.Goblin }),
        new Animator({
            animations: new Map([["walk", walkAnimation]]),
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
        new GoblinMovement(),
        new LightRenderer({
            radius: 64,
            layer: RENDER_LAYERS.Shadow,
            smooth: true,
            intensity: 0.5,
        }),
    ],
};
