import { BoxCollider, RigidBody, RigidBodyType, SpriteRenderer, Transform, Vector2, Archetype } from "angry-pixel";
import { MovingPlatform } from "@component/MovingPlatform";
import { ASSETS } from "@config/assets";
import { COLLISION_LAYERS, RENDER_LAYERS } from "@config/layers";

export const movingPlatformArchetype: Archetype = {
    components: [
        new Transform(),
        new MovingPlatform({ spots: [] }),
        new SpriteRenderer({
            image: ASSETS.images.tileset,
            layer: RENDER_LAYERS.Foreground,
            slice: { x: 96, y: 48, width: 48, height: 16 },
        }),
        new BoxCollider({
            layer: COLLISION_LAYERS.MovingPlatform,
            width: 48,
            height: 16,
        }),
        new RigidBody({
            type: RigidBodyType.Kinematic,
        }),
    ],
};
