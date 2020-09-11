import Game from "../../Game";
import Vector2 from "../../Helper/Vector2";

export default class Mouse {
    public leftButtonPressed: boolean = false;
    public scrollButonPressed: boolean = false;
    public rightButtonPressed: boolean = false;

    private game: Game = null;
    private viewportPosition: Vector2 = new Vector2(0, 0);

    constructor(game: Game) {
        this.game = game;
        
        this.game.canvas.addEventListener('mousemove', (e: MouseEvent) => this.updatePosition(e));
        this.game.canvas.addEventListener('mousedown', (e: MouseEvent) => this.updateButtonDown(e));
        this.game.canvas.addEventListener('mouseup', (e: MouseEvent) => this.updateButtonUp(e));
    }

    private updateButtonDown(event: MouseEvent) {
        this.leftButtonPressed = event.button === 0;
        this.scrollButonPressed = event.button === 1;
        this.rightButtonPressed = event.button === 2;
    }

    private updateButtonUp(event: MouseEvent) {
        this.leftButtonPressed = event.button === 0 ? false : this.leftButtonPressed;
        this.scrollButonPressed = event.button === 1 ? false : this.scrollButonPressed;
        this.rightButtonPressed = event.button === 2 ? false : this.rightButtonPressed;
    }

    private updatePosition(event: MouseEvent) {
        const rect = this.game.canvas.getBoundingClientRect();

        this.viewportPosition.x = event.clientX - rect.left;
        this.viewportPosition.y = event.clientY - rect.top;
    }
}