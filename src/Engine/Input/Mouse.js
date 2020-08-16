export default class Mouse {
    position = { x: 0, y: 0 };
    leftButtonPressed = false;
    scrollButonPressed = false;
    rightButtonPressed = false;

    canvas = null;

    constructor(game) {
        this.canvas = game.canvas;

        this.canvas.addEventListener('mousemove', e => this.updatePosition(e));
        this.canvas.addEventListener('mousedown', e => this.updateButtonDown(e));
        this.canvas.addEventListener('mouseup', e => this.updateButtonUp(e));
    }

    updateButtonDown = event => {
        this.leftButtonPressed = event.button === 0;
        this.scrollButonPressed = event.button === 1;
        this.rightButtonPressed = event.button === 2;
    }

    updateButtonUp = event => {
        this.leftButtonPressed = event.button === 0 ? false : this.leftButtonPressed;
        this.scrollButonPressed = event.button === 1 ? false : this.scrollButonPressed;
        this.rightButtonPressed = event.button === 2 ? false : this.rightButtonPressed;
    }

    updatePosition = event => {
        let rect = this.canvas.getBoundingClientRect();

        this.position.x = event.clientX - rect.left;
        this.position.y = event.clientY - rect.top;
    }
}