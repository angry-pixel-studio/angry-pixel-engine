import { RenderComponent } from "../../Component";
import { ImageRenderData } from "../../Core/Rendering/RenderData/ImageRenderData";
import { RenderManager } from "../../Core/Rendering/RenderManager";
import { container } from "../../Game";
import { Vector2 } from "../../Math/Vector2";
import { Sprite } from "../../Sprite";

interface Config {
    sprite: Sprite;
    offsetX?: number;
    offsetY?: number;
    smooth?: boolean;
    rotation?: number;
    flipHorizontal?: boolean;
    flipVertical?: boolean;
    opacity?: number;
}

export const TYPE_SPRITE_RENDERER: string = "SpriteRenderer";

export class SpriteRenderer extends RenderComponent {
    public sprite: Sprite = null;
    public offsetX: number = 0;
    public offsetY: number = 0;
    public flipHorizontal: boolean = false;
    public flipVertical: boolean = false;
    public rotation: number = 0;
    public smooth: boolean = true;
    public opacity: number = 1;

    private renderManager: RenderManager = container.getSingleton<RenderManager>("RenderManager");
    private renderData: ImageRenderData = new ImageRenderData();
    private goPosition: Vector2 = null;

    constructor(config: Config) {
        super();

        this.type = TYPE_SPRITE_RENDERER;

        this.sprite = config.sprite;
        this.offsetX = config.offsetX ?? this.offsetX;
        this.offsetY = config.offsetY ?? this.offsetY;
        this.smooth = config.smooth ?? this.smooth;
        this.rotation = config.rotation ?? this.rotation;
        this.flipHorizontal = config.flipHorizontal ?? this.flipHorizontal;
        this.flipVertical = config.flipVertical ?? this.flipVertical;
        this.opacity = config.opacity ?? this.opacity;
    }

    protected start(): void {
        this.goPosition = this.gameObject.transform.position;
        this.update();
    }

    protected update(): void {
        if (this.sprite.loaded === true) {
            this.renderData.ui = this.gameObject.ui;
            this.renderData.layer = this.gameObject.layer;
            this.renderData.image = this.sprite.image;
            this.renderData.width = this.sprite.width * Math.abs(this.gameObject.transform.scale.x);
            this.renderData.height = this.sprite.height * Math.abs(this.gameObject.transform.scale.y);
            this.renderData.slice = this.sprite.slice;
            this.renderData.flipHorizontal = this.flipHorizontal || this.gameObject.transform.scale.x < 0;
            this.renderData.flipVertical = this.flipVertical || this.gameObject.transform.scale.y < 0;
            this.renderData.rotation = this.gameObject.transform.rotation + this.rotation;
            this.renderData.smooth = this.sprite.smooth;
            this.renderData.alpha = this.opacity;

            this.calculateRenderPosition();
            this.renderManager.addToRenderStack(this.renderData);
        }
    }

    private calculateRenderPosition(): void {
        this.renderData.position.set(
            this.gameObject.transform.position.x + this.offsetX,
            this.gameObject.transform.position.y + this.offsetY
        );

        if (this.gameObject.transform.rotation) {
            this.translateRenderPosition();
        }

        return;
    }

    private translateRenderPosition(): void {
        const angle: number = (this.gameObject.transform.rotation * Math.PI) / 180.0;
        const radius: number = Math.hypot(
            this.renderData.position.x - this.goPosition.x,
            this.renderData.position.y - this.goPosition.y
        );

        this.renderData.position.set(
            this.goPosition.x + radius * Math.cos(angle),
            this.goPosition.y - radius * Math.sin(angle)
        );
    }
}
