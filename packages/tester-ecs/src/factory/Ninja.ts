import {
    Animation,
    Animator,
    AudioPlayer,
    BoxCollider,
    Component,
    IAssetManager,
    EntityManager,
    LightRenderer,
    RigidBody,
    RigidBodyType,
    SpriteRenderer,
    Transform,
    Vector2,
} from "angry-pixel-ecs";
import { COLLISION_LAYERS, RENDER_LAYERS } from "../config/layers";
import { ASSETS } from "../config/assets";
import { NinjaMovement } from "../component/ninja/NinjaMovement";
import { NinjaSfx } from "../component/ninja/NinjaSfx";

export const ninjaFactory = (
    assetManager: IAssetManager,
    entityManager: EntityManager,
    position: Vector2,
): Component[] => {
    const spriteRenderer = new SpriteRenderer();
    spriteRenderer.layer = RENDER_LAYERS.Ninja;

    const animator = new Animator();
    animator.animations.set("idle", idleAnimation(assetManager));
    animator.animations.set("run", runAnimation(assetManager));
    animator.animation = "idle";

    const collider = new BoxCollider();
    collider.layer = COLLISION_LAYERS.Ninja;
    collider.width = 12;
    collider.height = 16;

    const rigidBody = new RigidBody();
    rigidBody.type = RigidBodyType.Dynamic;

    const ninjaMovement = new NinjaMovement();

    const transform = new Transform();
    setupFeet(entityManager, transform);
    transform.position = position;

    const lightRenderer = new LightRenderer();
    lightRenderer.radius = 64;
    lightRenderer.layer = RENDER_LAYERS.Shadow;
    lightRenderer.smooth = true;
    lightRenderer.intensity = 0.7;

    return [
        transform,
        spriteRenderer,
        lightRenderer,
        animator,
        collider,
        rigidBody,
        ninjaMovement,
        new AudioPlayer(),
        new NinjaSfx(),
    ];
};

const idleAnimation = (assetManager: IAssetManager): Animation => {
    const animation = new Animation();
    animation.image = assetManager.getImage(ASSETS.images.ninja);

    animation.fps = 10;
    animation.loop = true;
    animation.slice.size.set(16, 16);
    animation.frames = [32, 33, 34, 35];

    return animation;
};

const runAnimation = (assetManager: IAssetManager): Animation => {
    const animation = new Animation();
    animation.image = assetManager.getImage(ASSETS.images.ninja);

    animation.fps = 10;
    animation.loop = true;
    animation.slice.size.set(16, 16);
    animation.frames = [8, 9, 10, 11, 12, 13];

    return animation;
};

const setupFeet = (entityManager: EntityManager, parentTransform: Transform): void => {
    const transform = new Transform();
    transform.parent = parentTransform;

    const collider = new BoxCollider();
    collider.layer = COLLISION_LAYERS.Ninja;
    collider.width = 10;
    collider.height = 8;
    collider.offset.y = -4;
    collider.physics = false;

    entityManager.createEntity([transform, collider]);
};
