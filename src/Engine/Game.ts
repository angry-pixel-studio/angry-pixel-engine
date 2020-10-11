import InputManager from "./Core/Input/InputManager";
import SceneManager, { SceneConstructor } from "./Core/Scene/SceneManager";
import RenderManager from "./Core/Rendering/RenderManager";
import CollisionManager from "./Core/Collision/CollisionManager";
import AssetManager from "./Core/Asset/AssetManager";
import GameObjectManager from "./Core/GameObject/GameObjectManager";
import Container from "./Core/DependencyInjection/Container";
import TimeManager from "./Core/Time/TimeManager";

const CANVAS_ID: string = "miniEngineCanvas";

export const EVENT_UPDATE: string = "mini-engine-update";

export const container: Container = new Container();

export default class Game {
    public canvasBGColor: string = "#000000";

    private sceneManager: SceneManager;
    private renderManager: RenderManager;
    private collisionManager: CollisionManager;
    private timeManager: TimeManager;

    private canvasContainer: HTMLElement;
    private canvasWidth: number;
    private canvasHeight: number;
    private _running: boolean = false;
    private frameRequestId: number = null;

    constructor(canvasContainer: HTMLElement, canvasWidth: number, canvasHeight: number) {
        this.canvasContainer = canvasContainer;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        this.setup();
    }

    private setup(): void {
        container.add("Canvas", () => {
            return this.setupCanvas(document.createElement("canvas"));
        });
        container.add("InputManager", () => new InputManager(container.getSingleton<HTMLCanvasElement>("Canvas")));
        container.add("RenderManager", () => new RenderManager(container.getSingleton<HTMLCanvasElement>("Canvas")));
        container.add(
            "SceneManager",
            () => new SceneManager(this, container.getSingleton<RenderManager>("RenderManager"))
        );
        container.add(
            "CollisionManager",
            () => new CollisionManager(container.getSingleton<RenderManager>("RenderManager"))
        );
        container.add("GameObjectManager", () => new GameObjectManager());
        container.add("AssetManager", () => new AssetManager());
        container.add("TimeManager", () => new TimeManager());

        this.sceneManager = container.getSingleton<SceneManager>("SceneManager");
        this.renderManager = container.getSingleton<RenderManager>("RenderManager");
        this.collisionManager = container.getSingleton<CollisionManager>("CollisionManager");
        this.timeManager = container.getSingleton<TimeManager>("TimeManager");
    }

    private setupCanvas(canvas: HTMLCanvasElement): HTMLCanvasElement {
        canvas.id = CANVAS_ID;
        canvas.width = Math.floor(this.canvasWidth);
        canvas.height = Math.floor(this.canvasHeight);
        this.canvasContainer.appendChild(canvas);

        return canvas;
    }

    public get running(): boolean {
        return this._running;
    }

    public addScene(name: string, sceneFunction: SceneConstructor, openingScene: boolean = false): void {
        this.sceneManager.addScene(name, sceneFunction, openingScene);
    }

    public run(): void {
        this.sceneManager.loadOpeningScene();
        this.timeManager.start();

        this.requestAnimationFrame();
    }

    public stop(): void {
        this.stopLoop();
        setTimeout(() => {
            this.sceneManager.unloadCurrentScene();
            this.renderManager.clearCanvas(this.canvasBGColor);
        }, 100);
    }

    private gameLoop(time: number): void {
        this._running = true;

        this.timeManager.update(time);
        this.renderManager.clearCanvas(this.canvasBGColor);
        this.collisionManager.prepare();

        this.dispatchFrameEvent(EVENT_UPDATE);

        this.renderManager.render();

        this.requestAnimationFrame();
    }

    public stopLoop(): void {
        window.cancelAnimationFrame(this.frameRequestId);
        this._running = false;
        this.frameRequestId = null;
    }

    public resumeLoop(): void {
        if (this._running == false && this.frameRequestId === null) {
            this.requestAnimationFrame();
        }
    }

    private requestAnimationFrame(): void {
        this.frameRequestId = window.requestAnimationFrame((time) => this.gameLoop(time));
    }

    private dispatchFrameEvent(event: string): void {
        window.dispatchEvent(new CustomEvent(event));
    }
}
