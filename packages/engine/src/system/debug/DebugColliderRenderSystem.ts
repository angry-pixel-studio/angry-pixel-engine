import { BallCollider } from "@component/physics2d/BallCollider";
import { BoxCollider } from "@component/physics2d/BoxCollider";
import { EdgeCollider } from "@component/physics2d/EdgeCollider";
import { PolygonCollider } from "@component/physics2d/PolygonCollider";
import { TilemapCollider } from "@component/physics2d/TilemapCollider";
import { debugRenderLayer } from "@component/render2d/Camera";
import { GameConfig } from "@config/bootstrap";
import { SYSTEM_SYMBOLS } from "@config/systemSymbols";
import { SYMBOLS } from "@config/dependencySymbols";
import { EntityManager, System } from "@angry-pixel/ecs";
import { inject, injectable } from "@angry-pixel/ioc";
import { RenderManager } from "@manager/RenderManager";
import { Vector2 } from "@angry-pixel/math";
import { Circumference, Collider, CollisionMethods, Polygon } from "@angry-pixel/collisions";
import { GeometricRenderData, GeometricShape, RenderDataType } from "@angry-pixel/webgl";

@injectable(SYSTEM_SYMBOLS.DebugColliderRenderSystem)
export class DebugColliderRenderSystem implements System {
    constructor(
        @inject(SYMBOLS.EntityManager) private readonly entityManager: EntityManager,
        @inject(SYMBOLS.RenderManager) private readonly renderManager: RenderManager,
        @inject(SYMBOLS.GameConfig) private readonly gameConfig: GameConfig,
    ) {}

    public onUpdate(): void {
        if (!this.gameConfig.debug?.colliders) return;

        [BallCollider, BoxCollider, PolygonCollider, EdgeCollider, TilemapCollider].forEach((type) =>
            this.entityManager.search<Collider>(type).forEach(({ component: collider }) =>
                collider.shapes.forEach((shape) => {
                    const renderData: GeometricRenderData = {
                        type: RenderDataType.Geometric,
                        position: new Vector2(),
                        layer: debugRenderLayer,
                        color: this.gameConfig.debug.collidersColor,
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
