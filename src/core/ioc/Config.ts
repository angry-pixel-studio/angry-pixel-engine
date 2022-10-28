import { Game } from "../Game";
import { AssetManager } from "../managers/AssetManager";
import { CollisionManager } from "../../physics/collision/CollisionManager";
import { DomManager } from "../managers/DomManager";
import { GameObjectManager } from "../managers/GameObjectManager";
import { GamepadController } from "../../input/GamepadController";
import { InputManager } from "../../input/InputManager";
import { KeyboardController } from "../../input/KeyboardController";
import { MouseController } from "../../input/MouseController";
import { SceneManager } from "../managers/SceneManager";
import { TimeManager } from "../managers/TimeManager";
import { Container } from "../../utils/Container";
import { SatMethod } from "../../physics/collision/method/SatMethod";
import { TouchController } from "../../input/TouchController";
import { AABBMethod } from "../../physics/collision/method/AABBMethod";
import { Exception } from "../../utils/Exception";
import { IterationManager } from "../managers/IterationManager";
import { AssetManagerFacade } from "../facades/AssetManagerFacade";
import { DomManagerFacade } from "../facades/DomManagerFacade";
import { InputManagerFacade } from "../facades/InputManagerFacade";
import { SceneManagerFacade } from "../facades/SceneManagerFacade";
import { TimeManagerFacade } from "../facades/TimeManagerFacade";
import { GameObjectManagerFacade } from "../facades/GameObjectManagerFacade";
import { RigidBodyManager } from "../../physics/rigodBody/RigidBodyManager";
import { CollisionMethod } from "../../physics/collision/method/CollisionMethod";
import { AABBResolver } from "../../physics/collision/resolver/AABBResolver";
import { CircumferenceAABBResolver } from "../../physics/collision/resolver/CircumferenceAABBResolver";
import { CircumferenceResolver } from "../../physics/collision/resolver/CircumferenceResolver";
import { SatResolver } from "../../physics/collision/resolver/SatResolver";
import { HeadlessIterationManager } from "../managers/HeadlessIterationManager";
import { IRenderManager, renderManagerFactory } from "angry-pixel-2d-renderer";
import { CollisionMethodConfig, GameConfig } from "../GameConfig";

export const loadDependencies = (container: Container, gameConfig: GameConfig): void => {
    container.addConstant("GameConfig", gameConfig);

    container.add("TimeManager", () => new TimeManager(gameConfig.physicsFramerate));
    container.add("GameObjectManager", () => new GameObjectManager(container));

    physicsDependencies(container, gameConfig);

    if (!gameConfig.headless) {
        container.add(
            "DomManager",
            () => new DomManager(gameConfig.containerNode, gameConfig.gameWidth, gameConfig.gameHeight)
        );

        container.add("RenderManager", () =>
            renderManagerFactory(container.getSingleton<DomManager>("DomManager").canvas)
        );

        inputDependencies(container);

        container.add("AssetManager", () => new AssetManager());

        container.add(
            "IterationManager",
            () =>
                new IterationManager(
                    container.getSingleton<TimeManager>("TimeManager"),
                    container.getSingleton<CollisionManager>("CollisionManager"),
                    container.getSingleton<RigidBodyManager>("RigidBodyManager"),
                    container.getSingleton<IRenderManager>("RenderManager"),
                    container.getSingleton<InputManager>("InputManager"),
                    container.getSingleton<GameObjectManager>("GameObjectManager"),
                    container.getSingleton<SceneManager>("SceneManager"),
                    gameConfig.canvasColor
                )
        );
    } else {
        container.add(
            "IterationManager",
            () =>
                new HeadlessIterationManager(
                    container.getSingleton<TimeManager>("TimeManager"),
                    container.getSingleton<CollisionManager>("CollisionManager"),
                    container.getSingleton<RigidBodyManager>("RigidBodyManager"),
                    container.getSingleton<GameObjectManager>("GameObjectManager"),
                    container.getSingleton<SceneManager>("SceneManager")
                )
        );
    }

    container.add(
        "SceneManager",
        () =>
            new SceneManager(
                container,
                container.getConstant<Game>("Game"),
                !gameConfig.headless ? container.getSingleton<IRenderManager>("RenderManager") : undefined
            )
    );

    initializeFacades(container, gameConfig);
};

const physicsDependencies = (container: Container, gameConfig: GameConfig): void => {
    if (gameConfig.collisions.method === CollisionMethodConfig.AABB) {
        container.add(
            "CollisionMethod",
            () => new AABBMethod(new AABBResolver(), new CircumferenceAABBResolver(), new CircumferenceResolver())
        );
    } else if (gameConfig.collisions.method === CollisionMethodConfig.SAT) {
        container.add("CollisionMethod", () => new SatMethod(new CircumferenceResolver(), new SatResolver()));
    } else {
        throw new Exception("Invalid collision method.");
    }

    container.add(
        "CollisionManager",
        () =>
            new CollisionManager(
                container.getSingleton<CollisionMethod>("CollisionMethod"),
                gameConfig.collisions.quadMaxLevel,
                gameConfig.collisions.collidersPerQuad,
                gameConfig.collisions.quadTreeBounds,
                gameConfig.collisions.collisionMatrix
            )
    );

    container.add(
        "RigidBodyManager",
        () => new RigidBodyManager(container.getSingleton<CollisionManager>("CollisionManager"))
    );
};

const inputDependencies = (container: Container): void => {
    const domManager = container.getSingleton<DomManager>("DomManager");

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

const initializeFacades = (container: Container, gameConfig: GameConfig): void => {
    if (!gameConfig.headless) {
        AssetManagerFacade.initialize(container.getSingleton<AssetManager>("AssetManager"));
        DomManagerFacade.initialize(container.getSingleton<DomManager>("DomManager"));
        InputManagerFacade.initialize(container.getSingleton<InputManager>("InputManager"));
    }

    SceneManagerFacade.initialize(container.getSingleton<SceneManager>("SceneManager"));
    TimeManagerFacade.initialize(container.getSingleton<TimeManager>("TimeManager"));
    GameObjectManagerFacade.initialize(container.getSingleton<GameObjectManager>("GameObjectManager"));
};
