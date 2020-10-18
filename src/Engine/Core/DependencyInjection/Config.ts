import Game from "../../Game";
import AssetManager from "../Asset/AssetManager";
import CollisionManager from "../Collision/CollisionManager";
import GameObjectManager from "../GameObject/GameObjectManager";
import InputManager from "../Input/InputManager";
import Keyboard from "../Input/Keyboard";
import Mouse from "../Input/Mouse";
import Context2DRenderer from "../Rendering/Context2D/Context2DRenderer";
import RenderManager from "../Rendering/RenderManager";
import ImageRenderer from "../Rendering/WebGL/ImageRenderer";
import ProgramFactory from "../Rendering/WebGL/ProgramFactory";
import ShaderLoader from "../Rendering/WebGL/ShaderLoader";
import TextureFactory from "../Rendering/WebGL/TextureFactory";
import WebGLRenderer from "../Rendering/WebGL/WebGLRenderer";
import SceneManager from "../Scene/SceneManager";
import TimeManager from "../Time/TimeManager";
import Container from "./Container";

export default (
    container: Container,
    game: Game,
    gameNode: HTMLElement,
    gameCanvas: HTMLCanvasElement,
    UICanvas: HTMLCanvasElement
): void => {
    renderingDependencies(container, gameCanvas, UICanvas);
    inputDependencies(container, gameNode);

    container.add("SceneManager", () => new SceneManager(game, container.getSingleton<RenderManager>("RenderManager")));
    container.add(
        "CollisionManager",
        () => new CollisionManager(container.getSingleton<RenderManager>("RenderManager"))
    );
    container.add("GameObjectManager", () => new GameObjectManager());
    container.add("AssetManager", () => new AssetManager());
    container.add("TimeManager", () => new TimeManager());
};

const renderingDependencies = (
    container: Container,
    gameCanvas: HTMLCanvasElement,
    UICanvas: HTMLCanvasElement
): void => {
    container.add("ShaderLoader", () => new ShaderLoader());
    container.add("ProgramFactory", () => new ProgramFactory(container.getSingleton<ShaderLoader>("ShaderLoader")));
    container.add("TextureFactory", () => new TextureFactory());
    container.add(
        "WebGLImageRenderer",
        () =>
            new ImageRenderer(
                gameCanvas,
                container.getSingleton<ProgramFactory>("ProgramFactory"),
                container.getSingleton<TextureFactory>("TextureFactory")
            )
    );
    container.add(
        "GameRenderer",
        () => new WebGLRenderer(gameCanvas, container.getSingleton<ImageRenderer>("WebGLImageRenderer"))
    );
    container.add("UIRenderer", () => new Context2DRenderer(UICanvas));
    container.add(
        "RenderManager",
        () =>
            new RenderManager(
                container.getSingleton<WebGLRenderer>("GameRenderer"),
                container.getSingleton<Context2DRenderer>("UIRenderer")
            )
    );
};

const inputDependencies = (container: Container, gameNode: HTMLElement): void => {
    container.add("Mouse", () => new Mouse(gameNode));
    container.add("Keyboard", () => new Keyboard());
    container.add(
        "InputManager",
        () => new InputManager(container.getSingleton<Mouse>("Mouse"), container.getSingleton<Keyboard>("Keyboard"))
    );
};
