import { Transform } from "@component/gameLogic/Transform";
import { MaskRenderer } from "@component/render2d/MaskRenderer";
import { SYSTEM_SYMBOLS } from "@config/systemSymbols";
import { SYMBOLS } from "@config/dependencySymbols";
import { EntityManager, System } from "@angry-pixel/ecs";
import { inject, injectable } from "@angry-pixel/ioc";
import { RenderManager } from "@manager/RenderManager";
import { Vector2 } from "@angry-pixel/math";
import { MaskRenderData, MaskShape } from "@angry-pixel/webgl";

@injectable(SYSTEM_SYMBOLS.MaskRendererSystem)
export class MaskRendererSystem implements System {
    // auxiliar
    private scaledOffset: Vector2 = new Vector2();

    constructor(
        @inject(SYMBOLS.EntityManager) private readonly entityManager: EntityManager,
        @inject(SYMBOLS.RenderManager) private readonly renderManager: RenderManager,
    ) {}

    public onUpdate(): void {
        this.entityManager.search(MaskRenderer).forEach(({ entity, component: maskRenderer }) => {
            const transform = this.entityManager.getComponent(entity, Transform);
            if (!transform) throw new Error("MaskRenderer component needs a Transform");

            this.scaledOffset.set(
                maskRenderer.offset.x * transform.localScale.x,
                maskRenderer.offset.y * transform.localScale.y,
            );

            Vector2.add(maskRenderer._renderData.position, transform.localPosition, this.scaledOffset);
            maskRenderer._renderData.width = maskRenderer.width * Math.abs(transform.localScale.x);
            maskRenderer._renderData.height = maskRenderer.height * Math.abs(transform.localScale.y);
            maskRenderer._renderData.rotation = transform.localRotation + maskRenderer.rotation;
            maskRenderer._renderData.color = maskRenderer.color;
            maskRenderer._renderData.layer = maskRenderer.layer;
            maskRenderer._renderData.opacity = maskRenderer.opacity;
            maskRenderer._renderData.radius =
                maskRenderer.radius * Math.max(Math.abs(transform.localScale.x), Math.abs(transform.localScale.y));
            maskRenderer._renderData.shape = maskRenderer.shape;

            if (maskRenderer.shape === MaskShape.Polygon) {
                if (maskRenderer._renderData.vertices.length !== maskRenderer.vertexModel.length) {
                    maskRenderer._renderData.vertices = maskRenderer.vertexModel.map(() => new Vector2());
                }

                // scale vertices
                maskRenderer.vertexModel.forEach((v, i) =>
                    maskRenderer._renderData.vertices[i].set(
                        v.x * transform.localScale.x,
                        v.y * transform.localScale.y,
                    ),
                );

                // translate vertices
                if (transform.localRotation !== 0) {
                    maskRenderer._renderData.vertices.forEach((vertex) =>
                        vertex.set(
                            vertex.x * Math.cos(transform.localRotation) - vertex.y * Math.sin(transform.localRotation),
                            vertex.x * Math.sin(transform.localRotation) + vertex.y * Math.cos(transform.localRotation),
                        ),
                    );
                }
            }

            if (transform.localRotation !== 0 && this.scaledOffset.magnitude > 0) {
                this.translateRenderPosition(maskRenderer._renderData, transform);
            }

            this.renderManager.addRenderData(maskRenderer._renderData);
        });
    }

    private translateRenderPosition(renderData: MaskRenderData, transform: Transform): void {
        const translatedAngle = Math.atan2(this.scaledOffset.y, this.scaledOffset.x) + transform.localRotation;

        renderData.position.set(
            transform.localPosition.x + this.scaledOffset.magnitude * Math.cos(translatedAngle),
            transform.localPosition.y + this.scaledOffset.magnitude * Math.sin(translatedAngle),
        );
    }
}
