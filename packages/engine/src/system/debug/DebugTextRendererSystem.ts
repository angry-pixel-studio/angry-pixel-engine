import { EntityManager, System } from "@angry-pixel/ecs";
import { TextRenderer } from "@component/render2d/TextRenderer";
import { SYSTEM_SYMBOLS } from "@config/systemSymbols";
import { inject, injectable } from "@angry-pixel/ioc";
import { Vector2 } from "@angry-pixel/math";
import { GeometricRenderData, GeometricShape } from "@angry-pixel/webgl";
import { RenderDataType } from "@angry-pixel/webgl";
import { GameConfig } from "@config/bootstrap";
import { RenderManager } from "@manager/RenderManager";
import { SYMBOLS } from "@config/dependencySymbols";
import { Transform } from "@component/gameLogic/Transform";

@injectable(SYSTEM_SYMBOLS.DebugTextRendererSystem)
export class DebugTextRendererSystem implements System {
    constructor(
        @inject(SYMBOLS.EntityManager) private readonly entityManager: EntityManager,
        @inject(SYMBOLS.RenderManager) private readonly renderManager: RenderManager,
        @inject(SYMBOLS.GameConfig) private readonly gameConfig: GameConfig,
    ) {}

    public onUpdate(): void {
        if (!this.gameConfig.debug?.textRendererBoundingBoxes) return;

        this.entityManager
            .search(TextRenderer)
            .forEach(({ entity, component: { width, height, rotation, layer, offset } }) => {
                const transform = this.entityManager.getComponent(entity, Transform);
                if (!transform) return;

                const renderData: GeometricRenderData = {
                    type: RenderDataType.Geometric,
                    shape: GeometricShape.Polygon,
                    position: Vector2.add(new Vector2(), transform.localPosition, offset),
                    layer,
                    color: this.gameConfig.debug.textBoxColor,
                    radius: undefined,
                    rotation: rotation + transform.localRotation,
                    vertexModel: [
                        new Vector2(-width / 2, -height / 2),
                        new Vector2(-width / 2, height / 2),
                        new Vector2(width / 2, height / 2),
                        new Vector2(width / 2, -height / 2),
                    ],
                };

                this.renderManager.addRenderData(renderData);
            });
    }
}
