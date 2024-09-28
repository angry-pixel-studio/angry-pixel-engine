import { Transform } from "@component/gameLogic/Transform";
import { Camera } from "@component/render2d/Camera";
import { SYSTEMS } from "@config/systems";
import { TYPES } from "@config/types";
import { EntityManager, System } from "@ecs";
import { inject, injectable } from "@ioc";
import { RenderManager } from "@manager/RenderManager";

@injectable(SYSTEMS.CameraSystem)
export class CameraSystem implements System {
    constructor(
        @inject(TYPES.EntityManager) private readonly entityManager: EntityManager,
        @inject(TYPES.RenderManager) private readonly renderManager: RenderManager,
    ) {}

    public onUpdate(): void {
        this.entityManager.search(Camera).forEach(({ entity, component: camera }) => {
            const transform = this.entityManager.getComponent(entity, Transform);
            if (!transform) throw new Error("Camera component needs a Transform");

            camera._renderData.position.copy(transform.localPosition);
            camera._renderData.layers = camera.layers;
            camera._renderData.depth = camera.depth;
            camera._renderData.zoom = camera.zoom;

            this.renderManager.addCameraData(camera._renderData);
        });
    }
}
