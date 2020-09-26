import Input from "./Core/Input/Input";
import SceneManager from "./Core/Scene/SceneManager";
import RenderManager from "./Core/Rendering/RenderManager";
import Context2DRenderer from "./Core/Rendering/Context2D/Context2DRenderer";
import CollisionManager from "./Core/Collision/CollisionManager";
import Scene from "./Scene";

const CANVAS_ID: string = "miniEngineCanvas";

export const EVENT_UPDATE: string = "mini-engine-update";

(function () {
    // @ts-ignore
    const requestAnimationFrame =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;

    // @ts-ignore
    const cancelAnimationFrame =
        window.cancelAnimationFrame || window.mozCancelAnimationFrame;
    window.cancelAnimationFrame = cancelAnimationFrame;
})();

type sceneFunction = () => Scene;

export default class Game {
    public canvas: HTMLCanvasElement = null;
    public canvasBGColor: string = "#000000";
    public input: Input = null;
    public sceneManager: SceneManager = null;
    public renderManager: RenderManager = null;
    public collisionManager: CollisionManager = null;
    public running: boolean = false;

    private frameRequestId: number = null;
    private then: number = 0;
    private deltaTime: number = 0;

    constructor(containerElement: HTMLElement, width: number, height: number) {
        this.createCanvas(containerElement, width, height);
        this.sceneManager = new SceneManager(this);
        this.renderManager = new RenderManager(
            new Context2DRenderer(this.canvas)
        );
        this.collisionManager = new CollisionManager(this.renderManager);
    }

    private createCanvas(
        container: HTMLElement,
        width: number,
        height: number
    ): void {
        this.canvas = document.createElement("canvas");
        this.canvas.id = CANVAS_ID;
        this.canvas.width = width;
        this.canvas.height = height;

        container.appendChild(this.canvas);
    }

    public addScene(
        name: string,
        sceneFunction: sceneFunction,
        openingScene: boolean = false
    ): void {
        this.sceneManager.addScene(name, sceneFunction, openingScene);
    }

    public run(): void {
        this.input = new Input(this);
        this.sceneManager.loadOpeningScene();

        this.then = Date.now();

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
        this.running = true;

        const now = time * 0.001;
        this.deltaTime = Math.min(0.1, now - this.then);
        this.then = now;

        this.renderManager.clearCanvas(this.canvasBGColor);
        this.collisionManager.prepare();

        this.dispatchFrameEvent(EVENT_UPDATE);

        this.requestAnimationFrame();
    }

    public stopLoop() {
        window.cancelAnimationFrame(this.frameRequestId);
        this.running = false;
        this.frameRequestId = null;
    }

    public resumeLoop() {
        if (this.running == false && this.frameRequestId === null) {
            this.requestAnimationFrame();
        }
    }

    private requestAnimationFrame(): void {
        this.frameRequestId = window.requestAnimationFrame((time) =>
            this.gameLoop(time)
        );
    }

    dispatchFrameEvent(event: string) {
        window.dispatchEvent(
            new CustomEvent(event, {
                detail: {
                    game: this,
                    sceneManager: this.sceneManager,
                    renderManager: this.renderManager,
                    canvas: this.canvas,
                    input: this.input,
                    deltaTime: this.deltaTime,
                    collisionManager: this.collisionManager,
                },
            })
        );
    }
}
