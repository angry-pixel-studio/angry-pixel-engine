import Input from "./Core/Input/Input";
import SceneManager from "./Core/Scene/SceneManager";
import RenderManager from "./Core/Rendering/RenderManager";

const CANVAS_ID = 'miniEngineCanvas';

export const EVENT_START = 'mini-engine-start';
export const EVENT_UPDATE = 'mini-engine-update';

(function () {
    let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;

    let cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
    window.cancelAnimationFrame = cancelAnimationFrame;
})();

export default class Game {
    canvas = null;
    canvasContext = null;
    input = null;
    sceneManager = null;
    renderManager = null;
    
    running = false;
    firstFrame = false;
    frameRequestId = null;

    constructor(containerElement, width, height) {
        this.createCanvas(containerElement, width, height);
        this.canvasContext = this.canvas.getContext('2d');
        this.sceneManager = new SceneManager(this);
        this.renderManager = new RenderManager(this);
    }

    createCanvas(container, width, height) {
        this.canvas = document.createElement('canvas');
        this.canvas.id = CANVAS_ID;
        this.canvas.width = width;
        this.canvas.height = height;

        container.appendChild(this.canvas);
    }

    addScene(sceneId, sceneFunction, openingScene = false) {
        if (typeof sceneFunction !== 'function') {
            throw 'Method parameter sceneFunction must be a function.';
        }

        this.sceneManager.addScene(sceneId, sceneFunction, openingScene);
    }

    run() {
        this.firstFrame = true;
        this.input = new Input(this);
        this.sceneManager.loadOpeningScene();
        
        this.gameLoop();
    }

    stop() {
        this.stopLoop();
        setTimeout(() => {
            this.sceneManager.unloadCurrentScene();
            this.clearCanvas();
        }, 100);
    }

    gameLoop() {
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

    stopLoop() {
        window.cancelAnimationFrame(this.frameRequestId);
        this.running = false;
        this.frameRequestId = null;
    }

    resumeLoop(resetFrames = false) {
        if (this.running == false && this.frameRequestId === null) {
            this.firstFrame = resetFrames ? true : this.firstFrame;
            this.gameLoop();
        }
    }

    clearCanvas() {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvasContext.fillStyle = '#000000';
        this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    dispatchFrameEvent(event) {
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