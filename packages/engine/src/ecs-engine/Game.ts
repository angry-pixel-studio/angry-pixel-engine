import { inputManagerFactory } from "../input";
import { renderManagerFactory } from "../2d-renderer";
import { BroadPhaseMethods, CollisionMatrix, CollisionMethods, physicsManagerFactory } from "../2d-physics";
import { AssetManager } from "./manager/AssetManager";
import { ILoopManager, LoopManager } from "./manager/LoopManager";
import { ISceneManager, SceneManager } from "./manager/SceneManager";
import { TimeManager } from "./manager/TimeManager";
import { TransformSystem } from "./system/postGameLogic/TransformSystem";
import { ClearScreenSystem } from "./system/renderer/ClearScreenSystem";
import { CameraSystem } from "./system/renderer/CameraSystem";
import { SpriteRendererSystem } from "./system/renderer/SpriteRendererSystem";
import { TextRendererSystem } from "./system/renderer/TextRendererSystem";
import { MaskRendererSystem } from "./system/renderer/MaskRendererSystem";
import { VideoRendererSystem } from "./system/renderer/VideoRendererSystem";
import { RenderSystem } from "./system/renderer/RenderSystem";
import { InputSystem } from "./system/preGameLogic/InputSystem";
import { PhysicsSystem } from "./system/physics/PhysicsSystem";
import { PhysicsTransformSystem } from "./system/physics/PhysicsTransformSystem";
import { RigidBodySystem } from "./system/physics/RigidBodySystem";
import { BoxColliderSystem } from "./system/physics/collider/BoxColliderSystem";
import { ColliderRenderSystem } from "./system/renderer/ColliderRenderSystem";
import { BallColliderSystem } from "./system/physics/collider/BallColliderSystem";
import { PolygonColliderSystem } from "./system/physics/collider/PolygonColliderSystem";
import { AnimatorSystem } from "./system/renderer/AnimatorSystem";
import { ButtonSystem } from "./system/preGameLogic/ButtonSystem";
import { TilemapRendererSystem } from "./system/renderer/TilemapRendererSystem";
import { TiledWrapperSystem } from "./system/preGameLogic/TiledWrapperSystem";
import { TilemapColliderSystem } from "./system/physics/collider/TilemapColliderSystem";
import { EdgeColliderSystem } from "./system/physics/collider/EdgeColliderSystem";
import { TilemapPreProcessingSystem } from "./system/preGameLogic/TilemapPreProcessingSystem";
import { CollisionQueryManager } from "./manager/CollisionQueryManager";
import { ShadowLightRendererSystem } from "./system/renderer/ShadowLightRendererSystem";
import { AudioPlayerSystem } from "./system/preGameLogic/AudioPlayerSystem";
import { EntityManager } from "../ecs/EntityManager";
import { System, SystemManager, SystemType } from "../ecs/SystemManager";
import { GameSystem, getSystemGroup, SystemGroup } from "./system/GameSystem";
import { ParentSystem } from "./system/postGameLogic/ParentSystem";
import { ChildrenSystem } from "./system/postGameLogic/ChildrenSystem";
import { Container } from "../ioc/container";
import { TYPES } from "./config/types";

export interface IGameConfig {
    /** HTML element where the game will be created */
    containerNode: HTMLElement;
    /** Game width */
    width: number;
    /** Game height */
    height: number;
    /** Enables the debug mode */
    debugEnabled?: boolean;
    /** Background color of canvas */
    canvasColor?: string;
    /** Framerate for physics execution. The allowed values are 60, 120, 180, 240.
     * The higher the framerate, the more accurate the physics will be, but it will consume more processor resources.
     * Default value is 180.
     */
    physicsFramerate?: number;
    /** Collision configuration options */
    collisions?: {
        /** Collision detection method: CollisionMethods.SAT or CollisionMethods.ABB. Default value is CollisionMethods.SAT */
        collisionMethod?: CollisionMethods;
        /** Define a fixed rectangular area for collision detection */
        collisionMatrix?: CollisionMatrix;
        /** Collision broad phase method: BroadPhaseMethods.QuadTree or BroadPhaseMethods.SpartialGrid. Default values is BroadPhaseMethods.SpartialGrid */
        collisionBroadPhaseMethod?: BroadPhaseMethods;
    };
}

export interface IGame {
    running: boolean;
    start(): void;
    stop(): void;
    addScene(name: string, systemTypes: SystemType[], openingScene?: boolean): void;
}

export const canvasId = "angryPixelGameCanvas";

export class Game implements IGame {
    private container: Container;
    private gameSystemCounter: number = 0;

