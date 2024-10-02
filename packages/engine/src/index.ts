import { TYPES } from "@config/types";
/**
 * Symbols to be used as dependency identifiers
 * @public
 * @category Config
 */
export const Symbols = {
    AssetManager: TYPES.AssetManager,
    CanvasElement: TYPES.CanvasElement,
    CollisionRepository: TYPES.CollisionRepository,
    EntityManager: TYPES.EntityManager,
    GameConfig: TYPES.GameConfig,
    InputManager: TYPES.InputManager,
    SceneManager: TYPES.SceneManager,
    SystemManager: TYPES.SystemManager,
    TimeManager: TYPES.TimeManager,
};

export { GameConfig } from "@config/bootstrap";
export { Game } from "./Game";

export * from "@component/gameLogic/Animator";
export * from "@component/gameLogic/AudioPlayer";
export * from "@component/gameLogic/Button";
export * from "@component/gameLogic/Children";
export * from "@component/gameLogic/Parent";
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
export * from "@component/render2d/ShadowRenderer";
export * from "@component/render2d/SpriteRenderer";
export * from "@component/render2d/TextRenderer";
export * from "@component/render2d/TilemapRenderer";
export * from "@component/render2d/VideoRenderer";

export * from "@manager/AssetManager";
export * from "@manager/InputManager";
export { SceneManager, Scene, SceneType } from "@manager/SceneManager";
export { TimeManager } from "@manager/TimeManager";

export { CollisionMatrix } from "@system/physics2d/ResolveCollisionSystem";
export * from "@system/GameSystem";
export { gameLogicSystem, gamePhysicsSystem, gamePreRenderSystem } from "@system/SystemGroup";

export * from "@ecs";
export * from "@input";
export { inject, injectable, DependencyName, DependencyType } from "@ioc";
export * from "@math";
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
} from "@collisions2d";
export { MaskShape, Slice, TextOrientation, TilemapOrientation } from "@webgl";
