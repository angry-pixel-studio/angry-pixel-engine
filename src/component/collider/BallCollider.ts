import { RenderManager } from "../../rendering/RenderManager";
import { container, GameConfig } from "../../core/Game";
import { Collider } from "./Collider";
import { GeometricRenderData, GeometricShape } from "../../rendering/renderData/GeometricRenderData";
import { Vector2 } from "../../math/Vector2";
import { RenderComponent } from "../../core/Component";
import { ComponentTypes } from "../ComponentTypes";
import { ColliderData } from "../../physics/collision/ColliderData";
import { Circumference } from "../../physics/collision/shape/Circumference";

export interface BallColliderConfig {
    radius: number;
    offsetX?: number;
    offsetY?: number;
    layer?: string;
    physics?: boolean;
    debug?: boolean;
}

export class BallCollider extends Collider {
    public debug: boolean = false;
    public radius: number;
    public offsetX: number = 0;
    public offsetY: number = 0;

    private realRadius: number = 0;
    private realOffset: Vector2 = new Vector2();
    private realPosition: Vector2 = new Vector2();

    private innerPosition: Vector2 = new Vector2();

    constructor(config: BallColliderConfig) {
        super();

        this.type = ComponentTypes.BallCollider;

        this.radius = config.radius;
        this.offsetX = config.offsetX ?? this.offsetX;
        this.offsetY = config.offsetY ?? this.offsetY;
        this.physics = config.physics ?? this.physics;
        this.debug = (config.debug ?? this.debug) && container.getConstant<GameConfig>("GameConfig").debugEnabled;
        this.layer = config.layer;
    }

    protected start(): void {
        this.colliders.push(
            new ColliderData(
                new Circumference(this.radius),
                this.layer ?? this.gameObject.layer,
                this.gameObject.id,
                true,
                this.physics,
                this.hasComponentOfType(ComponentTypes.RigidBody)
            )
        );

        if (this.debug) {
            this.renderer = this.gameObject.addComponent(() => new BallColliderRenderer(this.colliders[0]));
        }
    }

    protected update(): void {
        this.updateRealSize();
        this.updatePosition();
        this.updateShape();

        super.update();
    }

    private updateRealSize(): void {
        this.realRadius =
            this.radius *
            Math.max(Math.abs(this.gameObject.transform.scale.x), Math.abs(this.gameObject.transform.scale.y));

        this.realOffset.x = this.offsetX * this.gameObject.transform.scale.x;
        this.realOffset.y = this.offsetY * this.gameObject.transform.scale.y;
    }

    protected updatePosition(): void {
        Vector2.add(this.realPosition, this.gameObject.transform.position, this.realOffset);

        if (this.gameObject.transform.rotation.radians !== 0) {
            this.translate();
        }
    }

    private translate(): void {
        Vector2.subtract(this.innerPosition, this.realPosition, this.gameObject.transform.position);
        const translatedAngle: number =
            Math.atan2(this.innerPosition.y, this.innerPosition.x) + this.gameObject.transform.rotation.radians;

        this.realPosition.set(
            this.gameObject.transform.position.x + this.innerPosition.magnitude * Math.cos(translatedAngle),
            this.gameObject.transform.position.y + this.innerPosition.magnitude * Math.sin(translatedAngle)
        );
    }

    private updateShape(): void {
        this.colliders[0].layer = this.layer ?? this.gameObject.layer;
        this.colliders[0].shape.position = this.realPosition;
        (this.colliders[0].shape as Circumference).radius = this.realRadius;

        this.colliders[0].shape.update();
    }
}

class BallColliderRenderer extends RenderComponent {
    private renderManager: RenderManager = container.getSingleton<RenderManager>("RenderManager");

    private renderData: GeometricRenderData;
    private collider: ColliderData;

    constructor(collider: ColliderData) {
        super();

        this.type = "BallColliderRenderer";

        this.renderData = new GeometricRenderData();
        this.renderData.debug = true;
        this.renderData.color = "#00FF00";

        this.collider = collider;
    }

    protected update(): void {
        this.renderData.layer = this.gameObject.layer;
        this.renderData.shape = GeometricShape.Circumference;
        this.renderData.position = this.collider.shape.position;
        this.renderData.boundingBox = this.collider.shape.boundingBox;
        this.renderData.radius = (this.collider.shape as Circumference).radius;

        this.renderManager.addRenderData(this.renderData);
    }
}
