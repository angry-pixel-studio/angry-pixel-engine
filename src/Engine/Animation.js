const FRAME_RATE = 24;

export default class Animation {
    sprites = [];
    speed = 1;
    loop = false;

    playing = false;
    currentFrame = 1;
    currentSprite = null;
    currentInterval = null;

    constructor(config) {
        this.sprites = config.sprites ? config.sprites : this.sprites;
        this.speed = config.speed !== undefined ? config.speed : this.speed;
        this.loop = config.loop !== undefined ? config.loop : this.loop;

        this.currentFrame = 1;
        this.currentSprite = null;
    }

    play() {
        if (this.sprites.length > 0 && this.playing === false) {
            this.playing = true;
            this.currentFrame = 1;
            this.currentSprite = this.sprites[this.currentFrame-1];

            this.update();
        }
    }

    async update() {
        while (this.playing === true && (this.loop || this.sprites.length !== this.currentFrame)) {
            await new Promise(resolve => {
                this.currentInterval = setTimeout(() => {
                    this.currentFrame = this.sprites.length === this.currentFrame
                        ? 1
                        : this.currentFrame + 1
                    this.currentSprite = this.sprites[this.currentFrame - 1];
                    resolve();
                }, Math.floor(1000 / (FRAME_RATE * this.speed)));
            });
        }

        this.playing = false;
    }

    stop() {
        this.playing = false;
        clearInterval(this.currentInterval);
    }
}