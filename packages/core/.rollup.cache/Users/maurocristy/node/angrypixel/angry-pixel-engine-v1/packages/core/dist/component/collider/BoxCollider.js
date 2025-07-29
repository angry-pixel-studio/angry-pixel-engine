import { BaseCollider } from "./Collider";
import { Rotation, Vector2 } from "@angry-pixel/math";
import { PolygonColliderRenderer } from "./PolygonCollider";
import { CollisionMethods, Rectangle } from "@angry-pixel/2d-physics";
/**
 * Rectangle shaped collider for 2d collisions.
 * @public
 * @category Components
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
    constructor() {
        super(...arguments);
        /** If debug mode is enabled, the collider shape is rendered using the object's render layer */
        this.debug = false;
        /** x-axis offset */
        this.offsetX = 0;
        /** y-axis offset */
        this.offsetY = 0;
        this.realWidth = 0;
        this.realHeight = 0;
        this.realOffset = new Vector2();
        this.realPosition = new Vector2();
        this.realRotation = 0;
        this.applyRotation = this.gameConfig.collisions.collisionMethod === CollisionMethods.SAT;
        this.innerPosition = new Vector2();
    }
    init(config) {
        var _a, _b, _c, _d, _e, _f;
        this.width = config.width;
        this.height = config.height;
        this.offsetX = (_a = config.offsetX) !== null && _a !== void 0 ? _a : this.offsetX;
        this.offsetY = (_b = config.offsetY) !== null && _b !== void 0 ? _b : this.offsetY;
        this.physics = (_c = config.physics) !== null && _c !== void 0 ? _c : this.physics;
        this.debug = ((_d = config.debug) !== null && _d !== void 0 ? _d : this.debug) && this.gameConfig.debugEnabled;
        this.rotation = (_e = config.rotation) !== null && _e !== void 0 ? _e : new Rotation();
        this.layer = config.layer;
        this.colliders.push(this.physicsManager.addCollider({
            layer: (_f = this.layer) !== null && _f !== void 0 ? _f : this.gameObject.layer,
            position: this.gameObject.transform.position.clone(),
            rotation: this.rotation.radians,
            shape: new Rectangle(this.realWidth, this.realHeight),
            updateCollisions: true,
            physics: this.physics,
            group: this.gameObject.id.toString(),
        }));
        if (this.debug) {
            this.renderer = this.gameObject.addComponent(PolygonColliderRenderer, { collider: this.colliders[0] });
        }
    }
    updateRealSize() {
        this.realWidth = this.width * Math.abs(this.gameObject.transform.scale.x);
        this.realHeight = this.height * Math.abs(this.gameObject.transform.scale.y);
        this.realOffset.x = this.offsetX * this.gameObject.transform.scale.x;
        this.realOffset.y = this.offsetY * this.gameObject.transform.scale.y;
        this.realRotation = this.applyRotation ? this.gameObject.transform.rotation.radians + this.rotation.radians : 0;
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
        this.colliders[0].rotation = this.realRotation;
        this.colliders[0].shape.updateSize(this.realWidth, this.realHeight);
    }
}
//# sourceMappingURL=BoxCollider.js.map