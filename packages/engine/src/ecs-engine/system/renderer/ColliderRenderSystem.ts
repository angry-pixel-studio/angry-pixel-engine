import { Vector2 } from "../../../math";
import { IPhysicsManager, Circumference, CollisionMethods, Polygon } from "../../../2d-physics";
import {
    IRenderManager,
    GeometricShape,
    IGeometricRenderData,
    RenderDataType,
    RenderLocation,
} from "../../../2d-renderer";
import { defaultRenderLayer } from "../../component/Camera";
import { System } from "../../../ecs/SystemManager";

export class ColliderRenderSystem implements System {
    private renderData: Map<number, IGeometricRenderData> = new Map();

    constructor(
        private physicsManager: IPhysicsManager,
        private renderManager: IRenderManager,
        private collisionMethod: CollisionMethods,
    ) {}

    public onUpdate(): void {
        this.physicsManager.getEntities().forEach(([id, t, rb, colliders]) => {
            colliders.forEach((c) => {
                const renderData = this.getOrCreateRenderData(c.id);

                if (c.shape instanceof Polygon) {
                    if (this.collisionMethod === CollisionMethods.SAT) {
                        renderData.shape = c.shape.vertices.length > 2 ? GeometricShape.Polygon : GeometricShape.Line;
                        renderData.color = "#00FF00";
                        renderData.vertexModel = c.shape.vertices;
                        renderData.position.set(0, 0);
                    } else if (this.collisionMethod === CollisionMethods.AABB) {
                        renderData.color = "#00FF00";
                        renderData.shape = GeometricShape.Polygon;
                        renderData.vertexModel = [
                            new Vector2(c.shape.boundingBox.x, c.shape.boundingBox.y),
                            new Vector2(c.shape.boundingBox.x, c.shape.boundingBox.y1),
                            new Vector2(c.shape.boundingBox.x1, c.shape.boundingBox.y1),
                            new Vector2(c.shape.boundingBox.x1, c.shape.boundingBox.y),
                        ];
                        renderData.position.set(0, 0);
                    }
                } else if (c.shape instanceof Circumference) {
                    renderData.position.copy(c.shape.position);
                    renderData.color = "#00FF00";
                    renderData.shape = GeometricShape.Circumference;
                    renderData.radius = c.shape.radius;
                }

                this.renderManager.addRenderData(renderData);
            });
        });
    }

    public getOrCreateRenderData(colliderId: number): IGeometricRenderData {
        if (!this.renderData.has(colliderId)) {
            this.renderData.set(colliderId, {
                type: RenderDataType.Geometric,
                location: RenderLocation.WorldSpace,
                position: new Vector2(),
                layer: defaultRenderLayer,
                color: undefined,
                shape: undefined,
            });
        }

        return this.renderData.get(colliderId);
    }
}
