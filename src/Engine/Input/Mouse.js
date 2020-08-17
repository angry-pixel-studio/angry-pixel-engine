export default class Mouse {
    viewportPosition = { x: 0, y: 0 };

    leftButtonPressed = false;
    scrollButonPressed = false;
    rightButtonPressed = false;

    game = null;

    constructor(game) {
        this.game = game;
        
        this.game.canvas.addEventListener('mousemove', e => this.updatePosition(e));
        this.game.canvas.addEventListener('mousedown', e => this.updateButtonDown(e));
        this.game.canvas.addEventListener('mouseup', e => this.updateButtonUp(e));
    }

    updateButtonDown(event) {
        this.leftButtonPressed = event.button === 0;
        this.scrollButonPressed = event.button === 1;
        this.rightButtonPressed = event.button === 2;
    }

    updateButtonUp(event) {
        this.leftButtonPressed = event.button === 0 ? false : this.leftButtonPressed;
        this.scrollButonPressed = event.button === 1 ? false : this.scrollButonPressed;
        this.rightButtonPressed = event.button === 2 ? false : this.rightButtonPressed;
    }

    updatePosition(event) {
        let rect = this.game.canvas.getBoundingClientRect();

        this.viewportPosition.x = event.clientX - rect.left;
        this.viewportPosition.y = event.clientY - rect.top;
    }
}