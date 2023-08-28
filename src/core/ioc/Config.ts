import { AssetManager } from "../managers/AssetManager";
import { DomManager, IDomManager } from "../managers/DomManager";
import { GameObjectManager, IGameObjectManager } from "../managers/GameObjectManager";
import { GamepadController } from "../../input/GamepadController";
import { IInputManager, InputManager } from "../../input/InputManager";
import { KeyboardController } from "../../input/KeyboardController";
import { MouseController } from "../../input/MouseController";
import { ISceneManager, SceneManager } from "../managers/SceneManager";
import { ITimeManager, TimeManager } from "../managers/TimeManager";
import { Container } from "../../utils/Container";
import { TouchController } from "../../input/TouchController";
import { IterationManager } from "../managers/IterationManager";
import { HeadlessIterationManager } from "../managers/HeadlessIterationManager";
import { IRenderManager, renderManagerFactory } from "angry-pixel-2d-renderer";
import { physicsManagerFactory, IPhysicsManager } from "angry-pixel-2d-physics";
import { GameConfig } from "../GameConfig";

export const loadDependencies = (container: Container, gameConfig: GameConfig): void => {
    container.addConstant("GameConfig", gameConfig);

    container.add("TimeManager", () => new TimeManager(gameConfig.physicsFramerate));
    container.add("GameObjectManager", () => new GameObjectManager(container));

    container.add("PhysicsManager", () => physicsManagerFactory(gameConfig.collisions));

    if (!gameConfig.headless) {
        container.add(
            "DomManager",
            () => new DomManager(gameConfig.containerNode, gameConfig.gameWidth, gameConfig.gameHeight)
        );

        container.add("RenderManager", () =>
            renderManagerFactory(container.getSingleton<IDomManager>("DomManager").canvas)
        );

        inputDependencies(container);

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
                    gameConfig.canvasColor
                )
        );
    } else {
        container.add(
            "IterationManager",
            () =>
                new HeadlessIterationManager(
                    container.getSingleton<ITimeManager>("TimeManager"),
                    container.getSingleton<IPhysicsManager>("PhysicsManager"),
                    container.getSingleton<IGameObjectManager>("GameObjectManager"),
                    container.getSingleton<ISceneManager>("SceneManager")
                )
        );
    }

    container.add(
        "SceneManager",
        () =>
            new SceneManager(
                container,
                !gameConfig.headless ? container.getSingleton<IRenderManager>("RenderManager") : undefined
            )
    );
};

const inputDependencies = (container: Container): void => {
    const domManager = container.getSingleton<IDomManager>("DomManager");

    container.add(
        "InputManager",
        () =>
            new InputManager(
                new MouseController(domManager.canvas),
                new KeyboardController(domManager.canvas),
                new GamepadController(),
                new TouchController(domManager.canvas)
            )
    );
};
