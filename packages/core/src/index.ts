// math
export * from "@angry-pixel/math";

// input
export {
    IInputManager,
    GamepadController,
    GamepadData,
    KeyboardController,
    MouseController,
    TouchController,
    TouchInteraction,
} from "@angry-pixel/input";

// physics
export {
    IPhysicsManager,
    ICollisionResolution,
    ICollision,
    CollisionMatrix,
    CollisionMethods,
    ICollider,
    BroadPhaseMethods,
} from "@angry-pixel/2d-physics";

// renderer
export { IRenderManager } from "@angry-pixel/2d-renderer";

// core
export { Component, PhysicsComponent, PreRenderComponent } from "./core/Component";
export { Game } from "./core/Game";
export { GameConfig } from "./core/GameConfig";
export * from "./core/GameObject";
export * from "./core/Scene";
export { InitOptions } from "./core/GameActor";

// managers
export { IAssetManager } from "./core/managers/AssetManager";
export { IDomManager } from "./core/managers/DomManager";
export { IGameObjectManager } from "./core/managers/GameObjectManager";
export { ISceneManager } from "./core/managers/SceneManager";
export { ITimeManager } from "./core/managers/TimeManager";

// components
export * from "./component/collider/BoxCollider";
export * from "./component/collider/BallCollider";
export * from "./component/collider/TilemapCollider";
export * from "./component/collider/PolygonCollider";
export * from "./component/collider/EdgeCollider";
export { IColliderComponent as ColliderComponent, CollisionData } from "./component/collider/Collider";
export * from "./component/rendering/SpriteRenderer";
export * from "./component/rendering/TextRenderer";
export * from "./component/rendering/MaskRenderer";
export * from "./component/rendering/VideoRenderer";
export * from "./component/rendering/TiledTilemapRenderer";
export * from "./component/rendering/TilemapRenderer";
export * from "./component/Animator";
export * from "./component/AudioPlayer";
export * from "./component/Camera";
export * from "./component/RigidBody";
export * from "./component/rendering/Sprite";
export * from "./component/Transform";
export * from "./component/Button";

// game objects
export * from "./gameObject/GameCamera";
export * from "./gameObject/SpacePointer";
