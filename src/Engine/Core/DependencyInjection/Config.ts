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
import { TextureManager } from "../Rendering/WebGL/TextureManager";

export const loadDependencies = (container: Container, game: Game): void => {
    container.add(
        "DomManager",
        () => new DomManager(game.config.containerNode, game.config.gameWidth, game.config.gameHeight)
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
    container.add("RenderManager", () => new RenderManager(container.getSingleton<WebGLRenderer>("Renderer")));
};

const webGLDependencies = (container: Container, domManager: DomManager): void => {
    container.add("ShaderLoader", () => new ShaderLoader());
    container.add("ProgramFactory", () => new ProgramFactory(container.getSingleton<ShaderLoader>("ShaderLoader")));
    container.add("TextureFactory", () => new TextureFactory(domManager.canvas));
    container.add("TextureManager", () => new TextureManager(container.getSingleton<TextureFactory>("TextureFactory")));
    container.add("WebGLImageRenderer", () => new WebGLImageRenderer(domManager.canvas));
    container.add(
        "Renderer",
        () =>
            new WebGLRenderer(
                domManager.canvas,
                container.getSingleton<ProgramFactory>("ProgramFactory"),
                container.getSingleton<TextureManager>("TextureManager"),
                container.getSingleton<WebGLImageRenderer>("WebGLImageRenderer")
            )
    );
};

const inputDependencies = (container: Container, domManager: DomManager): void => {
    container.add("Mouse", () => new MouseController(domManager.canvas));
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
