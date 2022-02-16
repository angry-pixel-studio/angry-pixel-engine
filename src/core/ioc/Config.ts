import { CollisionMethodConfig, Context2DConfig, Game, GameConfig } from "../Game";
import { AssetManager } from "../managers/AssetManager";
import { CollisionManager } from "../../physics/collision/CollisionManager";
import { DomManager } from "../managers/DomManager";
import { GameObjectManager } from "../managers/GameObjectManager";
import { GamepadController } from "../../input/GamepadController";
import { InputManager } from "../../input/InputManager";
import { KeyboardController } from "../../input/KeyboardController";
import { MouseController } from "../../input/MouseController";
import { Context2DRenderer } from "../../rendering/context2D/Context2DRenderer";
import { RenderManager } from "../../rendering/RenderManager";
import { ImageRenderer } from "../../rendering/webGL/renderer/ImageRenderer";
import { ProgramFactory } from "../../rendering/webGL/ProgramFactory";
import { ShaderLoader } from "../../rendering/webGL/ShaderLoader";
import { TextureFactory } from "../../rendering/webGL/TextureFactory";
import { WebGLContextVersion, WebGLRenderer } from "../../rendering/webGL/WebGLRenderer";
import { SceneManager } from "../managers/SceneManager";
import { TimeManager } from "../managers/TimeManager";
import { Container } from "../../utils/Container";
import { TextureManager } from "../../rendering/webGL/TextureManager";
import { ProgramManager } from "../../rendering/webGL/ProgramManager";
import { FontAtlasFactory } from "../../rendering/FontAtlasFactory";
import { TextRenderer } from "../../rendering/webGL/renderer/TextRenderer";
import { GeometricRenderer } from "../../rendering/webGL/renderer/GeometricRenderer";
import { SatResolver } from "../../physics/collision/resolver/SatResolver";
import { TouchController } from "../../input/TouchController";
import { AABBResolver } from "../../physics/collision/resolver/AABBResolver";
import { ICollisionResolver } from "../../physics/collision/resolver/ICollisionResolver";
import { ContextRenderer } from "../../rendering/ContextRenderer";
import { Exception } from "../../utils/Exception";
import { CullingService } from "../../rendering/CullingService";
import { TilemapRenderer } from "../../rendering/webGL/renderer/TilemapRenderer";
import { IterationManager } from "../managers/IterationManager";
import { AssetManagerFacade } from "../facades/AssetManagerFacade";
import { DomManagerFacade } from "../facades/DomManagerFacade";
import { InputManagerFacade } from "../facades/InputManagerFacade";
import { SceneManagerFacade } from "../facades/SceneManagerFacade";
import { TimeManagerFacade } from "../facades/TimeManagerFacade";
import { GameObjectManagerFacade } from "../facades/GameObjectManagerFacade";
import { MaskRenderer } from "../../rendering/webGL/renderer/MaskRenderer";
import { PhysicsManager } from "../../physics/PhysicsManager";

export const loadDependencies = (container: Container, gameConfig: GameConfig): void => {
    container.addConstant("GameConfig", gameConfig);

    container.add(
        "DomManager",
        () => new DomManager(gameConfig.containerNode, gameConfig.gameWidth, gameConfig.gameHeight)
    );

    const domManager: DomManager = container.getSingleton<DomManager>("DomManager");

    container.add("TimeManager", () => new TimeManager(gameConfig.gameFrameRate, gameConfig.physicsFramerate));

    renderingDependencies(container, gameConfig, domManager);
    inputDependencies(container, domManager);
    physicsDependencies(container, gameConfig);

    container.add(
        "SceneManager",
        () =>
            new SceneManager(
                container.getConstant<Game>("Game"),
                container.getSingleton<RenderManager>("RenderManager")
            )
    );
    container.add("GameObjectManager", () => new GameObjectManager());
    container.add("AssetManager", () => new AssetManager());
    container.add(
        "IterationManager",
        () =>
            new IterationManager(
                container.getSingleton<TimeManager>("TimeManager"),
                container.getSingleton<CollisionManager>("CollisionManager"),
                container.getSingleton<PhysicsManager>("PhysicsManager"),
                container.getSingleton<RenderManager>("RenderManager"),
                container.getSingleton<InputManager>("InputManager")
            )
    );

    initializeFacades(container);
};

const physicsDependencies = (container: Container, gameConfig: GameConfig): void => {
    if (gameConfig.collisions.method === CollisionMethodConfig.AABB) {
        container.add("CollisionResolver", () => new AABBResolver());
    } else if (gameConfig.collisions.method === CollisionMethodConfig.SAT) {
        container.add("CollisionResolver", () => new SatResolver());
    } else {
        throw new Exception("Invalid collision method.");
    }

    container.add(
        "CollisionManager",
        () =>
            new CollisionManager(
                container.getSingleton<ICollisionResolver>("CollisionResolver"),
                gameConfig.collisions.quadTreeBounds,
                gameConfig.collisions.quadMaxLevel,
                gameConfig.collisions.collidersPerQuad
            )
    );

    container.add(
        "PhysicsManager",
        () =>
            new PhysicsManager(
                container.getSingleton<TimeManager>("TimeManager"),
                container.getSingleton<CollisionManager>("CollisionManager")
            )
    );
};

