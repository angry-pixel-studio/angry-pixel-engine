import { System, SystemManager, SystemType } from "@ecs";
import { Container } from "@ioc";
import { getSystemGroup } from "./SystemGroup";

export class SystemFactory {
    private lastSystemTypeId: number = 0;

    constructor(
        private readonly container: Container,
        private readonly systemManager: SystemManager,
    ) {}

    public createSystemIfNotExists(systemType: SystemType): void {
        if (this.systemManager.hasSystem(systemType)) return;

        const name = `__system_${this.lastSystemTypeId++}`;

        this.container.add(systemType, name);
        this.systemManager.addSystem(this.container.get<System>(name), getSystemGroup(systemType));
    }
}
