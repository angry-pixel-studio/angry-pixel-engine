import { Container } from "@ioc";
import {
    AABBMethod,
    AABBResolver,
    BroadPhaseMethods,
    CircumferenceAABBResolver,
    CircumferenceResolver,
    CollisionMethods,
    CollisionRepository,
    QuadTree,
    SatMethod,
    SatResolver,
    SpartialGrid,
} from "@physics2d";
import { CollisionMatrix } from "@system/physics2d/ResolveCollisionSystem";
import { TYPES } from "./types";
import { EntityManager, System, SystemManager } from "@ecs";
import { InputManager } from "@manager/InputManager";
import { defaultPhysicsFramerate, TimeManager } from "@manager/TimeManager";
import { AssetManager } from "@manager/AssetManager";
import { SceneManager } from "@manager/SceneManager";
import { LoopManager } from "@manager/LoopManager";
import { systemTypes } from "./systemTypes";
import { SystemFactory } from "@system/SystemFactory";
import { WebGLManager } from "@webgl";
import { RenderManager } from "@manager/RenderManager";

export interface GameConfig {
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

export const bootstrap = (gameConfig: GameConfig): Container => {
    setDefaultValues(gameConfig);

    const container = new Container();

    container.set(TYPES.GameConfig, gameConfig);
    container.set(TYPES.CanvasElement, createCanvas(gameConfig));

    setupManagers(container);
    setupEngineSystems(container);
    setupPhysicsDependencies(container);

    return container;
};

const setDefaultValues = (gameConfig: GameConfig) => {
    if (!(gameConfig.containerNode instanceof HTMLElement)) throw new Error("GameConfig Error: Invalid containerNode");
    if (typeof gameConfig.width !== "number") throw new Error("GameConfig Error: Invalid width");
    if (typeof gameConfig.height !== "number") throw new Error("GameConfig Error: Invalid height");

    gameConfig.debugEnabled = gameConfig.debugEnabled ?? false;
    gameConfig.canvasColor = gameConfig.canvasColor ?? "#000000";
    gameConfig.physicsFramerate = gameConfig.physicsFramerate ?? defaultPhysicsFramerate;

    gameConfig.collisions = gameConfig.collisions ?? {};
    gameConfig.collisions.collisionBroadPhaseMethod =
        gameConfig.collisions.collisionBroadPhaseMethod ?? BroadPhaseMethods.SpartialGrid;
    gameConfig.collisions.collisionMatrix = gameConfig.collisions.collisionMatrix ?? undefined;
    gameConfig.collisions.collisionMethod = gameConfig.collisions.collisionMethod ?? CollisionMethods.SAT;
};

const createCanvas = ({ containerNode, width, height }: Partial<GameConfig>): HTMLCanvasElement => {
    const canvas = document.createElement("canvas");

    canvas.id = "angryPixelGameCanvas";
    canvas.width = Math.floor(width);
    canvas.height = Math.floor(height);
    canvas.tabIndex = 0;
    canvas.addEventListener("contextmenu", (e: MouseEvent) => e.preventDefault());
    containerNode.appendChild(canvas);
    canvas.focus();

    return canvas;
};

const setupManagers = (container: Container): void => {
    container.add(EntityManager);
    container.add(SystemManager);
    container.set(TYPES.SystemFactory, new SystemFactory(container, container.get<SystemManager>(TYPES.SystemManager)));
    container.add(TimeManager);
    container.add(AssetManager);
    container.add(InputManager);
    container.add(SceneManager);
    container.add(InputManager);
    container.add(LoopManager);
    container.add(WebGLManager);
    container.add(RenderManager);
};

const setupEngineSystems = (container: Container): void => {
    systemTypes.forEach((systems, group) =>
        systems.forEach(({ type, name }) => {
            container.add(type);
            container.get<SystemManager>(TYPES.SystemManager).addSystem(container.get<System>(name), group);
        }),
    );
};

const setupPhysicsDependencies = (container: Container): void => {
    const {
        collisions: { collisionBroadPhaseMethod, collisionMatrix, collisionMethod },
    } = container.get<GameConfig>(TYPES.GameConfig);

    container.add(CollisionRepository);
    container.add(CircumferenceResolver);

    if (collisionMethod === CollisionMethods.AABB) {
        container.add(AABBResolver);
        container.add(CircumferenceAABBResolver);
    } else {
        container.add(SatResolver);
    }

    container.add(collisionBroadPhaseMethod === BroadPhaseMethods.QuadTree ? QuadTree : SpartialGrid);
    container.add(collisionMethod === CollisionMethods.AABB ? AABBMethod : SatMethod);

    container.set(TYPES.CollisionMatrix, collisionMatrix);
};
