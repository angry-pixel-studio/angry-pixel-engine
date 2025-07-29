import { BaseCollider } from "./Collider";
import { RenderComponent } from "../../core/Component";
import { Vector2 } from "@angry-pixel/math";
import { GeometricShape, RenderDataType, RenderLocation } from "@angry-pixel/2d-renderer";
import { Circumference } from "@angry-pixel/2d-physics";
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
    constructor() {
        super(...arguments);
        /** If debug mode is enabled, the collider shape is rendered using the object's render layer */
        this.debug = false;
        /** x-axis offset */
        this.offsetX = 0;
        /** y-axis offset */
        this.offsetY = 0;
        this.realRadius = 0;
        this.realOffset = new Vector2();
        this.realPosition = new Vector2();
        this.innerPosition = new Vector2();
    }
    init(config) {
        var _a, _b, _c, _d, _e;
        this.radius = config.radius;
        this.offsetX = (_a = config.offsetX) !== null && _a !== void 0 ? _a : this.offsetX;
        this.offsetY = (_b = config.offsetY) !== null && _b !== void 0 ? _b : this.offsetY;
        this.physics = (_c = config.physics) !== null && _c !== void 0 ? _c : this.physics;
        this.debug = ((_d = config.debug) !== null && _d !== void 0 ? _d : this.debug) && this.gameConfig.debugEnabled;
        this.layer = config.layer;
        this.colliders.push(this.physicsManager.addCollider({
            layer: (_e = this.layer) !== null && _e !== void 0 ? _e : this.gameObject.layer,
            position: this.gameObject.transform.position.clone(),
            shape: new Circumference(this.radius),
            updateCollisions: true,
            physics: this.physics,
            group: this.gameObject.id.toString(),
        }));
        if (this.debug) {
            this.renderer = this.gameObject.addComponent(BallColliderRenderer, { collider: this.colliders[0] });
        }
    }
    updateRealSize() {
        this.realRadius =
            this.radius *
                Math.max(Math.abs(this.gameObject.transform.scale.x), Math.abs(this.gameObject.transform.scale.y));
        this.realOffset.x = this.offsetX * this.gameObject.transform.scale.x;
        this.realOffset.y = this.offsetY * this.gameObject.transform.scale.y;
    }
    updatePosition() {
        Vector2.add(this.realPosition, this.gameObject.transform.position, this.realOffset);
        if (this.gameObject.transform.rotation.radians !== 0) {
            this.translate();
        }
    }
    translate() {
        Vector2.subtract(this.innerPosition, this.realPosition, this.gameObject.transform.position);
        const translatedAngle = Math.atan2(this.innerPosition.y, this.innerPosition.x) + this.gameObject.transform.rotation.radians;
        this.realPosition.set(this.gameObject.transform.position.x + this.innerPosition.magnitude * Math.cos(translatedAngle), this.gameObject.transform.position.y + this.innerPosition.magnitude * Math.sin(translatedAngle));
    }
    updateColliders() {
        var _a;
        this.colliders[0].layer = (_a = this.layer) !== null && _a !== void 0 ? _a : this.gameObject.layer;
        this.colliders[0].position.copy(this.realPosition);
        this.colliders[0].shape.radius = this.realRadius;
    }
}
/** @internal */
class BallColliderRenderer extends RenderComponent {
    init({ collider }) {
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
    update() {
        this.renderData.layer = this.gameObject.layer;
        this.renderData.position.copy(this.collider.position);
        this.renderData.radius = this.collider.shape.radius;
        this.renderManager.addRenderData(this.renderData);
    }
}
//# sourceMappingURL=BallCollider.js.map