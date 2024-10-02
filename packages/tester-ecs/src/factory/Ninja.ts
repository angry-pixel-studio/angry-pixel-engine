import {
    Animation,
    Animator,
    AudioPlayer,
    BoxCollider,
    Component,
    AssetManager,
    LightRenderer,
    RigidBody,
    RigidBodyType,
    SpriteRenderer,
    Transform,
    Vector2,
} from "angry-pixel";
import { COLLISION_LAYERS, RENDER_LAYERS } from "@config/layers";
import { ASSETS } from "@config/assets";
import { NinjaMovement } from "@component/ninja/NinjaMovement";
import { NinjaSfx } from "@component/ninja/NinjaSfx";

export const ninjaFactory = (assetManager: AssetManager, position: Vector2): Component[][] => {
    const ninjaArchetype = [
        new Transform({ position }),
        new SpriteRenderer({ layer: RENDER_LAYERS.Ninja }),
        new LightRenderer({
            radius: 64,
            layer: RENDER_LAYERS.Shadow,
            smooth: true,
            intensity: 0.7,
        }),
        new Animator({
            animations: new Map([
                ["idle", idleAnimation(assetManager)],
                ["run", runAnimation(assetManager)],
            ]),
            animation: "idle",
        }),
        new BoxCollider({
            layer: COLLISION_LAYERS.Ninja,
            width: 12,
            height: 16,
        }),
        new RigidBody({ type: RigidBodyType.Dynamic }),
        NinjaMovement,
        AudioPlayer,
        NinjaSfx,
    ];

    const feet = [
        new Transform({ parent: ninjaArchetype[0] as Transform }),
        new BoxCollider({
            layer: COLLISION_LAYERS.Ninja,
            width: 10,
            height: 8,
            offset: new Vector2(0, -4),
            physics: false,
        }),
    ];

    return [ninjaArchetype, feet];
};

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
