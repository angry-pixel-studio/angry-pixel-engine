import { ICameraData, IRenderManager } from "../../../2d-renderer";
import { Vector2 } from "../../../math";
import { Transform } from "../../component/Transform";
import { Camera } from "../../component/Camera";
import { System } from "../../../ecs/SystemManager";
import { Entity, EntityManager } from "../../../ecs/EntityManager";
import { TYPES } from "../../config/types";
import { inject } from "../../../ioc/container";

export class CameraSystem implements System {
    private readonly cameraData: Map<Entity, ICameraData> = new Map();

    constructor(
        @inject(TYPES.EntityManager) private readonly entityManager: EntityManager,
        @inject(TYPES.RenderManager) private readonly renderManager: IRenderManager,
    ) {}

    public onUpdate(): void {
        this.entityManager.search(Camera).forEach(({ entity, component: camera }) => {
            const transform = this.entityManager.getComponent(entity, Transform);
            if (!transform) throw new Error("Camera component needs a Transform");

            const cameraData = this.getOrCreate(entity);

            cameraData.position.copy(transform.localPosition);
            cameraData.layers = camera.layers;
            cameraData.zoom = camera.zoom;
            cameraData.depth = camera.depth;

            this.renderManager.addCameraData(cameraData);
        });
    }

    private getOrCreate(entity: Entity): ICameraData {
        if (!this.cameraData.has(entity)) {
            this.cameraData.set(entity, {
                position: new Vector2(),
                layers: [],
                depth: 0,
                zoom: 1,
            });
        }

        return this.cameraData.get(entity);
    }
}
