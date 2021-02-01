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
import { WebGLContextVersion, WebGLRenderer } from "../Rendering/WebGL/WebGLRenderer";
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

    renderingDependencies(container, game, domManager);
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

const renderingDependencies = (container: Container, game: Game, domManager: DomManager): void => {
    const webglContextVersion: WebGLContextVersion = getWebGLContextVersion();

    if (game.config.context2d === "default" || (game.config.context2d === "fallback" && webglContextVersion === null)) {
        container.add("Renderer", () => new Context2DRenderer(domManager.canvas));
        if (game.config.debugEnabled) console.log("Using 2d rendering context");
    } else if (webglContextVersion !== null) {
        webGLDependencies(webglContextVersion, container, domManager);
        if (game.config.debugEnabled) console.log(`Using WebGL rendering context (version: ${webglContextVersion})`);
    } else {
        throw new Error("WebGL is not supported, use context2d instead.");
    }

    container.add("RenderManager", () => new RenderManager(container.getSingleton<WebGLRenderer>("Renderer")));
};

const webGLDependencies = (
    webglContextVersion: WebGLContextVersion,
    container: Container,
    domManager: DomManager
): void => {
    container.add("ShaderLoader", () => new ShaderLoader());
    container.add("ProgramFactory", () => new ProgramFactory(container.getSingleton<ShaderLoader>("ShaderLoader")));
    container.add("TextureFactory", () => new TextureFactory(webglContextVersion, domManager.canvas));
    container.add("TextureManager", () => new TextureManager(container.getSingleton<TextureFactory>("TextureFactory")));
    container.add("WebGLImageRenderer", () => new WebGLImageRenderer(webglContextVersion, domManager.canvas));
    container.add(
        "Renderer",
        () =>
            new WebGLRenderer(
                webglContextVersion,
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

const getWebGLContextVersion = (): WebGLContextVersion | null => {
    return document.createElement("canvas").getContext(WebGLContextVersion.WebGL2) !== null
        ? WebGLContextVersion.WebGL2
        : document.createElement("canvas").getContext(WebGLContextVersion.LegacyWebGl) !== null
        ? WebGLContextVersion.LegacyWebGl
        : null;
};
