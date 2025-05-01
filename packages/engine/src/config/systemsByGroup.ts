import { SystemType } from "@ecs";
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
import { ShadowLightRendererSystem } from "@system/render2d/ShadowLightRendererSystem";
import { SpriteRendererSystem } from "@system/render2d/SpriteRendererSystem";
import { TextRendererSystem } from "@system/render2d/TextRendererSystem";
import { TilemapRendererSystem } from "@system/render2d/TilemapRendererSystem";
import { VideoRendererSystem } from "@system/render2d/VideoRendererSystem";
import { SystemGroup } from "@system/SystemGroup";
import { SYSTEM_TYPES } from "./systemTypes";
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

export type SystemsByGroup = Map<SystemGroup, { name: symbol; type: SystemType }[]>;

export const systemsByGroup: SystemsByGroup = new Map([
    [
        SystemGroup.PreGameLogic,
        [
            { name: SYSTEM_TYPES.KeyboardSystem, type: KeyboardSystem },
            { name: SYSTEM_TYPES.MouseSystem, type: MouseSystem },
            { name: SYSTEM_TYPES.TouchScreenSystem, type: TouchScreenSystem },
            { name: SYSTEM_TYPES.GamepadSystem, type: GamepadSystem },
            { name: SYSTEM_TYPES.ButtonSystem, type: ButtonSystem },
            { name: SYSTEM_TYPES.AudioPlayerSystem, type: AudioPlayerSystem },
            { name: SYSTEM_TYPES.TiledWrapperSystem, type: TiledWrapperSystem },
            { name: SYSTEM_TYPES.TilemapPreProcessingSystem, type: TilemapPreProcessingSystem },
        ],
    ],
    [SystemGroup.Transform, [{ name: SYSTEM_TYPES.TransformSystem, type: TransformSystem }]],
    [
        SystemGroup.Physics,
        [
            { name: SYSTEM_TYPES.ApplyVelocitySystem, type: ApplyVelocitySystem },
            { name: SYSTEM_TYPES.UpdateBallColliderShapeSystem, type: UpdateBallColliderShapeSystem },
            { name: SYSTEM_TYPES.UpdateBoxColliderShapeSystem, type: UpdateBoxColliderShapeSystem },
            { name: SYSTEM_TYPES.UpdateEdgeColliderShapeSystem, type: UpdateEdgeColliderShapeSystem },
            { name: SYSTEM_TYPES.UpdatePolygonColliderShapeSystem, type: UpdatePolygonColliderShapeSystem },
            { name: SYSTEM_TYPES.UpdateTilemapColliderShapeSystem, type: UpdateTilemapColliderShapeSystem },
            { name: SYSTEM_TYPES.ResolveCollisionSystem, type: ResolveCollisionSystem },
            { name: SYSTEM_TYPES.ApplyRepositionSystem, type: ApplyRepositionSystem },
            { name: SYSTEM_TYPES.UpdateCollidersAfterRepositionSystem, type: UpdateCollidersAfterRepositionSystem },
        ],
    ],
    [
        SystemGroup.Render,
        [
            { name: SYSTEM_TYPES.AnimatorSystem, type: AnimatorSystem },
            { name: SYSTEM_TYPES.CameraSystem, type: CameraSystem },
            { name: SYSTEM_TYPES.TilemapRendererSystem, type: TilemapRendererSystem },
            { name: SYSTEM_TYPES.SpriteRendererSystem, type: SpriteRendererSystem },
            { name: SYSTEM_TYPES.MaskRendererSystem, type: MaskRendererSystem },
            { name: SYSTEM_TYPES.ShadowLightRendererSystem, type: ShadowLightRendererSystem },
            { name: SYSTEM_TYPES.TextRendererSystem, type: TextRendererSystem },
            { name: SYSTEM_TYPES.VideoRendererSystem, type: VideoRendererSystem },
            { name: SYSTEM_TYPES.DebugColliderRenderSystem, type: DebugColliderRenderSystem },
            { name: SYSTEM_TYPES.DebugMousePositionSystem, type: DebugMousePositionSystem },
            { name: SYSTEM_TYPES.CullingSystem, type: CullingSystem },
            { name: SYSTEM_TYPES.ClearScreenSystem, type: ClearScreenSystem },
            { name: SYSTEM_TYPES.RenderSystem, type: RenderSystem },
        ],
    ],
]);
