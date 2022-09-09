import { CollisionMethodConfig, Game, GameConfig } from "../Game";
import { AssetManager } from "../managers/AssetManager";
import { CollisionManager } from "../../physics/collision/CollisionManager";
import { DomManager } from "../managers/DomManager";
import { GameObjectManager } from "../managers/GameObjectManager";
import { GamepadController } from "../../input/GamepadController";
import { InputManager } from "../../input/InputManager";
import { KeyboardController } from "../../input/KeyboardController";
import { MouseController } from "../../input/MouseController";
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
import { SatMethod } from "../../physics/collision/method/SatMethod";
import { TouchController } from "../../input/TouchController";
import { AABBMethod } from "../../physics/collision/method/AABBMethod";
import { ContextRenderer } from "../../rendering/ContextRenderer";
import { Exception } from "../../utils/Exception";
import { CullingService } from "../../rendering/CullingService";
import { TilemapRenderer } from "../../rendering/webGL/renderer/TilemapRenderer";
import { BrowserIterationManager } from "../managers/iteration/BrowserIterationManager";
import { AssetManagerFacade } from "../facades/AssetManagerFacade";
import { DomManagerFacade } from "../facades/DomManagerFacade";
import { InputManagerFacade } from "../facades/InputManagerFacade";
import { SceneManagerFacade } from "../facades/SceneManagerFacade";
import { TimeManagerFacade } from "../facades/TimeManagerFacade";
import { GameObjectManagerFacade } from "../facades/GameObjectManagerFacade";
import { MaskRenderer } from "../../rendering/webGL/renderer/MaskRenderer";
import { RigidBodyManager } from "../../physics/rigodBody/RigidBodyManager";
import { CollisionMethod } from "../../physics/collision/method/CollisionMethod";
import { AABBResolver } from "../../physics/collision/resolver/AABBResolver";
import { CircumferenceAABBResolver } from "../../physics/collision/resolver/CircumferenceAABBResolver";
import { CircumferenceResolver } from "../../physics/collision/resolver/CircumferenceResolver";
import { SatResolver } from "../../physics/collision/resolver/SatResolver";
import { HeadlessIterationManager } from "../managers/iteration/HeadlessIterationManager";

export const loadDependencies = (container: Container, gameConfig: GameConfig): void => {
    container.addConstant("GameConfig", gameConfig);

    container.add("TimeManager", () => new TimeManager(gameConfig.physicsFramerate));
    container.add("SceneManager", () => new SceneManager(container.getConstant<Game>("Game")));
    container.add("GameObjectManager", () => new GameObjectManager());

    physicsDependencies(container, gameConfig);

    if (!gameConfig.headless) {
        container.add(
            "DomManager",
            () => new DomManager(gameConfig.containerNode, gameConfig.gameWidth, gameConfig.gameHeight)
        );

        renderingDependencies(container, gameConfig);
        inputDependencies(container);
        container.add("AssetManager", () => new AssetManager());

        container.add(
            "IterationManager",
            () =>
                new BrowserIterationManager(
                    container.getSingleton<TimeManager>("TimeManager"),
                    container.getSingleton<CollisionManager>("CollisionManager"),
                    container.getSingleton<RigidBodyManager>("RigidBodyManager"),
                    container.getSingleton<RenderManager>("RenderManager"),
                    container.getSingleton<InputManager>("InputManager"),
                    container.getSingleton<GameObjectManager>("GameObjectManager"),
                    container.getSingleton<SceneManager>("SceneManager")
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

const renderingDependencies = (container: Container, gameConfig: GameConfig): void => {
    const domManager = container.getSingleton<DomManager>("DomManager");
    const webglContextVersion: WebGLContextVersion = getWebGLContextVersion();

    if (webglContextVersion !== null) {
        webGLDependencies(webglContextVersion, container, domManager);
        if (gameConfig.debugEnabled) console.log(`Using WebGL rendering context (version: ${webglContextVersion})`);
    } else {
        throw new Exception("WebGL not suported in your browser.");
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

const getWebGLContextVersion = (): WebGLContextVersion | null => {
    return document.createElement("canvas").getContext(WebGLContextVersion.WebGL2) !== null
        ? WebGLContextVersion.WebGL2
        : document.createElement("canvas").getContext(WebGLContextVersion.LegacyWebGL) !== null
        ? WebGLContextVersion.LegacyWebGL
        : null;
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
