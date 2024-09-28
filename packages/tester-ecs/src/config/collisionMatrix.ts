import { CollisionMatrix } from "angry-pixel-engine";
import { COLLISION_LAYERS } from "./layers";

export const collisionMatrix = [
    [COLLISION_LAYERS.Foreground, COLLISION_LAYERS.Ninja],
    [COLLISION_LAYERS.Foreground, COLLISION_LAYERS.Goblin],
    [COLLISION_LAYERS.MovingPlatform, COLLISION_LAYERS.Ninja],
    [COLLISION_LAYERS.MovingPlatform, COLLISION_LAYERS.Goblin],
    // [COLLISION_LAYERS.Ninja, COLLISION_LAYERS.Goblin],
] as CollisionMatrix;
