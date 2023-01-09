// math
export * from "angry-pixel-math";

// main
export { Component, PhysicsComponent, PreRenderComponent } from "./core/Component";
export { Game } from "./core/Game";
export { GameConfig } from "./core/GameConfig";
export * from "./core/GameObject";
export * from "./core/Scene";
export { InitOptions } from "./core/GameActor";

// components
export * from "./component/collider/BoxCollider";
export * from "./component/collider/BallCollider";
export * from "./component/collider/TilemapCollider";
export * from "./component/collider/PolygonCollider";
export * from "./component/collider/EdgeCollider";
export { CollisionData } from "./component/collider/Collider";
export * from "./component/rendering/SpriteRenderer";
export * from "./component/rendering/TextRenderer";
export * from "./component/rendering/MaskRenderer";
export * from "./component/rendering/TiledTilemapRenderer";
export * from "./component/rendering/TilemapRenderer";
export * from "./component/Animation";
export * from "./component/Animator";
export * from "./component/AudioPlayer";
export * from "./component/Camera";
export * from "./component/RigidBody";
export * from "./component/Sprite";
export * from "./component/Transform";
export * from "./component/Button";

// game objects
export * from "./gameObject/GameCamera";
export * from "./gameObject/SpacePointer";

// facades
export { AssetManagerFacade as AssetManager } from "./core/facades/AssetManagerFacade";
export { DomManagerFacade as DomManager } from "./core/facades/DomManagerFacade";
export { GameObjectManagerFacade as GameObjectManager } from "./core/facades/GameObjectManagerFacade";
export { InputManagerFacade as InputManager } from "./core/facades/InputManagerFacade";
export { SceneManagerFacade as SceneManager } from "./core/facades/SceneManagerFacade";
export { TimeManagerFacade as TimeManager } from "./core/facades/TimeManagerFacade";

// input
export * from "./input/GamepadController";
export * from "./input/KeyboardController";
export * from "./input/MouseController";
export * from "./input/TouchController";

// collision
export {
    ICollisionResolution,
    ICollision,
    CollisionMatrix,
    CollisionMethods,
    ICollider,
    BroadPhaseMethods,
} from "angry-pixel-2d-physics";
