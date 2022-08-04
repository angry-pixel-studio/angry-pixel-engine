import { RenderComponent } from "../../core/Component";
import { RenderManager } from "../../rendering/RenderManager";
import { container } from "../../core/Game";
import { Rotation } from "../../math/Rotation";
import { Vector2 } from "../../math/Vector2";
import { MaskRenderData } from "../../rendering/renderData/MaskRenderData";
import { InitOptions } from "../../core/GameActor";

export interface MaskRendererOptions extends InitOptions {
    width: number;
    height: number;
    color: string;
    offset?: Vector2;
    rotation?: Rotation;
    opacity?: number;
    layer?: string;
}

export class MaskRenderer extends RenderComponent {
    private renderManager: RenderManager = container.getSingleton<RenderManager>("RenderManager");

    public width: number;
    public height: number;
    public color: string;
    public offset: Vector2 = new Vector2();
    public rotation: Rotation = new Rotation();
    public opacity: number = 1;
    public layer: string;

    private renderData: MaskRenderData = new MaskRenderData();

    private innerPosition: Vector2 = new Vector2();
    private scaledOffset: Vector2 = new Vector2();

    protected init(config: MaskRendererOptions): void {
        this.width = config.width;
        this.height = config.height;
        this.color = config.color;
        this.offset = config.offset ?? this.offset;
        this.rotation = config.rotation ?? this.rotation;
        this.opacity = config.opacity ?? this.opacity;
        this.layer = config.layer ?? this.layer;
    }

    protected update(): void {
        this.renderData.ui = this.gameObject.ui;
        this.renderData.layer = this.layer ?? this.gameObject.layer;
        this.renderData.width = this.width * Math.abs(this.gameObject.transform.scale.x);
        this.renderData.height = this.height * Math.abs(this.gameObject.transform.scale.y);
        this.renderData.color = this.color;
        this.renderData.rotation = this.gameObject.transform.rotation.radians + this.rotation.radians;
        this.renderData.alpha = this.opacity;

        this.calculateRenderPosition();

        this.renderManager.addRenderData(this.renderData);
    }

    private calculateRenderPosition(): void {
        this.scaledOffset.set(
            this.offset.x * this.gameObject.transform.scale.x,
            this.offset.y * this.gameObject.transform.scale.y
        );
        Vector2.add(this.renderData.position, this.gameObject.transform.position, this.scaledOffset);

        if (this.gameObject.transform.rotation.radians !== 0) {
            this.translateRenderPosition();
        }
    }

    private translateRenderPosition(): void {
        Vector2.subtract(this.innerPosition, this.renderData.position, this.gameObject.transform.position);
        const translatedAngle: number =
            Math.atan2(this.innerPosition.y, this.innerPosition.x) + this.gameObject.transform.rotation.radians;

        this.renderData.position.set(
            this.gameObject.transform.position.x + this.innerPosition.magnitude * Math.cos(translatedAngle),
            this.gameObject.transform.position.y + this.innerPosition.magnitude * Math.sin(translatedAngle)
        );
    }
}
