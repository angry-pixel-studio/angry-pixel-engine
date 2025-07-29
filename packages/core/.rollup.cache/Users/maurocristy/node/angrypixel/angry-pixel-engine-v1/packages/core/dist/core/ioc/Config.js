import { renderManagerFactory } from "@angry-pixel/2d-renderer";
import { physicsManagerFactory } from "@angry-pixel/2d-physics";
import { inputManagerFactory } from "@angry-pixel/input";
import { AssetManager } from "../managers/AssetManager";
import { DomManager } from "../managers/DomManager";
import { GameObjectManager } from "../managers/GameObjectManager";
import { HeadlessIterationManager } from "../managers/HeadlessIterationManager";
import { IterationManager } from "../managers/IterationManager";
import { SceneManager } from "../managers/SceneManager";
import { TimeManager } from "../managers/TimeManager";
/** @internal */
export const loadDependencies = (container, gameConfig) => {
    container.addConstant("GameConfig", gameConfig);
    container.add("TimeManager", () => new TimeManager(gameConfig.physicsFramerate));
    container.add("GameObjectManager", () => new GameObjectManager(container));
    container.add("PhysicsManager", () => physicsManagerFactory(gameConfig.collisions));
    if (!gameConfig.headless) {
        container.add("DomManager", () => new DomManager(gameConfig.containerNode, gameConfig.gameWidth, gameConfig.gameHeight));
        const canvas = container.getSingleton("DomManager").canvas;
        container.add("RenderManager", () => renderManagerFactory(canvas));
        container.add("InputManager", () => inputManagerFactory(canvas));
        container.add("AssetManager", () => new AssetManager(container.getSingleton("RenderManager")));
        container.add("IterationManager", () => new IterationManager(container.getSingleton("TimeManager"), container.getSingleton("PhysicsManager"), container.getSingleton("RenderManager"), container.getSingleton("InputManager"), container.getSingleton("GameObjectManager"), container.getSingleton("SceneManager"), gameConfig.canvasColor));
    }
    else {
        container.add("IterationManager", () => new HeadlessIterationManager(container.getSingleton("TimeManager"), container.getSingleton("PhysicsManager"), container.getSingleton("GameObjectManager"), container.getSingleton("SceneManager")));
    }
    container.add("SceneManager", () => new SceneManager(container, !gameConfig.headless ? container.getSingleton("RenderManager") : undefined));
};
//# sourceMappingURL=Config.js.map