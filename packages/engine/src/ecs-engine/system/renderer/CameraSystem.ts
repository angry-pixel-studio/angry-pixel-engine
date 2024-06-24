import { ICameraData, IRenderManager } from "../../../2d-renderer";
import { Vector2 } from "../../../math";
import { Transform } from "../../component/Transform";
import { Camera } from "../../component/Camera";
import { Entity, IEntityManager } from "../../manager/EntityManager";
import { System, SystemGroup } from "../../manager/SystemManager";

export class CameraSystem extends System {
    private readonly cameraData: Map<Entity, ICameraData> = new Map();

    constructor(
        private entityManager: IEntityManager,
        private renderManager: IRenderManager,
    ) {
        super();
        this.group = SystemGroup.Render;
    }

    public onUpdate(): void {
        this.entityManager.search(Camera).forEach(({ entity, component: camera }) => {
            const cameraData = this.getOrCreate(entity);
            const transform = this.entityManager.getComponent(entity, Transform);

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
