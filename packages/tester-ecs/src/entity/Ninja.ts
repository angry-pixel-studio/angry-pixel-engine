import {
    Animation,
    Animator,
    BoxCollider,
    LightRenderer,
    RigidBody,
    RigidBodyType,
    SpriteRenderer,
    Transform,
    Vector2,
    Archetype,
} from "angry-pixel";
import { COLLISION_LAYERS, RENDER_LAYERS } from "@config/layers";
import { ASSETS } from "@config/assets";
import { NinjaMovement } from "@component/ninja/NinjaMovement";
import { NinjaSfx } from "@component/ninja/NinjaSfx";

const idleAnimation = new Animation({
    image: ASSETS.images.ninja,
    fps: 10,
    loop: true,
    slice: { size: new Vector2(16, 16) },
    frames: [32, 33, 34, 35],
});

const runAnimation = new Animation({
    image: ASSETS.images.ninja,
    fps: 10,
    loop: true,
    slice: { size: new Vector2(16, 16) },
    frames: [8, 9, 10, 11, 12, 13],
});

const jumpAnimation = new Animation({
    image: ASSETS.images.ninja,
    fps: 10,
    loop: true,
    slice: { size: new Vector2(16, 16) },
    frames: [48, 49, 50],
});

const fallAnimation = new Animation({
    image: ASSETS.images.ninja,
    fps: 10,
    loop: true,
    slice: { size: new Vector2(16, 16) },
    frames: [40, 41, 42],
});

export const ninjaArchetype: Archetype = {
    components: [
        new Transform({ position: new Vector2(0, -40) }),
        new SpriteRenderer({ layer: RENDER_LAYERS.Ninja }),
        new LightRenderer({
            radius: 64,
            layer: RENDER_LAYERS.Shadow,
            smooth: true,
            intensity: 0.7,
        }),
        new Animator({
            animations: new Map([
                ["idle", idleAnimation],
                ["run", runAnimation],
                ["jump", jumpAnimation],
                ["fall", fallAnimation],
            ]),
            animation: "idle",
        }),
        new BoxCollider({
            layer: COLLISION_LAYERS.Ninja,
            width: 8,
            height: 16,
        }),
        new RigidBody({ type: RigidBodyType.Dynamic }),
        NinjaMovement,
        NinjaSfx,
    ],
    children: [
        {
            components: [
                new Transform(),
                new BoxCollider({
                    layer: COLLISION_LAYERS.Ninja,
                    width: 6,
                    height: 8,
                    offset: new Vector2(0, -6),
                    physics: false,
                }),
            ],
        },
    ],
};
