import { BaseCollider } from "./Collider";
import { RenderComponent } from "../../core/Component";
import { InitOptions } from "../../core/GameActor";
import { Vector2 } from "angry-pixel-math";
import { GeometricShape, IGeometricRenderData, RenderDataType, RenderLocation } from "angry-pixel-2d-renderer";
import { Circumference, ICollider } from "angry-pixel-2d-physics";

export interface BallColliderOptions extends InitOptions {
    radius: number;
    offsetX?: number;
    offsetY?: number;
    layer?: string;
    physics?: boolean;
    debug?: boolean;
}

export class BallCollider extends BaseCollider {
    public debug: boolean = false;
    public radius: number;
    public offsetX: number = 0;
    public offsetY: number = 0;

    private realRadius: number = 0;
    private realOffset: Vector2 = new Vector2();
    private realPosition: Vector2 = new Vector2();

    private innerPosition: Vector2 = new Vector2();

    protected init(config: BallColliderOptions): void {
        this.radius = config.radius;
        this.offsetX = config.offsetX ?? this.offsetX;
        this.offsetY = config.offsetY ?? this.offsetY;
        this.physics = config.physics ?? this.physics;
        this.debug = (config.debug ?? this.debug) && this.gameConfig.debugEnabled;
        this.layer = config.layer;

        this.colliders.push(
            this.physicsManager.addCollider({
                layer: this.layer ?? this.gameObject.layer,
                position: this.gameObject.transform.position.clone(),
                shape: new Circumference(this.radius),
                updateCollisions: true,
                physics: this.physics,
                group: this.gameObject.id,
            })
        );

        if (this.debug) {
            this.renderer = this.gameObject.addComponent(BallColliderRenderer, { collider: this.colliders[0] });
        }
    }

    protected updateRealSize(): void {
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

    protected updateColliders(): void {
        this.colliders[0].layer = this.layer ?? this.gameObject.layer;
        this.colliders[0].position.copy(this.realPosition);
        (this.colliders[0].shape as Circumference).radius = this.realRadius;
    }
}

class BallColliderRenderer extends RenderComponent {
    private renderData: IGeometricRenderData;
    private collider: ICollider;

    protected init({ collider }: { collider: ICollider }): void {
        this.renderData = {
            type: RenderDataType.Geometric,
            location: RenderLocation.WorldSpace,
            layer: this.gameObject.layer,
            position: new Vector2(),
            shape: GeometricShape.Circumference,
            color: "#00FF00",
        };

        this.collider = collider;
    }

    protected update(): void {
        this.renderData.layer = this.gameObject.layer;
        this.renderData.position.copy(this.collider.position);
        this.renderData.radius = (this.collider.shape as Circumference).radius;

        this.renderManager.addRenderData(this.renderData);
    }
}
