import { IGame, Game, IGameConfig } from "./Game";

// export components
export * from "./component/RigidBody";
export * from "./component/Transform";
export * from "./component/Children";
export * from "./component/Parent";
export * from "./component/collider/BoxCollider";
export * from "./component/collider/BallCollider";
export * from "./component/collider/EdgeCollider";
export * from "./component/collider/PolygonCollider";
export * from "./component/collider/TilemapCollider";
export * from "./component/Camera";
export * from "./component/Animator";
export * from "./component/renderer/MaskRenderer";
export * from "./component/renderer/SpriteRenderer";
export * from "./component/renderer/TextRenderer";
export * from "./component/renderer/VideoRenderer";
export * from "./component/renderer/TilemapRenderer";
export * from "./component/renderer/LightRenderer";
export * from "./component/renderer/ShadowRenderer";
export * from "./component/Button";
export * from "./component/TiledWrapper";
export * from "./component/AudioPlayer";

// export managers
export { IAssetManager } from "./manager/AssetManager";
export { Component, ComponentType, Entity, SearchResult, EntityManager } from "../ecs/EntityManager";
export { ILoopManager } from "./manager/LoopManager";
export { ISceneManager } from "./manager/SceneManager";
export { System, SystemType, SystemManager, SystemGroup } from "../ecs/SystemManager";
export { ITimeManager } from "./manager/TimeManager";

// export external managers
export {
    IPhysicsManager,
    ICollisionResolution,
    ICollision,
    CollisionMatrix,
    CollisionMethods,
    ICollider,
    BroadPhaseMethods,
    RigidBodyType,
} from "../2d-physics";

export { IRenderManager, MaskShape, Slice, TextOrientation } from "../2d-renderer";

export {
    IInputManager,
    GamepadController,
    Keyboard,
    Mouse,
    TouchInteraction,
    TouchScreen,
    VibrationInput,
} from "../input";

export { Rectangle, Vector2, between, clamp, fixedRound, randomFloat, randomInt, range } from "../math";

// export game
export { IGame, IGameConfig };
export { GameSystem, gameLogicSystem, gamePhysicsSystem, gamePreRenderSystem } from "./system/GameSystem";

export const createGame = (config: IGameConfig): IGame => {
    return new Game(config);
};
