export const
    SPRITE_RENDERER = 'spriteRenderer',
    TRANSFORM = 'transform'
;

export default class Component {
    gameObject = null;

    constructor(gameObject) {
        this.gameObject = gameObject;

        window.addEventListener('gameLoop', (e) => {
            this.gameLoop(e.detail);
        });
    }

    gameLoop = event => {};
}