    constructor(config: IGameConfig) {
        this.container = new Container();
        this.container.set(TYPES.GameConfig, config);
        this.container.set(TYPES.CanvasElement, this.createCanvas(config));

        this.initializeManagers();
        this.initializeSystems();
    }

    public get running(): boolean {
        return this.container.get<ILoopManager>(TYPES.LoopManager).running;
    }

    public start(): void {
        this.enableSystems();
        this.container.get<ILoopManager>(TYPES.LoopManager).start();
    }

    public stop(): void {
        this.container.get<ILoopManager>(TYPES.LoopManager).stop();
    }

    public addScene(name: string, systemTypes: SystemType<GameSystem>[], openingScene?: boolean): void {
        systemTypes.forEach((systemType) => this.gameSystemFactory(systemType));

        this.container.get<ISceneManager>(TYPES.SceneManager).addScene(name, systemTypes, openingScene);
    }

    private gameSystemFactory<T extends GameSystem>(systemType: SystemType<T>): void {
        if (!systemType.prototype._type_id) systemType.prototype._type_id = `System${this.gameSystemCounter++}`;
        const name = systemType.prototype._type_id;

        if (!this.container.has(name)) {
            this.container.add(systemType, name);
            this.container
                .get<SystemManager>(TYPES.SystemManager)
                .addSystem(this.container.get<GameSystem>(name), getSystemGroup(systemType));
        }
    }

    private createCanvas({ containerNode, width, height }: IGameConfig): HTMLCanvasElement {
        const canvas = document.createElement("canvas");

        canvas.id = canvasId;
        canvas.width = Math.floor(width);
        canvas.height = Math.floor(height);
        canvas.tabIndex = 0;
        canvas.addEventListener("contextmenu", (e: MouseEvent) => e.preventDefault());
        containerNode.appendChild(canvas);
        canvas.focus();

        return canvas;
    }

    private initializeManagers(): void {
        const canvasElement = this.container.get<HTMLCanvasElement>(TYPES.CanvasElement);
        const gameConfig = this.container.get<IGameConfig>(TYPES.GameConfig);

        // external
        this.container.set(TYPES.EntityManager, new EntityManager());
        this.container.set(TYPES.SystemManager, new SystemManager());
        this.container.set(TYPES.InputManager, inputManagerFactory(canvasElement));
        this.container.set(TYPES.RenderManager, renderManagerFactory(canvasElement));
        this.container.set(TYPES.PhysicsManager, physicsManagerFactory(gameConfig.collisions));

        this.container.add(TimeManager);
        this.container.add(AssetManager);
        this.container.add(SceneManager);
        this.container.add(LoopManager);
        this.container.add(CollisionQueryManager);
    }

    private getEngineSystemTypes(): Map<SystemGroup, SystemType[]> {
        return new Map([
            [
                SystemGroup.PreGameLogic,
                [InputSystem, ButtonSystem, TiledWrapperSystem, TilemapPreProcessingSystem, AudioPlayerSystem],
            ],
            [SystemGroup.PostGameLogic, [TransformSystem, ChildrenSystem, ParentSystem]],
            [
                SystemGroup.Render,
                [
                    ClearScreenSystem,
                    CameraSystem,
                    AnimatorSystem,
                    TilemapRendererSystem,
                    SpriteRendererSystem,
                    MaskRendererSystem,
                    TextRendererSystem,
                    VideoRendererSystem,
                    ShadowLightRendererSystem,
                    RenderSystem,
                    ColliderRenderSystem,
                ],
            ],
            [
                SystemGroup.Physics,
                [
                    PhysicsTransformSystem,
                    RigidBodySystem,
                    BoxColliderSystem,
                    BallColliderSystem,
                    EdgeColliderSystem,
                    PolygonColliderSystem,
                    TilemapColliderSystem,
                    PhysicsSystem,
                ],
            ],
        ]);
    }

    private initializeSystems(): void {
        this.getEngineSystemTypes().forEach((systemTypes, systemGroup) => {
            systemTypes.forEach((systemType) => {
                const name = `System${this.gameSystemCounter++}`;
                this.container.add(systemType, name);
                this.container
                    .get<SystemManager>(TYPES.SystemManager)
                    .addSystem(this.container.get<System>(name), systemGroup);
            });
        });
    }

    private enableSystems(): void {
        this.getEngineSystemTypes().forEach((systemTypes) => {
            systemTypes.forEach((systemType) =>
                this.container.get<SystemManager>(TYPES.SystemManager).enableSystem(systemType),
            );
        });
    }
}
