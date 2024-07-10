import { Transform } from "../component/Transform";

export type Entity = number;

export type Component = { [key: string]: any };

export type ComponentType<T extends Component = Component> = { new (): T };

export type SearchResult<T extends Component> = { entity: Entity; component: T };

export interface IEntityManager {
    createEntity(): Entity;
    createEntity(componentTypes: ComponentType[]): Entity;
    createEntity(components: Component[]): Entity;
    removeEntity(entity: Entity): void;
    removeAllEntities(): void;

    isEntityEnabled(entity: Entity): boolean;
    enableEntity(entity: Entity): void;
    disableEntity(entity: Entity): void;

    addComponent<T extends Component>(entity: Entity, componentType: ComponentType<T>): T;
    addComponent<T extends Component>(entity: Entity, component: T): T;
    getComponent<T extends Component>(entity: Entity, componentType: ComponentType<T>): T;
    removeComponent(entity: Entity, componentType: ComponentType): void;
    removeComponent(entity: Entity, component: Component): void;
    hasComponent(entity: Entity, componentType: ComponentType): boolean;

    search<T extends Component>(componentType: ComponentType<T>, includeDisabled?: boolean): SearchResult<T>[];
    searchInChildren<T extends Component>(
        parent: Entity,
        componentType: ComponentType<T>,
        includeDisabled?: boolean,
    ): SearchResult<T>[];
}

export class EntityManager implements IEntityManager {
    private lastEntityId: number = 0;
    private lastComponentTypeId: number = 0;
    private components: Map<number, Map<Entity, Component>> = new Map(); // componentTypeId => entity => component
    private disabledEntities: Entity[] = [];

    public createEntity(): Entity;
    public createEntity(componentTypes: ComponentType[]): Entity;
    public createEntity(components: Component[]): Entity;
    public createEntity(components?: ComponentType[] | Component[]): Entity {
        this.lastEntityId++;
        if (components) components.forEach((component) => this.addComponent(this.lastEntityId, component));
        return this.lastEntityId;
    }

    public removeEntity(entity: Entity): void {
        this.removeChildren(entity);

        this.components.forEach((row) => {
            if (row.has(entity)) row.delete(entity);
        });
    }

    public removeAllEntities(): void {
        this.components.clear();
        this.lastEntityId = 0;
    }

    private removeChildren(parent: Entity): void {
        const parentTransform = this.getComponent(parent, Transform);

        this.components.get(this.getComponentTypeId(Transform)).forEach((transform, entity) => {
            if (transform.parent === parentTransform) this.removeEntity(entity);
        });
    }

    public isEntityEnabled(entity: Entity): boolean {
        return !this.disabledEntities.includes(entity);
    }

    public enableEntity(entity: Entity): void {
        if (this.isEntityEnabled(entity)) return;
        this.disabledEntities.splice(this.disabledEntities.indexOf(entity), 1);
        this.enableChildren(entity);
    }

    private enableChildren(parent: Entity): void {
        const parentTransform = this.getComponent(parent, Transform);

        this.components.get(this.getComponentTypeId(Transform)).forEach((transform, entity) => {
            if (transform.parent === parentTransform) this.enableEntity(entity);
        });
    }

    public disableEntity(entity: Entity): void {
        if (this.isEntityEnabled(entity)) this.disabledEntities.push(entity);
        this.disableChildren(entity);
    }

    private disableChildren(parent: Entity): void {
        const parentTransform = this.getComponent(parent, Transform);

        this.components.get(this.getComponentTypeId(Transform)).forEach((transform, entity) => {
            if (transform.parent === parentTransform) this.disableEntity(entity);
        });
    }

    private getOrCreateComponentTypeId<T extends Component>(component: ComponentType<T> | T): number {
        const prototype = (typeof component === "object" ? component.constructor : component).prototype;
        if (!prototype.__APComponentTypeId__) prototype.__APComponentTypeId__ = ++this.lastComponentTypeId;

        return prototype.__APComponentTypeId__;
    }

    private getComponentTypeId<T extends Component>(component: ComponentType<T> | T): number {
        return (typeof component === "object" ? component.constructor : component).prototype.__APComponentTypeId__;
    }

    public addComponent<T extends Component>(entity: Entity, componentType: ComponentType<T>): T;
    public addComponent<T extends Component>(entity: Entity, component: T): T;
    public addComponent<T extends Component>(entity: Entity, component: ComponentType<T> | T): T {
        const cType = this.getOrCreateComponentTypeId(component);
        const instance = typeof component === "object" ? component : new component();

        if (!this.components.has(cType)) this.components.set(cType, new Map());

        if (this.components.get(cType).has(entity)) {
            throw new Error(`Entity ${entity} already has a component of type ${cType}`);
        }

        this.components.get(cType).set(entity, instance);

        return instance as T;
    }

    public getComponent<T extends Component>(entity: Entity, componentType: ComponentType<T>): T {
        const cType = this.getComponentTypeId(componentType);
        return this.components.get(cType)?.get(entity) as T;
    }

    public removeComponent(entity: Entity, componentType: ComponentType): void;
    public removeComponent(entity: Entity, component: Component): void;
    public removeComponent(entity: Entity, component: ComponentType | Component): void {
        const cType = this.getComponentTypeId(component);

        if (
            this.components.has(cType) &&
            this.components.get(cType).has(entity) &&
            (typeof component !== "object" || this.components.get(cType).get(entity) === component)
        ) {
            this.components.get(cType).delete(entity);
        }
    }

    public hasComponent(entity: Entity, componentType: ComponentType): boolean {
        return this.getComponent(entity, componentType) !== undefined;
    }

    public search<T extends Component>(
        componentType: ComponentType<T>,
        includeDisabled: boolean = false,
    ): SearchResult<T>[] {
        const result: SearchResult<T>[] = [];
        const cType = this.getComponentTypeId(componentType);

        if (this.components.has(cType)) {
            this.components.get(cType).forEach((component, entity) => {
                if (includeDisabled || this.isEntityEnabled(entity)) result.push({ entity, component: component as T });
            });
        }

        return result;
    }

    public searchInChildren<T extends Component>(
        parent: Entity,
        componentType: ComponentType<T>,
        includeDisabled: boolean = false,
    ): SearchResult<T>[] {
        const result: SearchResult<T>[] = [];
        const parentTransform = this.getComponent(parent, Transform);

        this.components.get(this.getComponentTypeId(Transform)).forEach((transform, entity) => {
            if ((includeDisabled || this.isEntityEnabled(entity)) && transform.parent === parentTransform) {
                const component = this.getComponent(entity, componentType);
                if (component) result.push({ entity, component });
            }
        });

        return result;
    }
}
