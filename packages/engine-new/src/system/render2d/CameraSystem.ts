import { Transform } from "component/gameLogic/Transform";
import { Camera } from "component/render2d/Camera";
import { TYPES } from "config/types";
import { EntityManager, System } from "ecs";
import { inject } from "ioc";
import { RenderManager } from "manager/RenderManager";

export class CameraSystem implements System {
    constructor(
        @inject(TYPES.EntityManager) private readonly entityManager: EntityManager,
        @inject(TYPES.RenderManager) private readonly renderManager: RenderManager,
    ) {}

    public onUpdate(): void {
        this.entityManager.search(Camera).forEach(({ entity, component: camera }) => {
            const transform = this.entityManager.getComponent(entity, Transform);
            if (!transform) throw new Error("Camera component needs a Transform");

            camera._position.copy(transform.localPosition);

            this.renderManager.addCameraData({
                position: camera._position,
                layers: camera.layers,
                depth: camera.zoom,
                zoom: camera.depth,
            });
        });
    }
}
