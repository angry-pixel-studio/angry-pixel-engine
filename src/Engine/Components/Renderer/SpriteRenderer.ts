import Component from '../../Component';
import RenderData from '../../Core/Rendering/RenderData';
import {
    PIVOT_CENTER,
    PIVOT_TOP_LEFT,
    PIVOT_TOP_RIGHT,
    PIVOT_BOTTOM_LEFT,
    PIVOT_BOTTOM_RIGHT
} from '../../Core/Rendering/RenderPivots';
import Vector2 from '../../Helper/Vector2';
import Sprite from '../../Sprite';

export * from '../../Core/Rendering/RenderPivots';

export default class SpriteRenderer extends Component {
    public sprite: Sprite = null;
    public offsetX: number = 0;
    public offsetY: number = 0;
    public pivot: string = PIVOT_CENTER;
    public flipHorizontal: boolean = false;
    public flipVertical: boolean = false;
    public rotation: number = 0;
    public smooth: boolean = true;

    private renderData: RenderData = new RenderData();
    private goPosition: Vector2 = null;

    constructor(config: { [key: string]: any }) {
        super();

        // required
        this.sprite = config.sprite;

        // optional
        this.pivot = config.pivot ? config.pivot : this.pivot;
        this.offsetX = config.offsetX ? config.offsetX : this.offsetX;
        this.offsetY = config.offsetY ? config.offsetY : this.offsetY;
        this.smooth = config.smooth ? config.smooth : this.smooth
        this.rotation = config.rotation ? config.rotation : this.rotation;
    }

    start(event: Record<string, unknown>): void {
        this.goPosition = this.gameObject.transform.position;
        this.update(event);
    }

    update(event: { [key: string]: any }): void {
        if (this.sprite.loaded === true) {
            this.renderData.ui = this.gameObject.ui;
            this.renderData.layer = this.gameObject.layer;
            this.renderData.image = this.sprite.image;
            this.renderData.width = this.sprite.width * this.gameObject.transform.scale.x;
            this.renderData.height = this.sprite.height * this.gameObject.transform.scale.y;
            this.renderData.slice = this.sprite.slice;
            this.renderData.flipHorizontal = this.flipHorizontal;
            this.renderData.flipVertical = this.flipVertical;
            this.renderData.rotation = this.gameObject.transform.rotation + this.rotation;

            this.calculateRenderPosition();

            event.renderManager.addToRenderStack(this.renderData);
        }
    }

    private calculateRenderPosition(): void {
        this.renderData.position.x = this.gameObject.transform.position.x + this.offsetX;
        this.renderData.position.y = this.gameObject.transform.position.y + this.offsetY;

        if (this.gameObject.transform.rotation) {
            this.translateRenderPosition();
        }

        switch (this.pivot) {
            case PIVOT_CENTER:
                this.renderData.position.x -= (Math.floor(this.renderData.width / 2));
                this.renderData.position.y += (Math.floor(this.renderData.height / 2));
                break;
            case PIVOT_TOP_RIGHT:
                this.renderData.position.x -= this.renderData.width;
                break;
            case PIVOT_BOTTOM_LEFT:
                this.renderData.position.y += this.renderData.height;
                break;
            case PIVOT_BOTTOM_RIGHT:
                this.renderData.position.x -= this.renderData.width;
                this.renderData.position.y += this.renderData.height;
                break;
            case PIVOT_TOP_LEFT:
                break;
            default:
                break;
        }
    }

    private translateRenderPosition(): void {
        const angle: number = this.gameObject.transform.rotation * Math.PI / 180.0;
        const radius: number = Math.hypot(
            this.renderData.position.x - this.goPosition.x,
            this.renderData.position.y - this.goPosition.y
        );
        
        this.renderData.position.x = this.goPosition.x + radius * Math.cos(angle),
        this.renderData.position.y = this.goPosition.y - radius * Math.sin(angle);
    }
}
