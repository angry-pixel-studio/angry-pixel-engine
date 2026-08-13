import { EntityManager, System } from "@angry-pixel/ecs";
import { Button, ButtonShape } from "@component/gameLogic/Button";
import { SYSTEM_SYMBOLS } from "@config/systemSymbols";
import { inject, injectable } from "@angry-pixel/ioc";
import { Vector2 } from "@angry-pixel/math";
import { GeometricRenderData, GeometricShape, RenderDataType } from "@angry-pixel/webgl";
import { GameConfig } from "@config/bootstrap";
import { RenderManager } from "@manager/RenderManager";
import { SYMBOLS } from "@config/dependencySymbols";
import { Transform } from "@component/gameLogic/Transform";
import { debugRenderLayer } from "@component/render2d/Camera";

@injectable(SYSTEM_SYMBOLS.DebugButtonSystem)
export class DebugButtonSystem implements System {
    constructor(
        @inject(SYMBOLS.EntityManager) private readonly entityManager: EntityManager,
        @inject(SYMBOLS.RenderManager) private readonly renderManager: RenderManager,
        @inject(SYMBOLS.GameConfig) private readonly gameConfig: GameConfig,
    ) {}

    public onUpdate(): void {
        if (!this.gameConfig.debug?.buttons) return;

        this.entityManager.search(Button, ({ shape, width, height, radius, offset }, entity) => {
            const transform = this.entityManager.getComponent(entity, Transform);
            if (!transform) return;

            const { localPosition, localScale } = transform;

            const renderData: GeometricRenderData = {
                type: RenderDataType.Geometric,
                shape: undefined,
                position: new Vector2(
                    localPosition.x + offset.x * localScale.x,
                    localPosition.y + offset.y * localScale.y,
                ),
                layer: debugRenderLayer,
                color: this.gameConfig.debug.buttonColor,
                radius: undefined,
                rotation: undefined,
                vertexModel: undefined,
            };

            if (shape === ButtonShape.Rectangle) {
                const scaledWidth = width * localScale.x;
                const scaledHeight = height * localScale.y;

                renderData.shape = GeometricShape.Polygon;
                renderData.vertexModel = [
                    new Vector2(-scaledWidth / 2, -scaledHeight / 2),
                    new Vector2(-scaledWidth / 2, scaledHeight / 2),
                    new Vector2(scaledWidth / 2, scaledHeight / 2),
                    new Vector2(scaledWidth / 2, -scaledHeight / 2),
                ];
            } else if (shape === ButtonShape.Circumference) {
                renderData.shape = GeometricShape.Circumference;
                renderData.radius = radius * Math.max(Math.abs(localScale.x), Math.abs(localScale.y));
            }

            this.renderManager.addRenderData(renderData);
        });
    }
}
