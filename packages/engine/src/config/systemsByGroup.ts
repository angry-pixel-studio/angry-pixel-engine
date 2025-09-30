import { SystemType } from "@angry-pixel/ecs";
import { AudioPlayerSystem } from "@system/gameLogic/AudioPlayerSystem";
import { ButtonSystem } from "@system/gameLogic/ButtonSystem";
import { TiledWrapperSystem } from "@system/gameLogic/TiledWrapperSystem";
import { TilemapPreProcessingSystem } from "@system/gameLogic/TilemapPreProcessingSystem";
import { TransformSystem } from "@system/gameLogic/TransformSystem";
import { GamepadSystem } from "@system/input/GamepadSystem";
import { KeyboardSystem } from "@system/input/KeyboardSystem";
import { MouseSystem } from "@system/input/MouseSystem";
import { TouchScreenSystem } from "@system/input/TouchScreenSystem";
import { AnimatorSystem } from "@system/render2d/AnimatorSystem";
import { CameraSystem } from "@system/render2d/CameraSystem";
import { ClearScreenSystem } from "@system/render2d/ClearScreenSystem";
import { DebugColliderRenderSystem } from "@system/debug/DebugColliderRenderSystem";
import { CullingSystem } from "@system/render2d/CullingSystem";
import { MaskRendererSystem } from "@system/render2d/MaskRendererSystem";
import { RenderSystem } from "@system/render2d/RenderSystem";
import { DarknessLightRendererSystem } from "@system/render2d/DarknessLightRendererSystem";
import { SpriteRendererSystem } from "@system/render2d/SpriteRendererSystem";
import { TextRendererSystem } from "@system/render2d/TextRendererSystem";
import { TilemapRendererSystem } from "@system/render2d/TilemapRendererSystem";
import { VideoRendererSystem } from "@system/render2d/VideoRendererSystem";
import { SystemGroup } from "@system/SystemGroup";
import { SYSTEM_SYMBOLS } from "./systemSymbols";
import { ApplyVelocitySystem } from "@system/physics2d/ApplyVelocitySystem";
import { UpdateBallColliderShapeSystem } from "@system/physics2d/collider/UpdateBallColliderShapeSystem";
import { UpdateBoxColliderShapeSystem } from "@system/physics2d/collider/UpdateBoxColliderShapeSystem";
import { UpdateEdgeColliderShapeSystem } from "@system/physics2d/collider/UpdateEdgeColliderShapeSystem";
import { UpdatePolygonColliderShapeSystem } from "@system/physics2d/collider/UpdatePolygonColliderShapeSystem";
import { UpdateTilemapColliderShapeSystem } from "@system/physics2d/collider/UpdateTilemapColliderShapeSystem";
import { ResolveCollisionSystem } from "@system/physics2d/ResolveCollisionSystem";
import { ApplyRepositionSystem } from "@system/physics2d/ApplyRepositionSystem";
import { UpdateCollidersAfterRepositionSystem } from "@system/physics2d/collider/UpdateCollidersAfterRepositionSystem";
import { DebugMousePositionSystem } from "@system/debug/DebugMousePositionSystem";
import { DebugTextRendererSystem } from "@system/debug/DebugTextRendererSystem";

export type SystemsByGroup = Map<SystemGroup, { name: symbol; type: SystemType }[]>;

export const systemsByGroup: SystemsByGroup = new Map([
    [
        SystemGroup.PreGameLogic,
        [
            { name: SYSTEM_SYMBOLS.KeyboardSystem, type: KeyboardSystem },
            { name: SYSTEM_SYMBOLS.MouseSystem, type: MouseSystem },
            { name: SYSTEM_SYMBOLS.TouchScreenSystem, type: TouchScreenSystem },
            { name: SYSTEM_SYMBOLS.GamepadSystem, type: GamepadSystem },
            { name: SYSTEM_SYMBOLS.ButtonSystem, type: ButtonSystem },
            { name: SYSTEM_SYMBOLS.AudioPlayerSystem, type: AudioPlayerSystem },
            { name: SYSTEM_SYMBOLS.TiledWrapperSystem, type: TiledWrapperSystem },
            { name: SYSTEM_SYMBOLS.TilemapPreProcessingSystem, type: TilemapPreProcessingSystem },
        ],
    ],
    [SystemGroup.Transform, [{ name: SYSTEM_SYMBOLS.TransformSystem, type: TransformSystem }]],
    [
        SystemGroup.Physics,
        [
            { name: SYSTEM_SYMBOLS.ApplyVelocitySystem, type: ApplyVelocitySystem },
            { name: SYSTEM_SYMBOLS.UpdateBallColliderShapeSystem, type: UpdateBallColliderShapeSystem },
            { name: SYSTEM_SYMBOLS.UpdateBoxColliderShapeSystem, type: UpdateBoxColliderShapeSystem },
            { name: SYSTEM_SYMBOLS.UpdateEdgeColliderShapeSystem, type: UpdateEdgeColliderShapeSystem },
            { name: SYSTEM_SYMBOLS.UpdatePolygonColliderShapeSystem, type: UpdatePolygonColliderShapeSystem },
            { name: SYSTEM_SYMBOLS.UpdateTilemapColliderShapeSystem, type: UpdateTilemapColliderShapeSystem },
            { name: SYSTEM_SYMBOLS.ResolveCollisionSystem, type: ResolveCollisionSystem },
            { name: SYSTEM_SYMBOLS.ApplyRepositionSystem, type: ApplyRepositionSystem },
            { name: SYSTEM_SYMBOLS.UpdateCollidersAfterRepositionSystem, type: UpdateCollidersAfterRepositionSystem },
        ],
    ],
    [
        SystemGroup.Render,
        [
            { name: SYSTEM_SYMBOLS.AnimatorSystem, type: AnimatorSystem },
            { name: SYSTEM_SYMBOLS.CameraSystem, type: CameraSystem },
            { name: SYSTEM_SYMBOLS.TilemapRendererSystem, type: TilemapRendererSystem },
            { name: SYSTEM_SYMBOLS.SpriteRendererSystem, type: SpriteRendererSystem },
            { name: SYSTEM_SYMBOLS.MaskRendererSystem, type: MaskRendererSystem },
            { name: SYSTEM_SYMBOLS.DarknessLightRendererSystem, type: DarknessLightRendererSystem },
            { name: SYSTEM_SYMBOLS.TextRendererSystem, type: TextRendererSystem },
            { name: SYSTEM_SYMBOLS.VideoRendererSystem, type: VideoRendererSystem },
            { name: SYSTEM_SYMBOLS.DebugColliderRenderSystem, type: DebugColliderRenderSystem },
            { name: SYSTEM_SYMBOLS.DebugTextRendererSystem, type: DebugTextRendererSystem },
            { name: SYSTEM_SYMBOLS.DebugMousePositionSystem, type: DebugMousePositionSystem },
            { name: SYSTEM_SYMBOLS.CullingSystem, type: CullingSystem },
            { name: SYSTEM_SYMBOLS.ClearScreenSystem, type: ClearScreenSystem },
            { name: SYSTEM_SYMBOLS.RenderSystem, type: RenderSystem },
        ],
    ],
]);
