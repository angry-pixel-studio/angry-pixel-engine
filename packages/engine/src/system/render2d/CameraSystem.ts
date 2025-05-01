import { Transform } from "@component/gameLogic/Transform";
import { Camera, debugRenderLayer } from "@component/render2d/Camera";
import { SYSTEM_TYPES } from "@config/systemTypes";
import { DEPENDENCY_TYPES } from "@config/dependencyTypes";
import { EntityManager, System } from "@ecs";
import { inject, injectable } from "@ioc";
import { RenderManager } from "@manager/RenderManager";

@injectable(SYSTEM_TYPES.CameraSystem)
export class CameraSystem implements System {
    constructor(
        @inject(DEPENDENCY_TYPES.EntityManager) private readonly entityManager: EntityManager,
        @inject(DEPENDENCY_TYPES.RenderManager) private readonly renderManager: RenderManager,
    ) {}

    public onUpdate(): void {
        this.entityManager.search(Camera).forEach(({ entity, component: camera }) => {
            const transform = this.entityManager.getComponent(entity, Transform);
            if (!transform) throw new Error("Camera component needs a Transform");

            camera._renderData.position.copy(transform.localPosition);
            camera._renderData.layers = camera.layers;
            camera._renderData.depth = camera.depth;
            camera._renderData.zoom = camera.zoom;

            if (camera.debug) camera._renderData.layers.push(debugRenderLayer);

            this.renderManager.addCameraData(camera._renderData);
        });
    }
}
