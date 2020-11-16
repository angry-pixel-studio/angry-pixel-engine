import { SceneManager, SceneConstructor } from "./Core/Scene/SceneManager";
import { RenderManager } from "./Core/Rendering/RenderManager";
import { CollisionManager } from "./Core/Collision/CollisionManager";
import { loadDependencies } from "./Core/DependencyInjection/Config";
import { Container } from "./Core/DependencyInjection/Container";
import { TimeManager } from "./Core/Time/TimeManager";

export const EVENT_START: string = "mini-engine-start";
export const EVENT_UPDATE: string = "mini-engine-update";
export const EVENT_UPDATE_PHYSICS: string = "mini-engine-update-physics";
export const EVENT_UPDATE_RENDER: string = "mini-engine-update-render";

export const container: Container = new Container();

export interface GameConfig {
    containerNode: HTMLElement;
    gameWidth?: number;
    gameHeight?: number;
    uiEnabled?: boolean;
    debugEnabled?: boolean;
    bgColor?: string;
}

const defaultConfig: GameConfig = {
    containerNode: null,
    gameWidth: 320,
    gameHeight: 180,
    uiEnabled: true,
    debugEnabled: false,
    bgColor: "#000000",
};

export class Game {
    private sceneManager: SceneManager;
    private renderManager: RenderManager;
    private collisionManager: CollisionManager;
    private timeManager: TimeManager;

    private _config: GameConfig;

    private _running: boolean = false;
    private frameRequestId: number = null;

    constructor(config: GameConfig) {
        this._config = {
            ...defaultConfig,
            ...config,
        };

        if (this.config.containerNode === null) {
            throw new Error("Config parameter 'containerNode' cannot be empty.");
        }

        this.setupManagers();
    }

    private setupManagers(): void {
        loadDependencies(container, this);

        this.renderManager = container.getSingleton<RenderManager>("RenderManager");
        this.sceneManager = container.getSingleton<SceneManager>("SceneManager");
        this.collisionManager = container.getSingleton<CollisionManager>("CollisionManager");
        this.timeManager = container.getSingleton<TimeManager>("TimeManager");
    }

    public get config(): GameConfig {
        return this._config;
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
            this.renderManager.clearCanvas(this._config.bgColor);
        }, 100);
    }

    private gameLoop(time: number): void {
        this._running = true;

        this.timeManager.update(time);
        this.collisionManager.prepare();

        this.dispatchFrameEvent(EVENT_START);
        this.dispatchFrameEvent(EVENT_UPDATE);
        this.dispatchFrameEvent(EVENT_UPDATE_PHYSICS);
        this.dispatchFrameEvent(EVENT_UPDATE_RENDER);

        this.renderManager.clearCanvas(this._config.bgColor);
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