const renderingDependencies = (container: Container, gameConfig: GameConfig, domManager: DomManager): void => {
    const webglContextVersion: WebGLContextVersion = getWebGLContextVersion();

    if (
        gameConfig.context2d === Context2DConfig.Default ||
        (gameConfig.context2d === Context2DConfig.Fallback && webglContextVersion === null)
    ) {
        container.add("Renderer", () => new Context2DRenderer(domManager.canvas));
        if (gameConfig.debugEnabled) console.log("Using 2d rendering context");
    } else if (webglContextVersion !== null) {
        webGLDependencies(webglContextVersion, container, domManager);
        if (gameConfig.debugEnabled) console.log(`Using WebGL rendering context (version: ${webglContextVersion})`);
    } else {
        throw new Exception("WebGL is not supported, use context2d instead.");
    }

    container.add("FontAtlasFactory", () => new FontAtlasFactory());
    container.add("CullingService", () => new CullingService());
    container.add(
        "RenderManager",
        () =>
            new RenderManager(
                container.getSingleton<ContextRenderer>("Renderer"),
                container.getSingleton<CullingService>("CullingService"),
                gameConfig.canvasColor,
                gameConfig.debugEnabled
            )
    );
};

const webGLDependencies = (
    webglContextVersion: WebGLContextVersion,
    container: Container,
    domManager: DomManager
): void => {
    container.add("ShaderLoader", () => new ShaderLoader());
    container.add("ProgramFactory", () => new ProgramFactory(container.getSingleton<ShaderLoader>("ShaderLoader")));
    container.add(
        "ProgramManager",
        () =>
            new ProgramManager(
                container.getSingleton<ProgramFactory>("ProgramFactory"),
                webglContextVersion,
                domManager.canvas
            )
    );

    container.add("TextureFactory", () => new TextureFactory(webglContextVersion, domManager.canvas));
    container.add("TextureManager", () => new TextureManager(container.getSingleton<TextureFactory>("TextureFactory")));

    container.add(
        "WebGLImageRenderer",
        () =>
            new ImageRenderer(
                webglContextVersion,
                domManager.canvas,
                container.getSingleton<ProgramManager>("ProgramManager")
            )
    );

    container.add(
        "WebGLTextRenderer",
        () =>
            new TextRenderer(
                webglContextVersion,
                domManager.canvas,
                container.getSingleton<ProgramManager>("ProgramManager")
            )
    );

    container.add(
        "WebGLGeometricRenderer",
        () =>
            new GeometricRenderer(
                webglContextVersion,
                domManager.canvas,
                container.getSingleton<ProgramManager>("ProgramManager")
            )
    );

    container.add(
        "WebGLTilemapRenderer",
        () =>
            new TilemapRenderer(
                webglContextVersion,
                domManager.canvas,
                container.getSingleton<ProgramManager>("ProgramManager")
            )
    );

    container.add(
        "WebGLMaskRenderer",
        () =>
            new MaskRenderer(
                webglContextVersion,
                domManager.canvas,
                container.getSingleton<ProgramManager>("ProgramManager")
            )
    );

    container.add(
        "Renderer",
        () =>
            new WebGLRenderer(
                webglContextVersion,
                domManager.canvas,
                container.getSingleton<ProgramManager>("ProgramManager"),
                container.getSingleton<TextureManager>("TextureManager"),
                container.getSingleton<FontAtlasFactory>("FontAtlasFactory"),
                container.getSingleton<ImageRenderer>("WebGLImageRenderer"),
                container.getSingleton<TilemapRenderer>("WebGLTilemapRenderer"),
                container.getSingleton<TextRenderer>("WebGLTextRenderer"),
                container.getSingleton<GeometricRenderer>("WebGLGeometricRenderer"),
                container.getSingleton<MaskRenderer>("WebGLMaskRenderer")
            )
    );
};

const inputDependencies = (container: Container, domManager: DomManager): void => {
    container.add("Mouse", () => new MouseController(domManager.canvas));
    container.add("Keyboard", () => new KeyboardController(domManager.canvas));
    container.add("Gamepad", () => new GamepadController());
    container.add("Touch", () => new TouchController(domManager.canvas));
    container.add(
        "InputManager",
        () =>
            new InputManager(
                container.getSingleton<MouseController>("Mouse"),
                container.getSingleton<KeyboardController>("Keyboard"),
                container.getSingleton<GamepadController>("Gamepad"),
                container.getSingleton<TouchController>("Touch")
            )
    );
};

const getWebGLContextVersion = (): WebGLContextVersion | null => {
    return document.createElement("canvas").getContext(WebGLContextVersion.WebGL2) !== null
        ? WebGLContextVersion.WebGL2
        : document.createElement("canvas").getContext(WebGLContextVersion.LegacyWebGL) !== null
        ? WebGLContextVersion.LegacyWebGL
        : null;
};

const initializeFacades = (container: Container): void => {
    AssetManagerFacade.initialize(container.getSingleton<AssetManager>("AssetManager"));
    DomManagerFacade.initialize(container.getSingleton<DomManager>("DomManager"));
    InputManagerFacade.initialize(container.getSingleton<InputManager>("InputManager"));
    SceneManagerFacade.initialize(container.getSingleton<SceneManager>("SceneManager"));
    TimeManagerFacade.initialize(container.getSingleton<TimeManager>("TimeManager"));
    GameObjectManagerFacade.initialize(container.getSingleton<GameObjectManager>("GameObjectManager"));
};
