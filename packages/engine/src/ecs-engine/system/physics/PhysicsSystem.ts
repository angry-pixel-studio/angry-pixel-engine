import { IPhysicsManager } from "../../../2d-physics";
import { System, SystemGroup } from "../../manager/SystemManager";
import { ITimeManager } from "../../manager/TimeManager";

export class PhysicsSystem extends System {
    constructor(
        private readonly physicsManager: IPhysicsManager,
        private readonly timeManager: ITimeManager,
    ) {
        super();
        this.group = SystemGroup.Physics;
    }

    public onUpdate(): void {
        this.physicsManager.update(this.timeManager.physicsDeltaTime);
    }
}
