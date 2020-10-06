import InputManager from "./Core/Input/InputManager";
import SceneManager, { SceneConstructor } from "./Core/Scene/SceneManager";
import RenderManager from "./Core/Rendering/RenderManager";
import CollisionManager from "./Core/Collision/CollisionManager";
import AssetManager from "./Core/Asset/AssetManager";
import GameObjectManager from "./Core/GameObject/GameObjectManager";
import Container from "./Core/DependencyInjection/Container";

const CANVAS_ID: string = "miniEngineCanvas";

export const EVENT_UPDATE: string = "mini-engine-update";

export default class Game {
    static readonly container: Container = new Container();

    public canvasBGColor: string = "#000000";

    // canvas
    private canvasContainer: HTMLElement;
    private canvasWidth: number;
    private canvasHeight: number;

    private _running: boolean = false;
    private frameRequestId: number = null;
    private then: number = 0;
    private deltaTime: number = 0;

    constructor(canvasContainer: HTMLElement, canvasWidth: number, canvasHeight: number) {
        this.canvasContainer = canvasContainer;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        this.setup();
    }

    private setup() {
        Game.container.add("Canvas", () => {
            return this.setupCanvas(document.createElement("canvas"));
        });
        Game.container.add("InputManager", () => new InputManager(Game.get<HTMLCanvasElement>("Canvas")));
        Game.container.add("RenderManager", () => new RenderManager(Game.get<HTMLCanvasElement>("Canvas")));
        Game.container.add("SceneManager", () => new SceneManager(this, Game.get<RenderManager>("RenderManager")));
        Game.container.add("CollisionManager", () => new CollisionManager(Game.get<RenderManager>("RenderManager")));
        Game.container.add("GameObjectManager", () => new GameObjectManager());
        Game.container.add("AssetManager", () => new AssetManager());
    }

    private setupCanvas(canvas: HTMLCanvasElement): HTMLCanvasElement {
        canvas.id = CANVAS_ID;
        canvas.width = this.canvasWidth;
        canvas.height = this.canvasHeight;
        this.canvasContainer.appendChild(canvas);

        return canvas;
    }

    public static get<T extends object>(name: string): T {
        return this.container.getSingleton<T>(name);
    }

    public get running(): boolean {
        return this._running;
    }

    public addScene(name: string, sceneFunction: SceneConstructor, openingScene: boolean = false): void {
        Game.get<SceneManager>("SceneManager").addScene(name, sceneFunction, openingScene);
    }

    public run(): void {
        Game.get<SceneManager>("SceneManager").loadOpeningScene();

        this.then = Date.now();

        this.requestAnimationFrame();
    }

    public stop(): void {
        this.stopLoop();
        setTimeout(() => {
            Game.get<SceneManager>("SceneManager").unloadCurrentScene();
            Game.get<RenderManager>("RenderManager").clearCanvas(this.canvasBGColor);
        }, 100);
    }

    private gameLoop(time: number): void {
        this._running = true;

        const now: number = time * 0.001;
        this.deltaTime = Math.min(0.1, now - this.then);
        this.then = now;

        Game.get<RenderManager>("RenderManager").clearCanvas(this.canvasBGColor);
        Game.get<CollisionManager>("CollisionManager").prepare();

        this.dispatchFrameEvent(EVENT_UPDATE);

        Game.get<RenderManager>("RenderManager").render();

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
