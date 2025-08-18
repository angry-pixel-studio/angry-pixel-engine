import { SYMBOLS } from "@config/dependencySymbols";
import { SYMBOLS as COLLISION_SYMBOLS } from "@angry-pixel/collisions";
import { SYMBOLS as ECS_SYMBOLS } from "@angry-pixel/ecs";
import { SYMBOLS as WEBGL_SYMBOLS } from "@angry-pixel/webgl";

/**
 * Symbols to be used as dependency identifiers
 * @public
 * @category Decorators
 */
export const BuiltInDependencyIdentifiers = {
    AssetManager: SYMBOLS.AssetManager,
    CanvasElement: WEBGL_SYMBOLS.CanvasElement,
    CollisionRepository: COLLISION_SYMBOLS.CollisionRepository,
    EntityManager: ECS_SYMBOLS.EntityManager,
    GameConfig: SYMBOLS.GameConfig,
    InputManager: SYMBOLS.InputManager,
    SceneManager: SYMBOLS.SceneManager,
    SystemManager: ECS_SYMBOLS.SystemManager,
    TimeManager: SYMBOLS.TimeManager,
};

export { GameConfig } from "@config/bootstrap";
export { Game } from "./Game";

export * from "@component/gameLogic/Animator";
export * from "@component/gameLogic/AudioPlayer";
export * from "@component/gameLogic/Button";
export * from "@component/gameLogic/TiledWrapper";
export * from "@component/gameLogic/Transform";

export * from "@component/physics2d/BallCollider";
export * from "@component/physics2d/BoxCollider";
export * from "@component/physics2d/EdgeCollider";
export * from "@component/physics2d/PolygonCollider";
export * from "@component/physics2d/RigidBody";
export * from "@component/physics2d/TilemapCollider";

export * from "@component/render2d/Camera";
export * from "@component/render2d/LightRenderer";
export * from "@component/render2d/MaskRenderer";
export * from "@component/render2d/DarknessRenderer";
export * from "@component/render2d/SpriteRenderer";
export * from "@component/render2d/TextRenderer";
export * from "@component/render2d/TilemapRenderer";
export * from "@component/render2d/VideoRenderer";

export * from "@manager/AssetManager";
export * from "@manager/InputManager";
export { SceneManager, Scene, SceneType } from "@manager/SceneManager";
export { TimeManager, IntervalOptions } from "@manager/TimeManager";

export { CollisionMatrix } from "@system/physics2d/ResolveCollisionSystem";
export * from "@system/GameSystem";
export { gameLogicSystem, gamePhysicsSystem, gamePreRenderSystem } from "@system/SystemGroup";

export * from "@misc";
export * from "@angry-pixel/ecs";
export * from "@input";
export { inject, injectable, DependencyName, DependencyType, PropertyKey } from "@angry-pixel/ioc";
export * from "@angry-pixel/math";
export {
    BroadPhaseMethods,
    Circumference,
    Collider,
    Collision,
    CollisionMethods,
    CollisionRepository,
    CollisionResolution,
    Polygon,
    Shape,
} from "@angry-pixel/collisions";
export { MaskShape, Slice, TextOrientation, TilemapOrientation } from "@angry-pixel/webgl";
