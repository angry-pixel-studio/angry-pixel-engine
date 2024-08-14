export interface System {
    onCreate(): void;
    onDestroy(): void;
    onDisable(): void;
    onEnable(): void;
    onUpdate(): void;
}

export type SystemType<T extends System = System> = { new (...args: any[]): T };
export type SystemGroup = string | number | symbol;

export class SystemManager {
    private systems: [System, SystemGroup, boolean, boolean][] = []; // [system, group, enabled, created]

    private findSystemIndex(systemType: SystemType): number {
        return this.systems.findIndex((system) => system[0] instanceof systemType);
    }

    public addSystem(system: System, group: SystemGroup): void {
        if (this.systems.some((system) => system[0] instanceof system.constructor)) {
            throw new Error(`SystemManager already has an instance of ${system.constructor.name}.`);
        }

        this.systems.push([system, group, false, false]);
    }

    public hasSystem(systemType: SystemType): boolean {
        return this.systems.some((system) => system[0] instanceof systemType);
    }

    public getSystem<T extends System>(systemType: SystemType<T>): T {
        const index = this.findSystemIndex(systemType);
        return index !== -1 ? (this.systems[index][0] as T) : undefined;
    }

    public enableSystem(systemType: SystemType): void {
        const index = this.findSystemIndex(systemType);
        if (index === -1 || this.systems[index][2] === true) return;

        const system = this.systems[index];

        if (system[3] === false) {
            system[3] = true;
            system[0].onCreate();
        }

        system[2] = true;
        system[0].onEnable();
    }

    public disableSystem(systemType: SystemType): void {
        const index = this.findSystemIndex(systemType);
        if (index === -1 || this.systems[index][2] === false) return;

        const system = this.systems[index];

        system[2] = false;
        system[0].onDisable();
    }

    public setExecutionOrder(systemType: SystemType, position: number): void {
        const index = this.findSystemIndex(systemType);
        if (index === -1) throw new Error(`Cannot set execution order because ${systemType.name} is not a system.`);
        this.systems.splice(position, 0, this.systems.splice(index, 1)[0]);
    }

    public removeSystem(systemType: SystemType): void {
        const index = this.findSystemIndex(systemType);
        if (index === -1) return;
        this.systems.splice(index, 1)[0][0].onDestroy();
    }

    public update(group: SystemGroup): void {
        this.systems
            .filter((system) => system[1] === group && system[2] === true)
            .forEach((system) => system[0].onUpdate());
    }
}
