import {
    Animation,
    Animator,
    BoxCollider,
    AssetManager,
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

export const ninjaArchetype = (assetManager: AssetManager, position: Vector2): Archetype => ({
    components: [
        { type: Transform, data: { position } },
        { type: SpriteRenderer, data: { layer: RENDER_LAYERS.Ninja } },
        {
            type: LightRenderer,
            data: {
                radius: 64,
                layer: RENDER_LAYERS.Shadow,
                smooth: true,
                intensity: 0.7,
            },
        },
        {
            type: Animator,
            data: {
                animations: new Map([
                    ["idle", idleAnimation(assetManager)],
                    ["run", runAnimation(assetManager)],
                ]),
                animation: "idle",
            },
        },
        {
            type: BoxCollider,
            data: {
                layer: COLLISION_LAYERS.Ninja,
                width: 8,
                height: 16,
            },
        },
        { type: RigidBody, data: { type: RigidBodyType.Dynamic } },
        { type: NinjaMovement },
        { type: NinjaSfx },
    ],
    children: [
        {
            components: [
                { type: Transform },
                {
                    type: BoxCollider,
                    data: {
                        layer: COLLISION_LAYERS.Ninja,
                        width: 6,
                        height: 8,
                        offset: new Vector2(0, -6),
                        physics: false,
                    },
                },
            ],
        },
    ],
});

const idleAnimation = (assetManager: AssetManager): Animation => {
    const animation = new Animation();
    animation.image = assetManager.getImage(ASSETS.images.ninja);

    animation.fps = 10;
    animation.loop = true;
    animation.slice.size.set(16, 16);
    animation.frames = [32, 33, 34, 35];

    return animation;
};

const runAnimation = (assetManager: AssetManager): Animation => {
    const animation = new Animation();
    animation.image = assetManager.getImage(ASSETS.images.ninja);

    animation.fps = 10;
    animation.loop = true;
    animation.slice.size.set(16, 16);
    animation.frames = [8, 9, 10, 11, 12, 13];

    return animation;
};
