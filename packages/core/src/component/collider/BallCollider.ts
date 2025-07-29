import { BaseCollider } from "./Collider";
import { RenderComponent } from "../../core/Component";
import { InitOptions } from "../../core/GameActor";
import { Vector2 } from "@angry-pixel/math";
import { GeometricShape, IGeometricRenderData, RenderDataType, RenderLocation } from "@angry-pixel/2d-renderer";
import { Circumference, ICollider } from "@angry-pixel/2d-physics";

/**
 * BallCollider configuration options
 * @public
 * @category Components
 *  @example
 * ```js
 * this.addComponent(BallCollider, {
 *   radius: 32,
 *   offsetX: 0,
 *   offsetY: 0,
 *   layer: "PlayerHitbox",
 *   debug: false,
 *   physics: true,
 * });
 * ```
 */
export interface BallColliderOptions extends InitOptions {
    /** Radius in pixels */
    radius: number;
    /** x-axis offset */
    offsetX?: number;
    /** y-axis offset */
    offsetY?: number;
    /** Collision layer, if it's not setted, it uses the game object layer */
    layer?: string;
    /** TRUE if this collider interact with rigid bodies */
    physics?: boolean;
    /** If debug mode is enabled, the collider shape is rendered using the object's render layer */
    debug?: boolean;
}

/**
 * Circumference shaped collider for 2d collisions.
 * @public
 * @category Components
 * @example
 * ```js
 * this.addComponent(BallCollider, {
 *   radius: 32
 * });
 * ```
 * @example
 * ```js
 * this.addComponent(BallCollider, {
 *   radius: 32,
 *   offsetX: 0,
 *   offsetY: 0,
 *   layer: "PlayerHitbox",
 *   debug: false,
 *   physics: true,
 * });
 * ```
 */
export class BallCollider extends BaseCollider {
    /** If debug mode is enabled, the collider shape is rendered using the object's render layer */
    public debug: boolean = false;
    /** Radius in pixels */
    public radius: number;
    /** x-axis offset */
    public offsetX: number = 0;
    /** y-axis offset */
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
                group: this.gameObject.id.toString(),
            }),
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
            this.gameObject.transform.position.y + this.innerPosition.magnitude * Math.sin(translatedAngle),
        );
    }

    protected updateColliders(): void {
        this.colliders[0].layer = this.layer ?? this.gameObject.layer;
        this.colliders[0].position.copy(this.realPosition);
        (this.colliders[0].shape as Circumference).radius = this.realRadius;
    }
}

/** @internal */
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
