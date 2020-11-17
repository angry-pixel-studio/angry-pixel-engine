import { SceneConstructor } from "./Core/Scene/SceneManager";
import { Container } from "./Core/DependencyInjection/Container";
export declare const EVENT_START: string;
export declare const EVENT_UPDATE: string;
export declare const EVENT_UPDATE_PHYSICS: string;
export declare const EVENT_UPDATE_RENDER: string;
export declare const container: Container;
export interface IGameConfig {
    containerNode: HTMLElement;
    gameWidth?: number;
    gameHeight?: number;
    uiEnabled?: boolean;
    debugEnabled?: boolean;
    bgColor?: string;
}
export declare class Game {
    private sceneManager;
    private renderManager;
    private collisionManager;
    private timeManager;
    private _config;
    private _running;
    private frameRequestId;
    constructor(config: IGameConfig);
    private setupManagers;
    private initializeFacades;
    get config(): IGameConfig;
    get running(): boolean;
    addScene(name: string, sceneFunction: SceneConstructor, openingScene?: boolean): void;
    run(): void;
    stop(): void;
    private gameLoop;
    stopLoop(): void;
    resumeLoop(): void;
    private requestAnimationFrame;
    private dispatchFrameEvent;
}
