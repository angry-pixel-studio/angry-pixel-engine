import { LAYER_DEFAULT } from "../../GameObject";
import { RenderManager } from "../../Core/Rendering/RenderManager";
import { container } from "../../Game";
import { RectangleCollider } from "../../Core/Collision/Collider/RectangleCollider";
import { ColliderComponent } from "./ColliderComponent";
import { ColliderRenderData } from "../../Core/Rendering/RenderData/ColliderRenderData";
import { Vector2 } from "../../Math/Vector2";
import { RenderComponent } from "../../Component";
import { ICollider } from "../../Core/Collision/Collider/ICollider";

interface Config {
    width: number;
    height: number;
    offsetX?: number;
    offsetY?: number;
    physics?: boolean;
    debug?: boolean;
}

export const TYPE_BOX_COLLIDER: string = "BoxCollider";

export class BoxCollider extends ColliderComponent {
    public debug: boolean = false;

    private width: number;
    private height: number;
    private offsetX: number = 0;
    private offsetY: number = 0;

    private realWidth: number = 0;
    private realHeight: number = 0;
    private realOffsetX: number = 0;
    private realOffsetY: number = 0;

    constructor(config: Config) {
        super();

        this.type = TYPE_BOX_COLLIDER;

        this.width = config.width;
        this.height = config.height;
        this.offsetX = config.offsetX ?? this.offsetX;
        this.offsetY = config.offsetY ?? this.offsetY;
        this._physics = config.physics ?? this.physics;
        this.debug = config.debug ?? this.debug;
    }

    protected start(): void {
        this.updateRealSize();

        this.addCollider(
            new RectangleCollider(
                this.gameObject.transform.position,
                this.realWidth,
                this.realHeight,
                this._physics,
                this.gameObject
            )
        );

        if (this.debug) {
            this.gameObject.addComponent(() => new BoxColliderRenderer(this.colliders[0]));
        }
    }

    protected update(): void {
        this.updatePosition();
    }

    protected updatePosition() {
        this.updateRealSize();

        (this.colliders[0] as RectangleCollider).width = this.realWidth;
        (this.colliders[0] as RectangleCollider).height = this.realHeight;
        this.colliders[0].position = this.gameObject.transform.position.add(
            new Vector2(this.realOffsetX, this.realOffsetY)
        );
    }

    private updateRealSize(): void {
        this.realWidth = this.width * Math.abs(this.gameObject.transform.scale.x);
        this.realHeight = this.height * Math.abs(this.gameObject.transform.scale.y);
        this.realOffsetX = this.offsetX * this.gameObject.transform.scale.x;
        this.realOffsetY = this.offsetY * this.gameObject.transform.scale.y;
    }
}

const TYPE_BOX_COLLIDER_RENDERER: string = "BoxColliderRenderer";

class BoxColliderRenderer extends RenderComponent {
    private renderManager: RenderManager = container.getSingleton<RenderManager>("RenderManager");

    private renderData: ColliderRenderData;
    private collider: ICollider;

    constructor(collider: ICollider) {
        super();

        this.type = TYPE_BOX_COLLIDER_RENDERER;

        this.renderData = new ColliderRenderData();
        this.renderData.debug = true;
        this.renderData.layer = LAYER_DEFAULT;
        this.renderData.color = "#00FF00";

        this.collider = collider;
    }

    protected update(): void {
        this.renderData.position = this.collider.position;
        this.renderData.shape = this.collider.shape;
        this.renderManager.addToRenderStack(this.renderData);
    }
}
