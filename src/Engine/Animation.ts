import Sprite from "./Sprite";

const FRAME_RATE: number = 24;

interface config {
    sprites: Sprite[],
    speed: number,
    loop: boolean,
}

export default class Animation {
    private sprites: Sprite[] = [];
    private _playing = false;
    private currentFrame: number = 1;
    private currentInterval: any = null;

    public speed: number = 1;
    public loop: boolean = false;
    public currentSprite: Sprite = null;
    
    constructor({ sprites, speed, loop }: config) {
        this.sprites = sprites ? sprites : this.sprites;
        this.speed = speed !== undefined ? speed : this.speed;
        this.loop = loop !== undefined ? loop : this.loop;

        this.currentFrame = 1;
        this.currentSprite = null;
    }

    public play(): void {
        if (this.sprites.length > 0 && this._playing === false) {
            this._playing = true;
            this.currentFrame = 1;
            this.currentSprite = this.sprites[this.currentFrame-1];

            this.update();
        }
    }

    async update(): Promise<any> {
        while (this._playing === true && (this.loop || this.sprites.length !== this.currentFrame)) {
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

        this._playing = false;
    }

    public stop(): void {
        this._playing = false;
        clearInterval(this.currentInterval);
    }

    public get playing(): boolean {
        return this._playing;
    }
}
