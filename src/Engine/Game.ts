import Input from "./Core/Input/Input";
import SceneManager from "./Core/Scene/SceneManager";
import RenderManager from "./Core/Rendering/RenderManager";

const CANVAS_ID: string = 'miniEngineCanvas';

export const EVENT_START: string = 'mini-engine-start';
export const EVENT_UPDATE: string = 'mini-engine-update';

(function () {
    // @ts-ignore
    let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;

    // @ts-ignore
    let cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
    window.cancelAnimationFrame = cancelAnimationFrame;
})();

export default class Game {
    public canvas: HTMLCanvasElement = null;
    public canvasContext: CanvasRenderingContext2D = null;
    public canvasBGColor: string = '#000000';
    public input: Input = null;
    public sceneManager: SceneManager = null;
    public renderManager: RenderManager = null;
    public running: boolean = false;
    
    private firstFrame: boolean = false;
    private frameRequestId: number = null;

    constructor(containerElement: HTMLElement, width: number, height: number) {
        this.createCanvas(containerElement, width, height);
        this.canvasContext = this.canvas.getContext('2d');
        this.sceneManager = new SceneManager(this);
        this.renderManager = new RenderManager(this);
    }

    private createCanvas(container: HTMLElement, width: number, height: number): void {
        this.canvas = document.createElement('canvas');
        this.canvas.id = CANVAS_ID;
        this.canvas.width = width;
        this.canvas.height = height;

        container.appendChild(this.canvas);
    }

    public addScene(sceneId: string, sceneFunction: Function, openingScene: boolean = false): void {
        this.sceneManager.addScene(sceneId, sceneFunction, openingScene);
    }

    public run(): void {
        this.firstFrame = true;
        this.input = new Input(this);
        this.sceneManager.loadOpeningScene();
        
        this.gameLoop();
    }

    public stop(): void {
        this.stopLoop();
        setTimeout(() => {
            this.sceneManager.unloadCurrentScene();
            this.clearCanvas();
        }, 100);
    }

    private gameLoop(): void {
        this.running = true;
        this.clearCanvas();
        
        if (this.firstFrame === true) {
            this.dispatchFrameEvent(EVENT_START);
            this.firstFrame = false;
        } else {
            this.dispatchFrameEvent(EVENT_UPDATE);
        }
        
        this.frameRequestId = window.requestAnimationFrame(() => this.gameLoop());
    }

    public stopLoop() {
        window.cancelAnimationFrame(this.frameRequestId);
        this.running = false;
        this.frameRequestId = null;
    }

    public resumeLoop(resetFrames = false) {
        if (this.running == false && this.frameRequestId === null) {
            this.firstFrame = resetFrames ? true : this.firstFrame;
            this.gameLoop();
        }
    }

    private clearCanvas() {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvasContext.fillStyle = this.canvasBGColor;
        this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    dispatchFrameEvent(event: string) {
        window.dispatchEvent(new CustomEvent(
            event,
            {
                detail: {
                    game: this,
                    sceneManager: this.sceneManager,
                    renderManager: this.renderManager,
                    canvas: this.canvas,
                    canvasContext: this.canvasContext,
                    input: this.input,
                }
            }
        ));
    }
}