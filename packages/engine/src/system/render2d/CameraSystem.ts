import { Transform } from "@component/gameLogic/Transform";
import { Camera, debugRenderLayer } from "@component/render2d/Camera";
import { SYSTEM_SYMBOLS } from "@config/systemSymbols";
import { SYMBOLS } from "@config/dependencySymbols";
import { EntityManager, System } from "@angry-pixel/ecs";
import { inject, injectable } from "@angry-pixel/ioc";
import { RenderManager } from "@manager/RenderManager";

@injectable(SYSTEM_SYMBOLS.CameraSystem)
export class CameraSystem implements System {
    constructor(
        @inject(SYMBOLS.EntityManager) private readonly entityManager: EntityManager,
        @inject(SYMBOLS.RenderManager) private readonly renderManager: RenderManager,
    ) {}

    public onUpdate(): void {
        this.entityManager.search(Camera).forEach(({ entity, component: camera }) => {
            const transform = this.entityManager.getComponent(entity, Transform);
            if (!transform) throw new Error("Camera component needs a Transform");

            camera._renderData.position.copy(transform.localPosition);
            camera._renderData.layers = [...camera.layers];
            camera._renderData.depth = camera.depth;
            camera._renderData.zoom = camera.zoom;

            if (camera.debug) camera._renderData.layers.push(debugRenderLayer);

            this.renderManager.addCameraData(camera._renderData);
        });
    }
}
