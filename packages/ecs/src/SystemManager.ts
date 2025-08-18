import { injectable } from "@angry-pixel/ioc";
import { System, SystemGroup, SystemType } from "./types";
import { SYMBOLS } from "./symbols";

/**
 * The SystemManager is responsible for managing the lifecycle and execution of game systems.\
 * It provides methods for adding, enabling, disabling and retrieving systems that operate on entities and components.\
 * Systems are organized into groups to control their execution order and update frequency.\
 * Acts as the central orchestrator for all game logic and behavior processing.
 * @public
 * @category Entity-Component-System
 */
@injectable(SYMBOLS.SystemManager)
export class SystemManager {
    private systems: [System, SystemGroup, boolean, boolean][] = []; // [system, group, enabled, created]

    /**
     * @param systemType The system class
     * @returns the systen index
     */
    private findSystemIndex(systemType: SystemType): number {
        return this.systems.findIndex((system) => system[0] instanceof systemType);
    }

    /**
     * Adds a new system instance linked to a group
     * @param system The system instance
     * @param group The system group
     * @internal
     */
    public addSystem(system: System, group: SystemGroup): void {
        if (this.systems.some((system) => system[0] instanceof system.constructor)) {
            throw new Error(`SystemManager already has an instance of ${system.constructor.name}.`);
        }

        this.systems.push([system, group, false, false]);
    }

    /**
     * Returns TRUE if it has a system of the given type, otherwise it returns FALSE
     * @param systemType The system class
     * @returns boolean
     * @public
     * @example
     * ```js
     * const hasPlayerSystem = systemManager.hasSystem(PlayerSystem);
     * ```
     */
    public hasSystem(systemType: SystemType): boolean {
        return this.systems.some((system) => system[0] instanceof systemType);
    }

    /**
     * Returns a system instance for the given type
     * @param systemType The system class
     * @returns The system instance
     * @internal
     */
    public getSystem<T extends System>(systemType: SystemType<T>): T {
        const index = this.findSystemIndex(systemType);
        return index !== -1 ? (this.systems[index][0] as T) : undefined;
    }

    /**
     * Returns TRUE wether the given group has systems
     * @param group The system group
     * @returns boolean
     * @internal
     */
    public groupHasSystems(group: SystemGroup): boolean {
        return this.systems.filter((system) => system[1] === group).length > 0;
    }

    /**
     * Enables a system by its type.\
     * The method `onEnabled` of the system will be called. If the system is enabled for the first time, the method `onCreate` will also be called.
     * @param systemType The system class
     * @public
     * @example
     * ```js
     * systemManager.enableSystem(PlayerSystem);
     * ```
     */
    public enableSystem(systemType: SystemType): void {
        const index = this.findSystemIndex(systemType);
        if (index === -1 || this.systems[index][2] === true) return;

        const system = this.systems[index];

        if (system[3] === false) {
            system[3] = true;
            if (system[0].onCreate) system[0].onCreate();
        }

        system[2] = true;
        if (system[0].onEnabled) system[0].onEnabled();
    }

    /**
     * Disables a system by its type.\
     * The method `onDisabled` of the system will be called.
     * @param systemType The system class
     * @public
     * @example
     * ```js
     * systemManager.disableSystem(PlayerSystem);
     * ```
     */
    public disableSystem(systemType: SystemType): void {
        const index = this.findSystemIndex(systemType);
        if (index === -1 || this.systems[index][2] === false) return;

        const system = this.systems[index];

        system[2] = false;
        if (system[0].onDisabled) system[0].onDisabled();
    }

    /**
     * Set the execution priority of a system.
     * @param systemType The system class
     * @param position the priority number
     * @internal
     */
    public setExecutionOrder(systemType: SystemType, position: number): void {
        const index = this.findSystemIndex(systemType);
        if (index === -1) throw new Error(`Cannot set execution order because ${systemType.name} is not a system.`);
        this.systems.splice(position, 0, this.systems.splice(index, 1)[0]);
    }

    /**
     * Removes a system by its type.
     * The method `onDestroy` of the system will be called.
     * @param systemType The system class
     * @internal
     */
    public removeSystem(systemType: SystemType): void {
        const index = this.findSystemIndex(systemType);
        if (index === -1) return;
        const system = this.systems.splice(index, 1)[0][0];
        if (system.onDestroy) system.onDestroy();
    }

    /**
     * Disables all systems
     * @internal
     */
    public disableAllSystems(): void {
        this.systems.forEach((system) => {
            if (system[2]) this.disableSystem(system[0].constructor as SystemType);
        });
    }

    /**
     * Call the method onUpdate for systems belonging to the given group
     * @param group The system group
     * @internal
     */
    public update(group: SystemGroup): void {
        this.systems
            .filter((system) => system[1] === group && system[2] === true)
            .forEach((system) => system[0].onUpdate());
    }
}
