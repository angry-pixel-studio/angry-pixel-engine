import { Container, DependencyName } from "@ioc";
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
} from "@collisions2d";
import { CollisionMatrix } from "@system/physics2d/ResolveCollisionSystem";
import { TYPES } from "./types";
import { EntityManager, System, SystemManager } from "@ecs";
import { InputManager } from "@manager/InputManager";
import { defaultPhysicsFramerate, TimeManager } from "@manager/TimeManager";
import { AssetManager } from "@manager/AssetManager";
import { SceneManager } from "@manager/SceneManager";
import { LoopManager } from "@manager/LoopManager";
import { SystemsByGroup, systemsByGroup } from "./systemsByGroup";
import { CreateSystemService } from "@system/CreateSystemService";
import { WebGLManager } from "@webgl";
import { RenderManager } from "@manager/RenderManager";
import { SystemGroup } from "@system/SystemGroup";
import { SYSTEMS } from "./systemTypes";

/**
 * Game configuration options
 * @public
 * @category Config
 *  @example
 * ```js
 * const gameConfig = {
 *   containerNode: document.getElementById("app"),
 *   width: 1920,
 *   height: 1080,
 *   debugEnabled: false,
 *   canvasColor: "#000000",
 *   physicsFramerate: 180,
 *   headless: false,
 *   dependencies: [[Symbol.for("DependencyName"), dependencyInstance]],
 *   collisions: {
 *     collisionMatrix: [
 *       ["layer1", "layer2"],
 *       ["layer1", "layer3"],
 *     ],
 *     collisionMethod: CollisionMethods.SAT,
 *     collisionBroadPhaseMethod: BroadPhaseMethods.SpartialGrid,
 *   }
 * };
 * ```
 */
export interface GameConfig {
    /** HTML element where the game will be created */
    containerNode: HTMLElement;
    /** Game width */
    width: number;
    /** Game height */
    height: number;
    /** Debug options */
    debug?: {
        /** Show colliders */
        colliders: boolean;
        /** Show mouse position */
        mousePosition: boolean;
        /** Color of the colliders, default "#00FF00" (green) */
        collidersColor?: string;
        /** Color of the text, default "#00FF00" (green) */
        textColor?: string;
        /** Position of debug text, default "bottom-left" */
        textPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    };
    /** Background color of canvas, default "#000000" (black) */
    canvasColor?: string;
    /** Framerate for physics execution. The allowed values are 60, 120, 180, 240.
     * The higher the framerate, the more accurate the physics will be, but it will consume more processor resources.
     * Default value is 180.
     */
    physicsFramerate?: number;
    /** Enable Headless mode. The input and rendering functions are turned off. Ideal for game server development */
    headless?: boolean;
    /** External elements which can be accessed through dependency injection.*/
    dependencies?: [DependencyName, any][];
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

    setupPhysicsDependencies(container);
    setupManagers(container);
    setupEngineSystems(container);
    setupExternalDependencies(container);

    return container;
};

const setDefaultValues = (gameConfig: GameConfig) => {
    if (!(gameConfig.containerNode instanceof HTMLElement)) throw new Error("GameConfig Error: Invalid containerNode");
    if (typeof gameConfig.width !== "number") throw new Error("GameConfig Error: Invalid width");
    if (typeof gameConfig.height !== "number") throw new Error("GameConfig Error: Invalid height");

    gameConfig.canvasColor = gameConfig.canvasColor ?? "#000000";
    gameConfig.physicsFramerate = gameConfig.physicsFramerate ?? defaultPhysicsFramerate;
    gameConfig.headless = gameConfig.headless ?? false;

    gameConfig.debug = gameConfig.debug ?? { colliders: false, mousePosition: false };
    gameConfig.debug.collidersColor = gameConfig.debug.collidersColor ?? "#00FF00";
    gameConfig.debug.textColor = gameConfig.debug.textColor ?? "#00FF00";
    gameConfig.debug.textPosition = gameConfig.debug.textPosition ?? "bottom-left";

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
    container.set(
        TYPES.CreateSystemService,
        new CreateSystemService(container, container.get<SystemManager>(TYPES.SystemManager)),
    );
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
    // headless means that the engine will run without rendering, audio and input systems
    // this mode is ideal for game server development
    if (container.get<GameConfig>(TYPES.GameConfig).headless) headlessFilter(systemsByGroup);

    systemsByGroup.forEach((systems, group) =>
        systems.forEach(({ type, name }) => {
            container.add(type);
            container.get<SystemManager>(TYPES.SystemManager).addSystem(container.get<System>(name), group);
        }),
    );
};

/**
 * Remove rendering, audio and input systems from the list of systems to be executed
 */
const headlessFilter = (systemsByGroup: SystemsByGroup): void => {
    systemsByGroup.delete(SystemGroup.Render);
    systemsByGroup.set(
        SystemGroup.PreGameLogic,
        systemsByGroup
            .get(SystemGroup.PreGameLogic)
            .filter(
                ({ name }) =>
                    ![
                        SYSTEMS.AudioPlayerSystem,
                        SYSTEMS.ButtonSystem,
                        SYSTEMS.GamepadSystem,
                        SYSTEMS.KeyboardSystem,
                        SYSTEMS.MouseSystem,
                        SYSTEMS.TouchScreenSystem,
                    ].includes(name),
            ),
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

const setupExternalDependencies = (container: Container): void => {
    const config = container.get<GameConfig>(TYPES.GameConfig);
    if (!config.dependencies) return;

    config.dependencies.forEach(([name, dependency]) => {
        container.set(name, dependency);
    });
};
