const CANVAS_ID = 'miniEngineCanvas';

export default class Game {
    canvas;
    canvasContext;
    mouse = {
        position: {
            x: 0,
            y: 0
        },
        leftButtonPressed: false,
        scrollButonPressed: false,
        rightButtonPressed: false
    }

    constructor(containerId, width, height) {
        this.createCanvas(document.getElementById(containerId), width, height);
        this.canvasContext = this.canvas.getContext('2d');
    }

    createCanvas(container, width, height) {
        this.canvas = document.createElement('canvas');
        this.canvas.id = CANVAS_ID;
        this.canvas.width = width;
        this.canvas.height = height;

        container.appendChild(this.canvas);
    }

    run() {
        this.canvas.addEventListener('mousemove', (e) => this.updateMousePosition(e), false);
        this.canvas.addEventListener('mousedown', (e) => this.updateMouseDown(e));
        this.canvas.addEventListener('mouseup', (e) => this.updateMouseUp(e));
        this.gameLoop();
    }

    updateMouseDown(event) {
        this.mouse.leftButtonPressed = event.button === 0;
        this.mouse.scrollButonPressed = event.button === 1;
        this.mouse.rightButtonPressed = event.button === 2;
    }
    
    updateMouseUp(event) {
        this.mouse.leftButtonPressed = event.button === 0 ? false : this.mouse.leftButtonPressed;
        this.mouse.scrollButonPressed = event.button === 1 ? false : this.mouse.scrollButonPressed;
        this.mouse.rightButtonPressed = event.button === 2 ? false : this.mouse.rightButtonPressed;
    }

    updateMousePosition(event) {
        let rect = this.canvas.getBoundingClientRect();

        this.mouse.position.x = event.clientX - rect.left;
        this.mouse.position.y = event.clientY - rect.top;
    }

    gameLoop() {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

        window.dispatchEvent(new CustomEvent(
            'gameLoop',
            {
                detail: {
                    game: this,
                    canvas: this.canvas,
                    canvasContext: this.canvasContext,
                    mouse: this.mouse,
                }
            }
        ));

        window.requestAnimationFrame(() => this.gameLoop());
    }

    
}