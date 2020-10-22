import SceneManager, { SceneConstructor } from "./Core/Scene/SceneManager";
import RenderManager from "./Core/Rendering/RenderManager";
import CollisionManager from "./Core/Collision/CollisionManager";
import loadDependencies from "./Core/DependencyInjection/Config";
import Container from "./Core/DependencyInjection/Container";
import TimeManager from "./Core/Time/TimeManager";

const GAME_NODE_ID: string = "miniEngineGame";
const GAME_CANVAS_ID: string = "miniEngineGameCanvas";
const UI_CANVAS_ID: string = "miniEngineUICanvas";

export const EVENT_UPDATE: string = "mini-engine-update";
export const gameNode: HTMLDivElement = document.createElement("div");
export const gameCanvas: HTMLCanvasElement = document.createElement("canvas");
export const UICanvas: HTMLCanvasElement = document.createElement("canvas");
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
    private UIEnabled: boolean = true;
    private _running: boolean = false;
    private frameRequestId: number = null;

    constructor(gameContainer: HTMLElement, gameWidth: number, gameHeight: number, UIEnabled: boolean = true) {
        this.gameContainer = gameContainer;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.UIEnabled = UIEnabled;

        this.setupHTMLDom();
        this.setupManagers();
    }

    private setupHTMLDom() {
        gameNode.id = GAME_NODE_ID;
        gameNode.style.position = "relative";
        gameNode.style.width = `${this.gameWidth}px`;
        gameNode.style.height = `${this.gameHeight}px`;
        gameNode.addEventListener("contextmenu", (e: MouseEvent) => e.preventDefault());
        this.gameContainer.appendChild(gameNode);

        gameCanvas.id = GAME_CANVAS_ID;
        gameCanvas.width = Math.floor(this.gameWidth);
        gameCanvas.height = Math.floor(this.gameHeight);
        gameCanvas.addEventListener("contextmenu", (e: MouseEvent) => e.preventDefault());

        if (this.UIEnabled) {
            UICanvas.id = UI_CANVAS_ID;
            UICanvas.style.position = "absolute";
            UICanvas.style.zIndex = "10";
            UICanvas.width = Math.floor(this.gameWidth);
            UICanvas.height = Math.floor(this.gameHeight);
            UICanvas.addEventListener("contextmenu", (e: MouseEvent) => e.preventDefault());

            gameNode.appendChild(UICanvas);
        }

        gameNode.appendChild(gameCanvas);
    }

    private setupManagers(): void {
        loadDependencies(container, this, gameNode, gameCanvas, UICanvas);

        this.renderManager = container.getSingleton<RenderManager>("RenderManager");
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
