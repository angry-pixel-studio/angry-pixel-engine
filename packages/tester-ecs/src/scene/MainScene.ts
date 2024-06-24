import { FpsMetterSystem } from "../system/FpsMetterSystem";
import { InputControllerSystem } from "../system/InputControllerSystem";
import { LoaderSystem } from "../system/LoaderSystem";
import { MovingPlatformSystem } from "../system/MovingPlatformSystem";
import { FollowPlayerCameraSystem } from "../system/camera/FollowPlayerCameraSystem";
import { GoblinMovementSystem } from "../system/goblin/GoblinMovementSystem";
import { NinjaAnimationSystem } from "../system/ninja/NinjaAnimationSystem";
import { NinjaMovementSystem } from "../system/ninja/NinjaMovementSystem";
import { NinjaSfxSystem } from "../system/ninja/NinjaSfxSystem";

export const mainScene = [
    LoaderSystem,
    InputControllerSystem,
    MovingPlatformSystem,
    NinjaMovementSystem,
    NinjaAnimationSystem,
    NinjaSfxSystem,
    GoblinMovementSystem,
    FollowPlayerCameraSystem,
    FpsMetterSystem,
];
