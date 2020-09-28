import InputManager from "./Core/Input/InputManager";
import SceneManager, { SceneConstructor } from "./Core/Scene/SceneManager";
import RenderManager from "./Core/Rendering/RenderManager";
import Context2DRenderer from "./Core/Rendering/Context2D/Context2DRenderer";
import CollisionManager from "./Core/Collision/CollisionManager";
import AssetManager from "./Core/Asset/AssetManager";
import GameObjectManager from "./Core/GameObject/GameObjectManager";

const CANVAS_ID: string = "miniEngineCanvas";

export const EVENT_UPDATE: string = "mini-engine-update";

export default class Game {
    static readonly canvas: HTMLCanvasElement = document.createElement("canvas");
    static readonly assetManager: AssetManager = new AssetManager();
    static readonly inputManager: InputManager = new InputManager();
    static readonly gameObjectManager: GameObjectManager = new GameObjectManager();
    static readonly renderManager: RenderManager = new RenderManager(new Context2DRenderer(Game.canvas));
    static readonly sceneManager: SceneManager = new SceneManager();
    static readonly collisionManager: CollisionManager = new CollisionManager(Game.renderManager);

    public canvasBGColor: string = "#000000";

    private _running: boolean = false;
    private frameRequestId: number = null;
    private then: number = 0;
    private deltaTime: number = 0;

    constructor(containerElement: HTMLElement, width: number, height: number) {
        this.setupCanvas(containerElement, width, height);
        Game.sceneManager.game = this;
    }

    public get running(): boolean {
        return this._running;
    }

    private setupCanvas(container: HTMLElement, width: number, height: number): void {
        Game.canvas.id = CANVAS_ID;
        Game.canvas.width = width;
        Game.canvas.height = height;

        container.appendChild(Game.canvas);
    }

    public addScene(name: string, sceneFunction: SceneConstructor, openingScene: boolean = false): void {
        Game.sceneManager.addScene(name, sceneFunction, openingScene);
    }

    public run(): void {
        Game.sceneManager.loadOpeningScene();

        this.then = Date.now();

        this.requestAnimationFrame();
    }

    public stop(): void {
        this.stopLoop();
        setTimeout(() => {
            Game.sceneManager.unloadCurrentScene();
            Game.renderManager.clearCanvas(this.canvasBGColor);
        }, 100);
    }

    private gameLoop(time: number): void {
        this._running = true;

        const now: number = time * 0.001;
        this.deltaTime = Math.min(0.1, now - this.then);
        this.then = now;

        Game.renderManager.clearCanvas(this.canvasBGColor);
        Game.collisionManager.prepare();

        this.dispatchFrameEvent(EVENT_UPDATE);

        Game.renderManager.render();

        this.requestAnimationFrame();
    }

    public stopLoop() {
        window.cancelAnimationFrame(this.frameRequestId);
        this._running = false;
        this.frameRequestId = null;
    }

    public resumeLoop() {
        if (this._running == false && this.frameRequestId === null) {
            this.requestAnimationFrame();
        }
    }

    private requestAnimationFrame(): void {
        this.frameRequestId = window.requestAnimationFrame((time) => this.gameLoop(time));
    }

    private dispatchFrameEvent(event: string): void {
        window.dispatchEvent(
            new CustomEvent(event, {
                detail: {
                    game: this,
                    deltaTime: this.deltaTime,
                },
            })
        );
    }
}
