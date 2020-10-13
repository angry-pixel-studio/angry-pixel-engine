import InputManager from "./Core/Input/InputManager";
import SceneManager, { SceneConstructor } from "./Core/Scene/SceneManager";
import RenderManager from "./Core/Rendering/RenderManager";
import CollisionManager from "./Core/Collision/CollisionManager";
import AssetManager from "./Core/Asset/AssetManager";
import GameObjectManager from "./Core/GameObject/GameObjectManager";
import Container from "./Core/DependencyInjection/Container";
import TimeManager from "./Core/Time/TimeManager";

const GAME_NODE_ID: string = "miniEngineGame";
const GAME_CANVAS_ID: string = "miniEngineGameCanvas";
const UI_CANVAS_ID: string = "miniEngineUiCanvas";

export const EVENT_UPDATE: string = "mini-engine-update";
export const gameNode: HTMLDivElement = document.createElement("div");
export const gameCanvas: HTMLCanvasElement = document.createElement("canvas");
export const uiCanvas: HTMLCanvasElement = document.createElement("canvas");
export const container: Container = new Container();

export default class Game {
    public canvasBGColor: string = "#000000";

    private sceneManager: SceneManager;
    private renderManager: RenderManager;
    private collisionManager: CollisionManager;
    private timeManager: TimeManager;

    private gameContainer: HTMLElement;
    private gameWidth: number;
    private gameHeight: number;
    private _running: boolean = false;
    private frameRequestId: number = null;

    constructor(gameContainer: HTMLElement, gameWidth: number, gameHeight: number) {
        this.gameContainer = gameContainer;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.setupHTMLDom();
        this.setupManagers();
    }

    private setupHTMLDom() {
        gameNode.id = GAME_NODE_ID;
        gameNode.style.width = `${this.gameWidth}px`;
        gameNode.style.height = `${this.gameWidth}px`;
        gameNode.addEventListener("contextmenu", (e: MouseEvent) => e.preventDefault());
        this.gameContainer.appendChild(gameNode);

        gameCanvas.id = GAME_CANVAS_ID;
        gameCanvas.width = Math.floor(this.gameWidth);
        gameCanvas.height = Math.floor(this.gameHeight);
        gameCanvas.addEventListener("contextmenu", (e: MouseEvent) => e.preventDefault());

        const rect: DOMRect = gameNode.getBoundingClientRect();
        uiCanvas.id = UI_CANVAS_ID;
        uiCanvas.style.position = "absolute";
        uiCanvas.style.top = rect.top.toString();
        uiCanvas.style.left = `${rect.left}px`;
        uiCanvas.style.zIndex = "10";
        uiCanvas.width = Math.floor(this.gameWidth);
        uiCanvas.height = Math.floor(this.gameHeight);
        uiCanvas.addEventListener("contextmenu", (e: MouseEvent) => e.preventDefault());

        gameNode.appendChild(uiCanvas);
        gameNode.appendChild(gameCanvas);
    }

    private setupManagers(): void {
        container.add("RenderManager", () => new RenderManager(gameCanvas));
        this.renderManager = container.getSingleton<RenderManager>("RenderManager");

        container.add("InputManager", () => new InputManager(gameNode));
        container.add("SceneManager", () => new SceneManager(this, this.renderManager));
        container.add("CollisionManager", () => new CollisionManager(this.renderManager));
        container.add("GameObjectManager", () => new GameObjectManager());
        container.add("AssetManager", () => new AssetManager());
        container.add("TimeManager", () => new TimeManager());

        this.sceneManager = container.getSingleton<SceneManager>("SceneManager");
        this.collisionManager = container.getSingleton<CollisionManager>("CollisionManager");
        this.timeManager = container.getSingleton<TimeManager>("TimeManager");
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
