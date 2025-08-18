import { SYMBOLS as COLLISION_SYMBOLS } from "@angry-pixel/collisions";
import { SYMBOLS as ECS_SYMBOLS } from "@angry-pixel/ecs";
import { SYMBOLS as WEBGL_SYMBOLS } from "@angry-pixel/webgl";

export const SYMBOLS = {
    AssetManager: Symbol.for("AssetManager"),
    CreateSystemService: Symbol.for("CreateSystemService"),
    GameConfig: Symbol.for("GameConfig"),
    InputManager: Symbol.for("InputManager"),
    LoopManager: Symbol.for("LoopManager"),
    RenderManager: Symbol.for("RenderManager"),
    SceneManager: Symbol.for("SceneManager"),
    TimeManager: Symbol.for("TimeManager"),
    ...COLLISION_SYMBOLS,
    ...ECS_SYMBOLS,
    ...WEBGL_SYMBOLS,
};
