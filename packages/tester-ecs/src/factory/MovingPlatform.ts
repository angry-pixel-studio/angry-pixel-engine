import {
    BoxCollider,
    Component,
    IAssetManager,
    RigidBody,
    RigidBodyType,
    SpriteRenderer,
    Transform,
    Vector2,
} from "angry-pixel-ecs";
import { MovingPlatform } from "../component/MovingPlatform";
import { ASSETS } from "../config/assets";
import { COLLISION_LAYERS, RENDER_LAYERS } from "../config/layers";

export const movingPlatformFactory = (assetManager: IAssetManager): Component[] => {
    const movingPlatform = new MovingPlatform();
    movingPlatform.positions = [new Vector2(-112, -72), new Vector2(192, -72)];

    const spriteRenderer = new SpriteRenderer();
    spriteRenderer.image = assetManager.getImage(ASSETS.images.tileset);
    spriteRenderer.layer = RENDER_LAYERS.Foreground;
    spriteRenderer.slice = { x: 96, y: 48, width: 48, height: 16 };

    const collider = new BoxCollider();
    collider.layer = COLLISION_LAYERS.MovingPlatform;
    collider.width = 48;
    collider.height = 16;

    const rigidBody = new RigidBody();
    rigidBody.gravity = 0;
    rigidBody.type = RigidBodyType.Static;

    return [new Transform(), movingPlatform, spriteRenderer, collider, rigidBody];
};
