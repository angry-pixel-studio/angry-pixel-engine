import { BaseCollider } from "./Collider";
import { InitOptions } from "../../core/GameActor";
import { Rotation, Vector2 } from "angry-pixel-math";
import { PolygonColliderRenderer } from "./PolygonCollider";
import { GameConfig } from "../../core/GameConfig";
import { CollisionMethods, Rectangle } from "angry-pixel-2d-physics";

export interface BoxColliderOptions extends InitOptions {
    width: number;
    height: number;
    offsetX?: number;
    offsetY?: number;
    rotation?: Rotation;
    layer?: string;
    physics?: boolean;
    debug?: boolean;
}

export class BoxCollider extends BaseCollider {
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
        this.container.getConstant<GameConfig>("GameConfig").collisions.collisionMethod === CollisionMethods.SAT;
    private innerPosition: Vector2 = new Vector2();

    protected init(config: BoxColliderOptions): void {
        this.width = config.width;
        this.height = config.height;
        this.offsetX = config.offsetX ?? this.offsetX;
        this.offsetY = config.offsetY ?? this.offsetY;
        this.physics = config.physics ?? this.physics;
        this.debug = (config.debug ?? this.debug) && this.container.getConstant<GameConfig>("GameConfig").debugEnabled;
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
                group: this.gameObject.id,
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
