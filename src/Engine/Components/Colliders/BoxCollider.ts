import { RenderManager } from "../../Core/Rendering/RenderManager";
import { CollisionMethodConfig, container, GameConfig } from "../../Game";
import { RectangleCollider } from "../../Core/Collision/Collider/RectangleCollider";
import { AbstractColliderComponent } from "./AbstractColliderComponent";
import { ColliderRenderData } from "../../Core/Rendering/RenderData/ColliderRenderData";
import { Vector2 } from "../../Math/Vector2";
import { RenderComponent } from "../../Component";
import { ICollider } from "../../Core/Collision/Collider/ICollider";

export interface BoxColliderConfig {
    width: number;
    height: number;
    offsetX?: number;
    offsetY?: number;
    rotation?: number;
    physics?: boolean;
    debug?: boolean;
}

export const TYPE_BOX_COLLIDER: string = "BoxCollider";

export class BoxCollider extends AbstractColliderComponent {
    public debug: boolean = false;
    public width: number;
    public height: number;
    public offsetX: number = 0;
    public offsetY: number = 0;
    public rotation: number = 0;

    private realWidth: number = 0;
    private realHeight: number = 0;
    private realOffset: Vector2 = new Vector2();
    private realPosition: Vector2 = new Vector2();
    private realRotation: number = 0;

    private applyRotation: boolean =
        container.getConstant<GameConfig>("GameConfig").collisions.method === CollisionMethodConfig.SAT;

    constructor(config: BoxColliderConfig) {
        super();

        this.type = TYPE_BOX_COLLIDER;

        this.width = config.width;
        this.height = config.height;
        this.offsetX = config.offsetX ?? this.offsetX;
        this.offsetY = config.offsetY ?? this.offsetY;
        this._physics = config.physics ?? this._physics;
        this.debug = config.debug ?? this.debug;
        this.rotation = config.rotation ?? this.rotation;
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
            this.renderer = this.gameObject.addComponent(() => new BoxColliderRenderer(this.colliders[0]));
        }
    }

    protected update(): void {
        this.updatePosition();
    }

    protected updatePosition(): void {
        this.updateRealSize();

        (this.colliders[0] as RectangleCollider).width = this.realWidth;
        (this.colliders[0] as RectangleCollider).height = this.realHeight;

        this.colliders[0].position = Vector2.add(
            this.realPosition,
            this.gameObject.transform.position,
            this.realOffset
        );

        this.realRotation = this.gameObject.transform.rotation + this.rotation;
        if (this.realRotation !== 0 && this.applyRotation) {
            (this.colliders[0] as RectangleCollider).angle = this.realRotation;
        }

        if (this.gameObject.transform.rotation !== 0) {
            this.translate();
        }
    }

    private updateRealSize(): void {
        this.realWidth = this.width * Math.abs(this.gameObject.transform.scale.x);
        this.realHeight = this.height * Math.abs(this.gameObject.transform.scale.y);

        this.realOffset.x = this.offsetX * this.gameObject.transform.scale.x;
        this.realOffset.y = this.offsetY * this.gameObject.transform.scale.y;
    }

    private translate(): void {
        const goRad: number = (this.gameObject.transform.rotation * Math.PI) / 180.0;
        const thisRad: number = Math.atan2(
            this.colliders[0].position.x - this.gameObject.transform.position.x,
            this.colliders[0].position.y - this.gameObject.transform.position.y
        );
        const radius: number = Math.hypot(
            this.colliders[0].position.x - this.gameObject.transform.position.x,
            this.colliders[0].position.y - this.gameObject.transform.position.y
        );

        this.realPosition.set(
            this.gameObject.transform.position.x + radius * Math.sin(thisRad - goRad),
            this.gameObject.transform.position.y + radius * Math.cos(thisRad - goRad)
        );
        this.colliders[0].position = this.realPosition;
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
        this.renderData.color = "#00FF00";

        this.collider = collider;
    }

    protected update(): void {
        this.renderData.layer = this.gameObject.layer;
        this.renderData.position = this.collider.position;
        this.renderData.shape = this.collider.shape;
        this.renderManager.addToRenderStack(this.renderData);
    }
}
