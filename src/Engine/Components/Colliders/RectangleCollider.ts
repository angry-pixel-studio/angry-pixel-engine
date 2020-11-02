import { LAYER_DEFAULT } from "../../GameObject";
import { GeometricRenderData, GEOMETRIC_RECTANGLE } from "../../Core/Rendering/RenderData/GeometricRenderData";
import { RenderManager } from "../../Core/Rendering/RenderManager";
import { container } from "../../Game";
import { RectangleCollider as CoreRectangleCollider } from "../../Core/Collision/Collider/RectangleCollider";
import { Vector2 } from "../../Helper/Vector2";
import { Collider } from "./Collider";

interface Config {
    width: number;
    height: number;
    offsetX: number;
    offsetY: number;
    debug: boolean;
}

export class RectangleCollider extends Collider {
    private renderManager: RenderManager = container.getSingleton<RenderManager>("RenderManager");

    public debug: boolean = false;

    private width: number;
    private height: number;
    private offsetX: number;
    private offsetY: number;

    private renderData: GeometricRenderData = new GeometricRenderData();

    constructor({ width, height, offsetX = 0, offsetY = 0, debug = false }: Config) {
        super();

        this.width = width;
        this.height = height;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.debug = debug;
    }

    protected start(): void {
        this.addCollider(
            new CoreRectangleCollider(
                new Vector2(
                    this.gameObject.transform.position.x - Math.floor(this.width / 2) - this.offsetX,
                    this.gameObject.transform.position.y + Math.floor(this.height / 2) - this.offsetY
                ),
                this.width,
                this.height,
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
        this.colliders[0].coordinates = new Vector2(
            this.gameObject.transform.position.x - Math.floor(this.width / 2) - this.offsetX,
            this.gameObject.transform.position.y + Math.floor(this.height / 2) - this.offsetY
        );
    }

    private updateRenderData(): void {
        this.renderData.position = this.colliders[0].coordinates;
        this.renderData.layer = LAYER_DEFAULT;
        this.renderData.geometric = this.colliders[0];
        this.renderData.geometricType = GEOMETRIC_RECTANGLE;
        this.renderData.color = "#00FF00";
    }
}
