export const SYSTEM_TYPES = {
    // game logic
    AudioPlayerSystem: Symbol.for("AudioPlayerSystem"),
    ButtonSystem: Symbol.for("ButtonSystem"),
    TiledWrapperSystem: Symbol.for("TiledWrapperSystem"),
    TilemapPreProcessingSystem: Symbol.for("TilemapPreProcessingSystem"),
    TransformSystem: Symbol.for("TransformSystem"),
    // input
    GamepadSystem: Symbol.for("GamepadSystem"),
    KeyboardSystem: Symbol.for("KeyboardSystem"),
    MouseSystem: Symbol.for("MouseSystem"),
    TouchScreenSystem: Symbol.for("TouchScreenSystem"),
    // physics 2d
    UpdateBallColliderShapeSystem: Symbol.for("UpdateBallColliderShapeSystem"),
    UpdateBoxColliderShapeSystem: Symbol.for("UpdateBoxColliderShapeSystem"),
    UpdateEdgeColliderShapeSystem: Symbol.for("UpdateEdgeColliderShapeSystem"),
    UpdatePolygonColliderShapeSystem: Symbol.for("UpdatePolygonColliderShapeSystem"),
    UpdateTilemapColliderShapeSystem: Symbol.for("UpdateTilemapColliderShapeSystem"),
    UpdateCollidersAfterRepositionSystem: Symbol.for("UpdateCollidersAfterRepositionSystem"),
    ApplyRepositionSystem: Symbol.for("ApplyRepositionSystem"),
    ApplyVelocitySystem: Symbol.for("ApplyVelocitySystem"),
    ResolveCollisionSystem: Symbol.for("ResolveCollisionSystem"),
    // render 2d
    AnimatorSystem: Symbol.for("AnimatorSystem"),
    CameraSystem: Symbol.for("CameraSystem"),
    ClearScreenSystem: Symbol.for("ClearScreenSystem"),
    CullingSystem: Symbol.for("CullingSystem"),
    MaskRendererSystem: Symbol.for("MaskRendererSystem"),
    RenderSystem: Symbol.for("RenderSystem"),
    DarknessLightRendererSystem: Symbol.for("DarknessLightRendererSystem"),
    SpriteRendererSystem: Symbol.for("SpriteRendererSystem"),
    TextRendererSystem: Symbol.for("TextRendererSystem"),
    TilemapRendererSystem: Symbol.for("TilemapRendererSystem"),
    VideoRendererSystem: Symbol.for("VideoRendererSystem"),
    // debug
    DebugColliderRenderSystem: Symbol.for("DebugColliderRenderSystem"),
    DebugMousePositionSystem: Symbol.for("DebugMousePositionSystem"),
};
