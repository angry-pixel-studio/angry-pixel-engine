import { BaseCollider } from "./Collider";
import { RenderComponent } from "../../core/Component";
import { Exception } from "../../utils/Exception";
import { InitOptions } from "../../core/GameActor";
import { GeometricShape, IGeometricRenderData, RenderDataType, RenderLocation } from "angry-pixel-2d-renderer";
import { Vector2, Rotation } from "angry-pixel-math";
import { CollisionMethods, ICollider, Polygon } from "angry-pixel-2d-physics";

/**
 * PolygonCollider configuration options
 * @public
 * @category Components
 * @example
 * ```js
 * this.addComponent(PolygonCollider, {
 *   vertexModel: [new Vector2(0,0), new Vector2(32, 32), new Vector2(64, 0)],
 *   rotation: new Rotation(0),
 *   offsetX: 0,
 *   offsetY: 0,
 *   layer: "Hills",
 *   debug: false,
 *   physics: true,
 * });
 * ```
 */
export interface PolygonColliderOptions extends InitOptions {
    /** Collection of 2d vectors representing the vertices of the collider */
    vertexModel: Vector2[];
    /** x-axis offset */
    offsetX?: number;
    /** y-axis offset */
    offsetY?: number;
    /** Edges rotation (degrees or radians) */
    rotation?: Rotation;
    /** Collision layer, if it's not setted, it uses the game object layer */
    layer?: string;
    /** TRUE if this collider interact with rigid bodies */
    physics?: boolean;
    /** If debug mode is enabled, the collider shape is rendered using the object's render layer */
    debug?: boolean;
}

/**
 * Polygon shaped Collider for 2d collisions. Only convex polygons are allowed.
 * @public
 * @category Components
 * @example
 * ```js
 * this.addComponent(PolygonCollider, {
 *   vertexModel: [new Vector2(0,0), new Vector2(32, 32), new Vector2(64, 0)],
 * });
 * ```
 * @example
 * ```js
 * this.addComponent(PolygonCollider, {
 *   vertexModel: [new Vector2(0,0), new Vector2(32, 32), new Vector2(64, 0)],
 *   rotation: new Rotation(0),
 *   offsetX: 0,
 *   offsetY: 0,
 *   layer: "Hills",
 *   debug: false,
 *   physics: true,
 * });
 * ```
 */
export class PolygonCollider extends BaseCollider {
    /** If debug mode is enabled, the collider shape is rendered using the object's render layer */
    public debug: boolean = false;
    /** Collection of 2d vectors representing the vertices of the collider */
    public vertexModel: Vector2[];
    /** x-axis offset */
    public offsetX: number = 0;
    /** y-axis offset */
    public offsetY: number = 0;
    /** Rectangle rotation (degrees or radians) */
    public rotation: Rotation;

    private scaledVertexModel: Vector2[] = [];
    private scaledOffset: Vector2 = new Vector2();
    private scaledPosition: Vector2 = new Vector2();
    private finalRotation: number = 0;
    private innerPosition: Vector2 = new Vector2();

    protected init(config: PolygonColliderOptions): void {
        if (this.gameConfig.collisions.collisionMethod !== CollisionMethods.SAT) {
            throw new Exception("Polygon Colliders need SAT collision method.");
        }

        if (config.vertexModel.length < 3) {
            throw new Exception("Polygon Collider needs at least 3 vertices.");
        }

        this.debug = (config.debug ?? this.debug) && this.gameConfig.debugEnabled;
        this.vertexModel = config.vertexModel;
        this.offsetX = config.offsetX ?? this.offsetX;
        this.offsetY = config.offsetY ?? this.offsetY;
        this.physics = config.physics ?? this.physics;
        this.rotation = config.rotation ?? new Rotation();
        this.layer = config.layer;

        for (let i = 0; i < this.vertexModel.length; i++) {
            this.scaledVertexModel.push(new Vector2());
        }

        this.colliders.push(
            this.physicsManager.addCollider({
                layer: this.layer ?? this.gameObject.layer,
                position: this.gameObject.transform.position.clone(),
                rotation: this.rotation.radians,
                shape: new Polygon(this.scaledVertexModel),
                updateCollisions: true,
                physics: this.physics,
                group: this.gameObject.id.toString(),
            })
        );

        if (this.debug) {
            this.renderer = this.gameObject.addComponent(PolygonColliderRenderer, {
                collider: this.colliders[0],
            });
        }
    }

    protected updateRealSize(): void {
        this.vertexModel.forEach((vertex, index) =>
            this.scaledVertexModel[index].set(
                vertex.x * this.gameObject.transform.scale.x,
                vertex.y * this.gameObject.transform.scale.y
            )
        );

        this.scaledOffset.x = this.offsetX * this.gameObject.transform.scale.x;
        this.scaledOffset.y = this.offsetY * this.gameObject.transform.scale.y;
        this.finalRotation = this.gameObject.transform.rotation.radians + this.rotation.radians;
    }

    protected updatePosition(): void {
        Vector2.add(this.scaledPosition, this.gameObject.transform.position, this.scaledOffset);

        if (this.gameObject.transform.rotation.radians !== 0) {
            this.translate();
        }
    }

    private translate(): void {
        Vector2.subtract(this.innerPosition, this.scaledPosition, this.gameObject.transform.position);
        const translatedAngle: number =
            Math.atan2(this.innerPosition.y, this.innerPosition.x) + this.gameObject.transform.rotation.radians;

        this.scaledPosition.set(
            this.gameObject.transform.position.x + this.innerPosition.magnitude * Math.cos(translatedAngle),
            this.gameObject.transform.position.y + this.innerPosition.magnitude * Math.sin(translatedAngle)
        );
    }

    protected updateColliders(): void {
        this.colliders[0].layer = this.layer ?? this.gameObject.layer;
        this.colliders[0].position.copy(this.scaledPosition);
        this.colliders[0].rotation = this.finalRotation;
        (this.colliders[0].shape as Polygon).vertexModel = this.scaledVertexModel;
    }
}

/** @internal */
export class PolygonColliderRenderer extends RenderComponent {
    private renderData: IGeometricRenderData;
    private collider: ICollider;

    protected init({ collider }: { collider: ICollider }): void {
        this.renderData = {
            type: RenderDataType.Geometric,
            location: RenderLocation.WorldSpace,
            layer: this.gameObject.layer,
            position: new Vector2(),
            shape: GeometricShape.Polygon,
            color: "#00FF00",
        };

        this.collider = collider;
    }

    protected update(): void {
        this.renderData.layer = this.gameObject.layer;
        this.renderData.position.copy(this.collider.position);
        this.renderData.rotation = this.collider.shape.rotation;
        this.renderData.vertexModel = (this.collider.shape as Polygon).vertexModel;

        this.renderManager.addRenderData(this.renderData);
    }
}
