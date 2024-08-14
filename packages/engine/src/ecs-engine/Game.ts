import { IInputManager, inputManagerFactory } from "../input";
import { IRenderManager, renderManagerFactory } from "../2d-renderer";
import {
    BroadPhaseMethods,
    CollisionMatrix,
    CollisionMethods,
    IPhysicsManager,
    physicsManagerFactory,
} from "../2d-physics";
import { AssetManager, IAssetManager } from "./manager/AssetManager";
import { ILoopManager, LoopManager } from "./manager/LoopManager";
import { ISceneManager, SceneManager } from "./manager/SceneManager";
import { ITimeManager, TimeManager } from "./manager/TimeManager";
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
import { CollisionQueryManager, ICollisionQueryManager } from "./manager/CollisionQueryManager";
import { ShadowLightRendererSystem } from "./system/renderer/ShadowLightRendererSystem";
import { AudioPlayerSystem } from "./system/preGameLogic/AudioPlayerSystem";
import { EntityManager } from "../ecs/EntityManager";
import { SystemManager, SystemType } from "../ecs/SystemManager";
import { GameSystem, getSystemGroup, SystemGroup } from "./system/GameSystem";

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
    private config: IGameConfig;
    private canvas: HTMLCanvasElement;
    private assetManager: IAssetManager;
    private entityManager: EntityManager;
    private loopManager: ILoopManager;
    private sceneManager: ISceneManager;
    private systemManager: SystemManager;
    private timeManager: ITimeManager;
    private inputManager: IInputManager;
    private renderManager: IRenderManager;
    private physicsManager: IPhysicsManager;
    private collisionQueryManager: ICollisionQueryManager;

    constructor(config: IGameConfig) {
        this.config = config;
        this.canvas = this.createCanvas(config);

        this.initializeManagers(config);
        this.initializeSystems(config);
    }

    public get running(): boolean {
        return this.loopManager.running;
    }

    public start(): void {
        this.enableSystems(this.config.debugEnabled);
        this.loopManager.start();
    }

    public stop(): void {
        this.loopManager.stop();
    }

    public addScene(name: string, systemTypes: SystemType<GameSystem>[], openingScene?: boolean): void {
        systemTypes.forEach((systemType) => this.gameSystemFactory(systemType));

        this.sceneManager.addScene(name, systemTypes, openingScene);
    }

    private gameSystemFactory<T extends GameSystem>(systemType: SystemType<T>): T {
        if (this.systemManager.hasSystem(systemType)) return;

        const system = new systemType(
            this.entityManager,
            this.assetManager,
            this.sceneManager,
            this.timeManager,
            this.inputManager,
            this.collisionQueryManager,
        );

        this.systemManager.addSystem(system, getSystemGroup(systemType));
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

    private initializeManagers({ physicsFramerate, collisions }: IGameConfig): void {
        this.entityManager = new EntityManager();
        this.systemManager = new SystemManager();
        this.timeManager = new TimeManager(physicsFramerate);
        this.assetManager = new AssetManager();
        this.sceneManager = new SceneManager(this.entityManager, this.systemManager);
        this.loopManager = new LoopManager(this.timeManager, this.sceneManager, this.systemManager);

        this.inputManager = inputManagerFactory(this.canvas);
        this.renderManager = renderManagerFactory(this.canvas);
        this.physicsManager = physicsManagerFactory(collisions);

        this.collisionQueryManager = new CollisionQueryManager(this.physicsManager);
    }

    private initializeSystems({ canvasColor, collisions: { collisionMethod } }: IGameConfig): void {
        // pre game logic
        this.systemManager.addSystem(new InputSystem(this.inputManager), SystemGroup.PreGameLogic);
        this.systemManager.addSystem(new ButtonSystem(this.entityManager, this.inputManager), SystemGroup.PreGameLogic);
        this.systemManager.addSystem(new TiledWrapperSystem(this.entityManager), SystemGroup.PreGameLogic);
        this.systemManager.addSystem(new TilemapPreProcessingSystem(this.entityManager), SystemGroup.PreGameLogic);
        this.systemManager.addSystem(
            new AudioPlayerSystem(this.entityManager, this.inputManager, this.timeManager),
            SystemGroup.PreGameLogic,
        );

        // post game logic
        this.systemManager.addSystem(new TransformSystem(this.entityManager), SystemGroup.PostGameLogic);

        // render
        this.systemManager.addSystem(new ClearScreenSystem(this.renderManager, canvasColor), SystemGroup.Render);
        this.systemManager.addSystem(new CameraSystem(this.entityManager, this.renderManager), SystemGroup.Render);
        this.systemManager.addSystem(new AnimatorSystem(this.entityManager, this.timeManager), SystemGroup.Render);
        this.systemManager.addSystem(
            new TilemapRendererSystem(this.entityManager, this.renderManager),
            SystemGroup.Render,
        );
        this.systemManager.addSystem(
            new SpriteRendererSystem(this.entityManager, this.renderManager),
            SystemGroup.Render,
        );
        this.systemManager.addSystem(
            new MaskRendererSystem(this.entityManager, this.renderManager),
            SystemGroup.Render,
        );
        this.systemManager.addSystem(
            new TextRendererSystem(this.entityManager, this.renderManager),
            SystemGroup.Render,
        );
        this.systemManager.addSystem(
            new VideoRendererSystem(this.entityManager, this.renderManager, this.timeManager),
            SystemGroup.Render,
        );
        this.systemManager.addSystem(
            new ShadowLightRendererSystem(this.entityManager, this.renderManager),
            SystemGroup.Render,
        );
        this.systemManager.addSystem(
            new ColliderRenderSystem(this.physicsManager, this.renderManager, collisionMethod),
            SystemGroup.Render,
        );
        this.systemManager.addSystem(new RenderSystem(this.renderManager), SystemGroup.Render);

        // physics
        this.systemManager.addSystem(
            new PhysicsTransformSystem(this.entityManager, this.physicsManager),
            SystemGroup.Physics,
        );
        this.systemManager.addSystem(new RigidBodySystem(this.entityManager, this.physicsManager), SystemGroup.Physics);
        this.systemManager.addSystem(
            new BoxColliderSystem(this.entityManager, this.physicsManager),
            SystemGroup.Physics,
        );
        this.systemManager.addSystem(
            new BallColliderSystem(this.entityManager, this.physicsManager),
            SystemGroup.Physics,
        );
        this.systemManager.addSystem(
            new EdgeColliderSystem(this.entityManager, this.physicsManager),
            SystemGroup.Physics,
        );
        this.systemManager.addSystem(
            new PolygonColliderSystem(this.entityManager, this.physicsManager),
            SystemGroup.Physics,
        );
        this.systemManager.addSystem(
            new TilemapColliderSystem(this.entityManager, this.physicsManager),
            SystemGroup.Physics,
        );
        this.systemManager.addSystem(new PhysicsSystem(this.physicsManager, this.timeManager), SystemGroup.Physics);
    }

    private enableSystems(debugEnabled: boolean): void {
        // pre game logic
        this.systemManager.enableSystem(InputSystem);
        this.systemManager.enableSystem(ButtonSystem);
        this.systemManager.enableSystem(TiledWrapperSystem);
        this.systemManager.enableSystem(TilemapPreProcessingSystem);
        this.systemManager.enableSystem(AudioPlayerSystem);

        // post game logic
        this.systemManager.enableSystem(TransformSystem);

        // render
        this.systemManager.enableSystem(ClearScreenSystem);
        this.systemManager.enableSystem(CameraSystem);
        this.systemManager.enableSystem(AnimatorSystem);
        this.systemManager.enableSystem(TilemapRendererSystem);
        this.systemManager.enableSystem(SpriteRendererSystem);
        this.systemManager.enableSystem(MaskRendererSystem);
        this.systemManager.enableSystem(TextRendererSystem);
        this.systemManager.enableSystem(VideoRendererSystem);
        this.systemManager.enableSystem(ShadowLightRendererSystem);
        this.systemManager.enableSystem(RenderSystem);

        if (debugEnabled) {
            this.systemManager.enableSystem(ColliderRenderSystem);
        }

        // physics
        this.systemManager.enableSystem(PhysicsTransformSystem);
        this.systemManager.enableSystem(RigidBodySystem);
        this.systemManager.enableSystem(BoxColliderSystem);
        this.systemManager.enableSystem(BallColliderSystem);
        this.systemManager.enableSystem(EdgeColliderSystem);
        this.systemManager.enableSystem(PolygonColliderSystem);
        this.systemManager.enableSystem(TilemapColliderSystem);
        this.systemManager.enableSystem(PhysicsSystem);
    }
}
