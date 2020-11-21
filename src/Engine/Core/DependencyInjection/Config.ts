import { Game } from "../../Game";
import { AssetManager } from "../Asset/AssetManager";
import { CollisionManager } from "../Collision/CollisionManager";
import { DomManager } from "../Dom/DomManager";
import { GameObjectManager } from "../GameObject/GameObjectManager";
import { GamepadController } from "../Input/GamepadController";
import { InputManager } from "../Input/InputManager";
import { KeyboardController } from "../Input/KeyboardController";
import { MouseController } from "../Input/MouseController";
import { Context2DRenderer } from "../Rendering/Context2D/Context2DRenderer";
import { RenderManager } from "../Rendering/RenderManager";
import { WebGLImageRenderer } from "../Rendering/WebGL/WebGLImageRenderer";
import { ProgramFactory } from "../Rendering/WebGL/ProgramFactory";
import { ShaderLoader } from "../Rendering/WebGL/ShaderLoader";
import { TextureFactory } from "../Rendering/WebGL/TextureFactory";
import { WebGLRenderer } from "../Rendering/WebGL/WebGLRenderer";
import { SceneManager } from "../Scene/SceneManager";
import { TimeManager } from "../Time/TimeManager";
import { Container } from "./Container";

export const loadDependencies = (container: Container, game: Game): void => {
    container.add(
        "DomManager",
        () =>
            new DomManager(
                game.config.containerNode,
                game.config.gameWidth,
                game.config.gameHeight,
                game.config.uiEnabled,
                game.config.debugEnabled
            )
    );

    const domManager: DomManager = container.getSingleton<DomManager>("DomManager");

    renderingDependencies(container, domManager);
    inputDependencies(container, domManager);

    container.add("SceneManager", () => new SceneManager(game, container.getSingleton<RenderManager>("RenderManager")));
    container.add(
        "CollisionManager",
        () => new CollisionManager(container.getSingleton<RenderManager>("RenderManager"))
    );
    container.add("GameObjectManager", () => new GameObjectManager());
    container.add("AssetManager", () => new AssetManager());
    container.add("TimeManager", () => new TimeManager());
};

const renderingDependencies = (container: Container, domManager: DomManager): void => {
    webGLDependencies(container, domManager);

    if (domManager.uiCanvas !== null) {
        container.add("UIRenderer", () => new Context2DRenderer(domManager.uiCanvas));
    }

    if (domManager.debugCanvas !== null) {
        container.add("DebugRenderer", () => new Context2DRenderer(domManager.debugCanvas));
    }

    container.add(
        "RenderManager",
        () =>
            new RenderManager(
                container.getSingleton<WebGLRenderer>("GameRenderer"),
                domManager.uiCanvas !== null ? container.getSingleton<Context2DRenderer>("UIRenderer") : null,
                domManager.debugCanvas !== null ? container.getSingleton<Context2DRenderer>("DebugRenderer") : null
            )
    );
};

const webGLDependencies = (container: Container, domManager: DomManager): void => {
    container.add("ShaderLoader", () => new ShaderLoader());
    container.add("ProgramFactory", () => new ProgramFactory(container.getSingleton<ShaderLoader>("ShaderLoader")));
    container.add("TextureFactory", () => new TextureFactory());

    container.add(
        "WebGLImageRenderer",
        () =>
            new WebGLImageRenderer(
                domManager.gameCanvas,
                container.getSingleton<ProgramFactory>("ProgramFactory"),
                container.getSingleton<TextureFactory>("TextureFactory")
            )
    );

    container.add(
        "GameRenderer",
        () => new WebGLRenderer(domManager.gameCanvas, container.getSingleton<WebGLImageRenderer>("WebGLImageRenderer"))
    );
};

const inputDependencies = (container: Container, domManager: DomManager): void => {
    container.add("Mouse", () => new MouseController(domManager.gameNode, domManager.gameCanvas));
    container.add("Keyboard", () => new KeyboardController());
    container.add("Gamepad", () => new GamepadController());
    container.add(
        "InputManager",
        () =>
            new InputManager(
                container.getSingleton<MouseController>("Mouse"),
                container.getSingleton<KeyboardController>("Keyboard"),
                container.getSingleton<GamepadController>("Gamepad")
            )
    );
};
