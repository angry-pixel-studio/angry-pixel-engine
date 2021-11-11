import { RenderManager } from "../../rendering/RenderManager";
import { CollisionMethodConfig, container, GameConfig } from "../../core/Game";
import { RectangleCollider } from "../../physics/collision/collider/RectangleCollider";
import { AbstractColliderComponent } from "./AbstractColliderComponent";
import { ColliderRenderData } from "../../rendering/renderData/ColliderRenderData";
import { Vector2 } from "../../math/Vector2";
import { RenderComponent } from "../../core/Component";
import { ICollider } from "../../physics/collision/collider/ICollider";
import { Rotation } from "../../math/Rotation";
import { ComponentTypes } from "../ComponentTypes";

export interface BoxColliderConfig {
    width: number;
    height: number;
    offsetX?: number;
    offsetY?: number;
    rotation?: Rotation;
    physics?: boolean;
    debug?: boolean;
}

export class BoxCollider extends AbstractColliderComponent {
    public debug: boolean = false;
    public width: number;
    public height: number;
    public offsetX: number = 0;
    public offsetY: number = 0;
    public rotation: Rotation;

    private realWidth: number = 0;
    private realHeight: number = 0;
    private realOffset: Vector2 = new Vector2();
    private realPosition: Vector2 = new Vector2();
    private realRotation: number = 0;

    private applyRotation: boolean =
        container.getConstant<GameConfig>("GameConfig").collisions.method === CollisionMethodConfig.SAT;
    private innerPosition: Vector2 = new Vector2();

    constructor(config: BoxColliderConfig) {
        super();

        this.type = ComponentTypes.BoxCollider;

        this.width = config.width;
        this.height = config.height;
        this.offsetX = config.offsetX ?? this.offsetX;
        this.offsetY = config.offsetY ?? this.offsetY;
        this._physics = config.physics ?? this._physics;
        this.debug = (config.debug ?? this.debug) && container.getConstant<GameConfig>("GameConfig").debugEnabled;
        this.rotation = config.rotation ?? new Rotation();
    }

    protected start(): void {
        this.updateRealSize();

        this.addCollider(
            new RectangleCollider(
                this.gameObject.transform.position,
                this.realWidth,
                this.realHeight,
                this._physics,
                this.gameObject,
                this.realRotation
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

        if (this.realRotation !== 0 && this.applyRotation) {
            (this.colliders[0] as RectangleCollider).angle = this.realRotation;
        }

        if (this.gameObject.transform.rotation.radians !== 0) {
            this.translate();
        }
    }

    private updateRealSize(): void {
        this.realWidth = this.width * Math.abs(this.gameObject.transform.scale.x);
        this.realHeight = this.height * Math.abs(this.gameObject.transform.scale.y);

        this.realOffset.x = this.offsetX * this.gameObject.transform.scale.x;
        this.realOffset.y = this.offsetY * this.gameObject.transform.scale.y;

        this.realRotation = this.gameObject.transform.rotation.radians + this.rotation.radians;
    }

    private translate(): void {
        Vector2.subtract(this.innerPosition, this.colliders[0].position, this.gameObject.transform.position);
        const translatedAngle: number =
            Math.atan2(this.innerPosition.y, this.innerPosition.x) + this.gameObject.transform.rotation.radians;
        this.realPosition.set(
            this.gameObject.transform.position.x + this.innerPosition.magnitude * Math.cos(translatedAngle),
            this.gameObject.transform.position.y + this.innerPosition.magnitude * Math.sin(translatedAngle)
        );
        this.colliders[0].position = this.realPosition;
    }
}

class BoxColliderRenderer extends RenderComponent {
    private renderManager: RenderManager = container.getSingleton<RenderManager>("RenderManager");

    private renderData: ColliderRenderData;
    private collider: ICollider;

    constructor(collider: ICollider) {
        super();

        this.type = "BoxColliderRenderer";

        this.renderData = new ColliderRenderData();
        this.renderData.debug = true;
        this.renderData.color = "#00FF00";

        this.collider = collider;
    }

    protected update(): void {
        this.renderData.layer = this.gameObject.layer;
        this.renderData.position = this.collider.position;
        this.renderData.shape = this.collider.shape;
        this.renderManager.addRenderData(this.renderData);
    }
}
