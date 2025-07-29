import { BaseCollider } from "./Collider";
import { RenderComponent } from "../../core/Component";
import { Exception } from "../../utils/Exception";
import { GeometricShape, RenderDataType, RenderLocation } from "@angry-pixel/2d-renderer";
import { Vector2, Rotation } from "@angry-pixel/math";
import { CollisionMethods, Polygon } from "@angry-pixel/2d-physics";
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
    constructor() {
        super(...arguments);
        /** If debug mode is enabled, the collider shape is rendered using the object's render layer */
        this.debug = false;
        /** x-axis offset */
        this.offsetX = 0;
        /** y-axis offset */
        this.offsetY = 0;
        this.scaledVertexModel = [];
        this.scaledOffset = new Vector2();
        this.scaledPosition = new Vector2();
        this.finalRotation = 0;
        this.innerPosition = new Vector2();
    }
    init(config) {
        var _a, _b, _c, _d, _e, _f;
        if (this.gameConfig.collisions.collisionMethod !== CollisionMethods.SAT) {
            throw new Exception("Polygon Colliders need SAT collision method.");
        }
        if (config.vertexModel.length < 3) {
            throw new Exception("Polygon Collider needs at least 3 vertices.");
        }
        this.debug = ((_a = config.debug) !== null && _a !== void 0 ? _a : this.debug) && this.gameConfig.debugEnabled;
        this.vertexModel = config.vertexModel;
        this.offsetX = (_b = config.offsetX) !== null && _b !== void 0 ? _b : this.offsetX;
        this.offsetY = (_c = config.offsetY) !== null && _c !== void 0 ? _c : this.offsetY;
        this.physics = (_d = config.physics) !== null && _d !== void 0 ? _d : this.physics;
        this.rotation = (_e = config.rotation) !== null && _e !== void 0 ? _e : new Rotation();
        this.layer = config.layer;
        for (let i = 0; i < this.vertexModel.length; i++) {
            this.scaledVertexModel.push(new Vector2());
        }
        this.colliders.push(this.physicsManager.addCollider({
            layer: (_f = this.layer) !== null && _f !== void 0 ? _f : this.gameObject.layer,
            position: this.gameObject.transform.position.clone(),
            rotation: this.rotation.radians,
            shape: new Polygon(this.scaledVertexModel),
            updateCollisions: true,
            physics: this.physics,
            group: this.gameObject.id.toString(),
        }));
        if (this.debug) {
            this.renderer = this.gameObject.addComponent(PolygonColliderRenderer, {
                collider: this.colliders[0],
            });
        }
    }
    updateRealSize() {
        this.vertexModel.forEach((vertex, index) => this.scaledVertexModel[index].set(vertex.x * this.gameObject.transform.scale.x, vertex.y * this.gameObject.transform.scale.y));
        this.scaledOffset.x = this.offsetX * this.gameObject.transform.scale.x;
        this.scaledOffset.y = this.offsetY * this.gameObject.transform.scale.y;
        this.finalRotation = this.gameObject.transform.rotation.radians + this.rotation.radians;
    }
    updatePosition() {
        Vector2.add(this.scaledPosition, this.gameObject.transform.position, this.scaledOffset);
        if (this.gameObject.transform.rotation.radians !== 0) {
            this.translate();
        }
    }
    translate() {
        Vector2.subtract(this.innerPosition, this.scaledPosition, this.gameObject.transform.position);
        const translatedAngle = Math.atan2(this.innerPosition.y, this.innerPosition.x) + this.gameObject.transform.rotation.radians;
        this.scaledPosition.set(this.gameObject.transform.position.x + this.innerPosition.magnitude * Math.cos(translatedAngle), this.gameObject.transform.position.y + this.innerPosition.magnitude * Math.sin(translatedAngle));
    }
    updateColliders() {
        var _a;
        this.colliders[0].layer = (_a = this.layer) !== null && _a !== void 0 ? _a : this.gameObject.layer;
        this.colliders[0].position.copy(this.scaledPosition);
        this.colliders[0].rotation = this.finalRotation;
        this.colliders[0].shape.vertexModel = this.scaledVertexModel;
    }
}
/** @internal */
export class PolygonColliderRenderer extends RenderComponent {
    init({ collider }) {
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
    update() {
        this.renderData.layer = this.gameObject.layer;
        this.renderData.position.copy(this.collider.position);
        this.renderData.rotation = this.collider.shape.rotation;
        this.renderData.vertexModel = this.collider.shape.vertexModel;
        this.renderManager.addRenderData(this.renderData);
    }
}
//# sourceMappingURL=PolygonCollider.js.map