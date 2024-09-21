import { IPhysicsManager } from "../../../2d-physics";
import { System } from "../../../ecs/SystemManager";
import { inject } from "../../../ioc/container";
import { TYPES } from "../../config/types";
import { ITimeManager } from "../../manager/TimeManager";

export class PhysicsSystem implements System {
    constructor(
        @inject(TYPES.PhysicsManager) private readonly physicsManager: IPhysicsManager,
        @inject(TYPES.TimeManager) private readonly timeManager: ITimeManager,
    ) {}

    public onUpdate(): void {
        this.physicsManager.update(this.timeManager.physicsDeltaTime);
    }
}
