import { SystemType } from "ecs";
import { AudioPlayerSystem } from "system/gameLogic/AudioPlayerSystem";
import { ButtonSystem } from "system/gameLogic/ButtonSystem";
import { ChildrenSystem } from "system/gameLogic/ChildrenSystem";
import { ParentSystem } from "system/gameLogic/ParentSystem";
import { TiledWrapperSystem } from "system/gameLogic/TiledWrapperSystem";
import { TilemapPreProcessingSystem } from "system/gameLogic/TilemapPreProcessingSystem";
import { TransformSystem } from "system/gameLogic/TransformSystem";
import { GamepadSystem } from "system/input/GamepadSystem";
import { KeyboardSystem } from "system/input/KeyboardSystem";
import { MouseSystem } from "system/input/MouseSystem";
import { TouchScreenSystem } from "system/input/TouchScreenSystem";
import { SystemGroup } from "system/SystemGroup";

export const SYSTEMS = {
    // game logic
    AudioPlayerSystem: Symbol.for("AudioPlayerSystem"),
    ButtonSystem: Symbol.for("ButtonSystem"),
    ChildrenSystem: Symbol.for("ChildrenSystem"),
    ParentSystem: Symbol.for("ParentSystem"),
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
};

export const systemTypes: Map<SystemGroup, { name: symbol; type: SystemType }[]> = new Map([
    [
        SystemGroup.PreGameLogic,
        [
            { name: SYSTEMS.KeyboardSystem, type: KeyboardSystem },
            { name: SYSTEMS.MouseSystem, type: MouseSystem },
            { name: SYSTEMS.TouchScreenSystem, type: TouchScreenSystem },
            { name: SYSTEMS.GamepadSystem, type: GamepadSystem },
            { name: SYSTEMS.ButtonSystem, type: ButtonSystem },
            { name: SYSTEMS.AudioPlayerSystem, type: AudioPlayerSystem },
            { name: SYSTEMS.TiledWrapperSystem, type: TiledWrapperSystem },
            { name: SYSTEMS.TilemapPreProcessingSystem, type: TilemapPreProcessingSystem },
        ],
    ],
    [
        SystemGroup.PostGameLogic,
        [
            { name: SYSTEMS.TransformSystem, type: TransformSystem },
            { name: SYSTEMS.ChildrenSystem, type: ChildrenSystem },
            { name: SYSTEMS.ParentSystem, type: ParentSystem },
        ],
    ],
    [
        SystemGroup.Physics,
        [
            { name: SYSTEMS.ApplyVelocitySystem, type: AudioPlayerSystem },
            { name: SYSTEMS.UpdateBallColliderShapeSystem, type: AudioPlayerSystem },
            { name: SYSTEMS.UpdateBoxColliderShapeSystem, type: AudioPlayerSystem },
            { name: SYSTEMS.UpdateEdgeColliderShapeSystem, type: AudioPlayerSystem },
            { name: SYSTEMS.UpdatePolygonColliderShapeSystem, type: AudioPlayerSystem },
            { name: SYSTEMS.UpdateTilemapColliderShapeSystem, type: AudioPlayerSystem },
            { name: SYSTEMS.ResolveCollisionSystem, type: AudioPlayerSystem },
            { name: SYSTEMS.ApplyRepositionSystem, type: AudioPlayerSystem },
            { name: SYSTEMS.ResolveCollisionSystem, type: AudioPlayerSystem },
        ],
    ],
    [SystemGroup.Render, []],
]);
