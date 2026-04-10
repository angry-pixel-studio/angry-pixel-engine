import { Transform } from "@component/gameLogic/Transform";
import { GeometricRenderer } from "@component/render2d/GeometricRenderer";
import { SYSTEM_SYMBOLS } from "@config/systemSymbols";
import { SYMBOLS } from "@config/dependencySymbols";
import { EntityManager, System } from "@angry-pixel/ecs";
import { inject, injectable } from "@angry-pixel/ioc";
import { RenderManager } from "@manager/RenderManager";
import { Vector2 } from "@angry-pixel/math";
import { GeometricRenderData, GeometricShape } from "@angry-pixel/webgl";

@injectable(SYSTEM_SYMBOLS.GeometricRendererSystem)
export class GeometricRendererSystem implements System {
    private readonly scaledOffset: Vector2 = new Vector2();

    constructor(
        @inject(SYMBOLS.EntityManager) private readonly entityManager: EntityManager,
        @inject(SYMBOLS.RenderManager) private readonly renderManager: RenderManager,
    ) {}

    public onUpdate(): void {
        this.entityManager.search(GeometricRenderer).forEach(({ entity, component: geometric }) => {
            const transform = this.entityManager.getComponent(entity, Transform);
            if (!transform) throw new Error("GeometricRenderer component needs a Transform");

            if (!this.isValidGeometry(geometric)) return;

            this.scaledOffset.set(
                geometric.offset.x * transform.localScale.x,
                geometric.offset.y * transform.localScale.y,
            );

            Vector2.add(geometric._renderData.position, transform.localPosition, this.scaledOffset);

            geometric._renderData.layer = geometric.layer;
            geometric._renderData.color = geometric.color;
            geometric._renderData.shape = geometric.shape;
            geometric._renderData.rotation = transform.localRotation + geometric.rotation;

            if (transform.localRotation !== 0 && this.scaledOffset.magnitude > 0) {
                this.translateRenderPosition(geometric._renderData, transform);
            }

            const sx = transform.localScale.x;
            const sy = transform.localScale.y;

            if (geometric.shape === GeometricShape.Circumference) {
                geometric._renderData.radius = geometric.radius * Math.max(Math.abs(sx), Math.abs(sy));
                geometric._renderData.vertexModel.length = 0;
            } else {
                this.ensureVertexModelLength(geometric, geometric.vertexModel.length);
                geometric.vertexModel.forEach((v, i) => geometric._renderData.vertexModel[i].set(v.x * sx, v.y * sy));
            }

            this.renderManager.addRenderData(geometric._renderData);
        });
    }

    private isValidGeometry(geometric: GeometricRenderer): boolean {
        switch (geometric.shape) {
            case GeometricShape.Circumference:
                return geometric.radius > 0;
            case GeometricShape.Polygon:
                return geometric.vertexModel.length >= 3;
            case GeometricShape.Line:
                return geometric.vertexModel.length >= 2 && geometric.vertexModel.length % 2 === 0;
            default:
                return false;
        }
    }

    private ensureVertexModelLength(geometric: GeometricRenderer, length: number): void {
        const vm = geometric._renderData.vertexModel;
        while (vm.length < length) {
            vm.push(new Vector2());
        }
        vm.length = length;
    }

    private translateRenderPosition(renderData: GeometricRenderData, transform: Transform): void {
        const translatedAngle = Math.atan2(this.scaledOffset.y, this.scaledOffset.x) + transform.localRotation;

        renderData.position.set(
            transform.localPosition.x + this.scaledOffset.magnitude * Math.cos(translatedAngle),
            transform.localPosition.y + this.scaledOffset.magnitude * Math.sin(translatedAngle),
        );
    }
}
