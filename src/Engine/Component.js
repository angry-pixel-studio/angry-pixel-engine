export const
    CAMERA = 'camera',
    SPRITE_RENDERER = 'spriteRenderer',
    TRANSFORM = 'transform'
    ;

export default class Component {
    gameObject = null;

    constructor(gameObject) {
        this.gameObject = gameObject;

        window.addEventListener('gameLoop', this.gameLoopEventHandler);
    }

    gameLoopEventHandler = event => this.gameLoop(event.detail);

    gameLoop() { }

    destroy() {
        Object.keys(this).forEach(key => this[key] = null);
        window.removeEventListener('gameLoop', this.gameLoopEventHandler);
    }
}
