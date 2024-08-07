import {
    Animation,
    Animator,
    BoxCollider,
    Component,
    EdgeCollider,
    IAssetManager,
    IEntityManager,
    LightRenderer,
    RigidBody,
    RigidBodyType,
    SpriteRenderer,
    Transform,
    Vector2,
    randomInt,
} from "angry-pixel-ecs";
import { COLLISION_LAYERS, RENDER_LAYERS } from "../config/layers";
import { ASSETS } from "../config/assets";
import { GoblinMovement } from "../component/goblin/GoblinMovement";

export const goblinFactory = (
    assetManager: IAssetManager,
    entityManager: IEntityManager,
    position: Vector2,
): Component[] => {
    const spriteRenderer = new SpriteRenderer();
    spriteRenderer.layer = RENDER_LAYERS.Goblin;

    const animator = new Animator();
    animator.animations.set("walk", walkAnimation(assetManager));
    animator.animation = "walk";

    const bodyCollider = new BoxCollider();
    bodyCollider.layer = COLLISION_LAYERS.Goblin;
    bodyCollider.width = 12;
    bodyCollider.height = 16;

    const edgeCollider = new EdgeCollider();
    edgeCollider.layer = COLLISION_LAYERS.Goblin;
    edgeCollider.vertexModel = [new Vector2(8, -7), new Vector2(12, -7), new Vector2(12, -11)];
    edgeCollider.physics = false;

    const rigidBody = new RigidBody();
    rigidBody.type = RigidBodyType.Dynamic;
    rigidBody.gravity = 1000;

    const transform = new Transform();
    transform.position = position;

    const movement = new GoblinMovement();
    movement.walkSpeed = randomInt(20, 60);

    const lightRenderer = new LightRenderer();
    lightRenderer.radius = 64;
    lightRenderer.layer = RENDER_LAYERS.Shadow;
    lightRenderer.smooth = true;
    lightRenderer.intensity = 0.7;

    return [transform, spriteRenderer, animator, bodyCollider, edgeCollider, rigidBody, movement, lightRenderer];
};

const walkAnimation = (assetManager: IAssetManager): Animation => {
    const animation = new Animation();
    animation.image = assetManager.getImage(ASSETS.images.goblin);

    animation.fps = 10;
    animation.loop = true;
    animation.slice.size.set(16, 16);
    animation.frames = [0, 1, 2, 3, 4, 5];

    return animation;
};
