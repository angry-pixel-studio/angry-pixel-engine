import { BallCollider } from "@component/physics2d/BallCollider";
import { BoxCollider } from "@component/physics2d/BoxCollider";
import { EdgeCollider } from "@component/physics2d/EdgeCollider";
import { PolygonCollider } from "@component/physics2d/PolygonCollider";
import { TilemapCollider } from "@component/physics2d/TilemapCollider";
import { debugRenderLayer } from "@component/render2d/Camera";
import { GameConfig } from "@config/bootstrap";
import { SYSTEMS } from "@config/systemTypes";
import { TYPES } from "@config/types";
import { EntityManager, System } from "@ecs";
import { inject, injectable } from "@ioc";
import { RenderManager } from "@manager/RenderManager";
import { Vector2 } from "@math";
import { Circumference, Collider, CollisionMethods, Polygon } from "@collisions2d";
import { GeometricRenderData, GeometricShape, RenderDataType } from "@webgl";

@injectable(SYSTEMS.DebugColliderRenderSystem)
export class DebugColliderRenderSystem implements System {
    constructor(
        @inject(TYPES.EntityManager) private readonly entityManager: EntityManager,
        @inject(TYPES.RenderManager) private readonly renderManager: RenderManager,
        @inject(TYPES.GameConfig) private readonly gameConfig: GameConfig,
    ) {}

    public onUpdate(): void {
        if (!this.gameConfig.debugEnabled) return;

        [BallCollider, BoxCollider, PolygonCollider, EdgeCollider, TilemapCollider].forEach((type) =>
            this.entityManager.search<Collider>(type).forEach(({ component: collider }) =>
                collider.shapes.forEach((shape) => {
                    const renderData: GeometricRenderData = {
                        type: RenderDataType.Geometric,
                        position: new Vector2(),
                        layer: debugRenderLayer,
                        color: this.gameConfig.debugColor,
                        shape: undefined,
                        radius: undefined,
                        rotation: undefined,
                        vertexModel: undefined,
                    };

                    if (shape instanceof Polygon) {
                        if (this.gameConfig.collisions.collisionMethod === CollisionMethods.SAT) {
                            renderData.shape = shape.vertices.length > 2 ? GeometricShape.Polygon : GeometricShape.Line;
                            renderData.vertexModel = shape.vertices;
                        } else if (this.gameConfig.collisions.collisionMethod === CollisionMethods.AABB) {
                            renderData.shape = GeometricShape.Polygon;
                            renderData.vertexModel = [
                                new Vector2(shape.boundingBox.x, shape.boundingBox.y),
                                new Vector2(shape.boundingBox.x, shape.boundingBox.y1),
                                new Vector2(shape.boundingBox.x1, shape.boundingBox.y1),
                                new Vector2(shape.boundingBox.x1, shape.boundingBox.y),
                            ];
                        }
                    } else if (shape instanceof Circumference) {
                        renderData.shape = GeometricShape.Circumference;
                        renderData.position.copy(shape.position);
                        renderData.radius = shape.radius;
                    }

                    this.renderManager.addRenderData(renderData);
                }),
            ),
        );
    }
}
