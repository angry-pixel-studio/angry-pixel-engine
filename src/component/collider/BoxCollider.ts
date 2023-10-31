import { BaseCollider } from "./Collider";
import { InitOptions } from "../../core/GameActor";
import { Rotation, Vector2 } from "angry-pixel-math";
import { PolygonColliderRenderer } from "./PolygonCollider";
import { CollisionMethods, Rectangle } from "angry-pixel-2d-physics";

/**
 * BoxCollider configuration options
 * @public
 */
export interface BoxColliderOptions extends InitOptions {
    /** Width of the rectangle in pixels */
    width: number;
    /** Height of the rectangle in pixels */
    height: number;
    /** x-axis offset */
    offsetX?: number;
    /** y-axis offset */
    offsetY?: number;
    /** Rectangle rotation (degrees or radians) */
    rotation?: Rotation;
    /** Collision layer, if it's not setted, it uses the game object layer */
    layer?: string;
    /** TRUE if this collider interact with rigid bodies */
    physics?: boolean;
    /** If debug mode is enabled, the collider shape is rendered using the object's render layer */
    debug?: boolean;
}

/**
 * Rectangle shaped collider for 2d collisions.
 * @public
 * @example
 * ```js
 * this.addComponent(BoxCollider, {
 *   width: 32,
 *   height: 32,
 * });
 * ```
 * @example
 * ```js
 * this.addComponent(BoxCollider, {
 *   width: 32,
 *   height: 32,
 *   rotation: new Rotation(0),
 *   offsetX: 0,
 *   offsetY: 0,
 *   layer: "PlayerHitbox",
 *   debug: false,
 *   physics: true,
 * });
 * ```
 */
export class BoxCollider extends BaseCollider {
    /** If debug mode is enabled, the collider shape is rendered using the object's render layer */
    public debug: boolean = false;
    /** Width of the rectangle in pixels */
    public width: number;
    /** Height of the rectangle in pixels */
    public height: number;
    /** x-axis offset */
    public offsetX: number = 0;
    /** y-axis offset */
    public offsetY: number = 0;
    /** Rectangle rotation (degrees or radians) */
    public rotation: Rotation;

    private realWidth: number = 0;
    private realHeight: number = 0;
    private realOffset: Vector2 = new Vector2();
    private realPosition: Vector2 = new Vector2();
    private realRotation: number = 0;

    private applyRotation: boolean = this.gameConfig.collisions.collisionMethod === CollisionMethods.SAT;
    private innerPosition: Vector2 = new Vector2();

    protected init(config: BoxColliderOptions): void {
        this.width = config.width;
        this.height = config.height;
        this.offsetX = config.offsetX ?? this.offsetX;
        this.offsetY = config.offsetY ?? this.offsetY;
        this.physics = config.physics ?? this.physics;
        this.debug = (config.debug ?? this.debug) && this.gameConfig.debugEnabled;
        this.rotation = config.rotation ?? new Rotation();
        this.layer = config.layer;

        this.colliders.push(
            this.physicsManager.addCollider({
                layer: this.layer ?? this.gameObject.layer,
                position: this.gameObject.transform.position.clone(),
                rotation: this.rotation.radians,
                shape: new Rectangle(this.realWidth, this.realHeight),
                updateCollisions: true,
                physics: this.physics,
                group: this.gameObject.id.toString(),
            })
        );

        if (this.debug) {
            this.renderer = this.gameObject.addComponent(PolygonColliderRenderer, { collider: this.colliders[0] });
        }
    }

    protected updateRealSize(): void {
        this.realWidth = this.width * Math.abs(this.gameObject.transform.scale.x);
        this.realHeight = this.height * Math.abs(this.gameObject.transform.scale.y);

        this.realOffset.x = this.offsetX * this.gameObject.transform.scale.x;
        this.realOffset.y = this.offsetY * this.gameObject.transform.scale.y;

        this.realRotation = this.applyRotation ? this.gameObject.transform.rotation.radians + this.rotation.radians : 0;
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
        this.colliders[0].rotation = this.realRotation;
        (this.colliders[0].shape as Rectangle).updateSize(this.realWidth, this.realHeight);
    }
}
