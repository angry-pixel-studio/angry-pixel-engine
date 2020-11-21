import { LAYER_DEFAULT } from "../../GameObject";
import { GeometricRenderData, GEOMETRIC_RECTANGLE } from "../../Core/Rendering/RenderData/GeometricRenderData";
import { RenderManager } from "../../Core/Rendering/RenderManager";
import { container } from "../../Game";
import { RectangleCollider } from "../../Core/Collision/Collider/RectangleCollider";
import { Vector2 } from "../../Helper/Vector2";
import { ColliderComponent } from "./ColliderComponent";

interface Config {
    width: number;
    height: number;
    offsetX?: number;
    offsetY?: number;
    debug?: boolean;
}

export const TYPE_BOX_COLLIDER: string = "BoxCollider";

export class BoxCollider extends ColliderComponent {
    private renderManager: RenderManager = container.getSingleton<RenderManager>("RenderManager");

    private width: number;
    private height: number;
    private offsetX: number = 0;
    private offsetY: number = 0;
    public debug: boolean = false;

    private realWidth: number = 0;
    private realHeight: number = 0;
    private realOffsetX: number = 0;
    private realOffsetY: number = 0;

    private renderData: GeometricRenderData = new GeometricRenderData();

    constructor(config: Config) {
        super();

        this.type = TYPE_BOX_COLLIDER;

        this.width = config.width;
        this.height = config.height;
        this.offsetX = config.offsetX ?? this.offsetX;
        this.offsetY = config.offsetY ?? this.offsetY;
        this.debug = config.debug ?? this.debug;
    }

    protected start(): void {
        this.updateRealSize();

        this.addCollider(
            new RectangleCollider(
                new Vector2(
                    this.gameObject.transform.position.x - Math.floor(this.realWidth / 2) - this.offsetX,
                    this.gameObject.transform.position.y + Math.floor(this.realHeight / 2) - this.offsetY
                ),
                this.realWidth,
                this.realHeight,
                this.gameObject
            )
        );
    }

    protected update(): void {
        this.updateCoordinates();

        if (this.debug) {
            this.updateRenderData();
            this.renderManager.addToRenderStack(this.renderData);
        }
    }

    protected updateCoordinates() {
        this.updateRealSize();

        (this.colliders[0] as RectangleCollider).width = this.realWidth;
        (this.colliders[0] as RectangleCollider).height = this.realHeight;

        this.colliders[0].coordinates = new Vector2(
            this.gameObject.transform.position.x - Math.floor(this.realWidth / 2) - this.realOffsetX,
            this.gameObject.transform.position.y + Math.floor(this.realHeight / 2) + this.realOffsetY
        );
    }

    private updateRealSize(): void {
        this.realWidth = this.width * this.gameObject.transform.scale.x;
        this.realHeight = this.height * this.gameObject.transform.scale.y;
        this.realOffsetX = this.offsetX * this.gameObject.transform.scale.x;
        this.realOffsetY = this.offsetY * this.gameObject.transform.scale.y;
    }

    private updateRenderData(): void {
        this.renderData.debug = true;
        this.renderData.position = this.colliders[0].coordinates;
        this.renderData.layer = LAYER_DEFAULT;
        this.renderData.geometric = this.colliders[0];
        this.renderData.geometricType = GEOMETRIC_RECTANGLE;
        this.renderData.color = "#00FF00";
    }
}
