import { IRenderManager, renderManagerFactory } from "@angry-pixel/2d-renderer";
import { physicsManagerFactory, IPhysicsManager } from "@angry-pixel/2d-physics";
import { GameConfig } from "../GameConfig";
import { inputManagerFactory, IInputManager } from "@angry-pixel/input";
import { AssetManager } from "../managers/AssetManager";
import { DomManager, IDomManager } from "../managers/DomManager";
import { GameObjectManager, IGameObjectManager } from "../managers/GameObjectManager";
import { HeadlessIterationManager } from "../managers/HeadlessIterationManager";
import { IterationManager } from "../managers/IterationManager";
import { ISceneManager, SceneManager } from "../managers/SceneManager";
import { ITimeManager, TimeManager } from "../managers/TimeManager";
import { Container } from "../../utils/Container";

/** @internal */
export const loadDependencies = (container: Container, gameConfig: GameConfig): void => {
    container.addConstant("GameConfig", gameConfig);

    container.add("TimeManager", () => new TimeManager(gameConfig.physicsFramerate));
    container.add("GameObjectManager", () => new GameObjectManager(container));

    container.add("PhysicsManager", () => physicsManagerFactory(gameConfig.collisions));

    if (!gameConfig.headless) {
        container.add(
            "DomManager",
            () => new DomManager(gameConfig.containerNode, gameConfig.gameWidth, gameConfig.gameHeight),
        );

        const canvas: HTMLCanvasElement = container.getSingleton<IDomManager>("DomManager").canvas;

        container.add("RenderManager", () => renderManagerFactory(canvas));
        container.add("InputManager", () => inputManagerFactory(canvas));
        container.add("AssetManager", () => new AssetManager(container.getSingleton<IRenderManager>("RenderManager")));

        container.add(
            "IterationManager",
            () =>
                new IterationManager(
                    container.getSingleton<ITimeManager>("TimeManager"),
                    container.getSingleton<IPhysicsManager>("PhysicsManager"),
                    container.getSingleton<IRenderManager>("RenderManager"),
                    container.getSingleton<IInputManager>("InputManager"),
                    container.getSingleton<IGameObjectManager>("GameObjectManager"),
                    container.getSingleton<ISceneManager>("SceneManager"),
                    gameConfig.canvasColor,
                ),
        );
    } else {
        container.add(
            "IterationManager",
            () =>
                new HeadlessIterationManager(
                    container.getSingleton<ITimeManager>("TimeManager"),
                    container.getSingleton<IPhysicsManager>("PhysicsManager"),
                    container.getSingleton<IGameObjectManager>("GameObjectManager"),
                    container.getSingleton<ISceneManager>("SceneManager"),
                ),
        );
    }

    container.add(
        "SceneManager",
        () =>
            new SceneManager(
                container,
                !gameConfig.headless ? container.getSingleton<IRenderManager>("RenderManager") : undefined,
            ),
    );
};
