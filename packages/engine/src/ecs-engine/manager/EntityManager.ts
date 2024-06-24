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

    search<T extends Component>(componentType: ComponentType<T>, includeDisabled?: boolean): SearchResult<T>[];
    searchInChildren<T extends Component>(
        parent: Entity,
        componentType: ComponentType<T>,
        includeDisabled?: boolean,
    ): SearchResult<T>[];
}

export class EntityManager implements IEntityManager {
    private lastEntityId: number = 0;
    private components: Map<string, Map<Entity, Component>> = new Map(); // componentType => entity => component
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
        this.components.forEach((row) => (row.has(entity) ? row.delete(entity) : undefined));
    }

    public removeAllEntities(): void {
        this.components.clear();
        this.lastEntityId = 0;
    }

    public isEntityEnabled(entity: Entity): boolean {
        return !this.disabledEntities.includes(entity);
    }

    public enableEntity(entity: Entity): void {
        if (this.isEntityEnabled(entity)) return;
        this.disabledEntities.splice(this.disabledEntities.indexOf(entity), 1);
    }

    public disableEntity(entity: Entity): void {
        if (this.isEntityEnabled(entity)) this.disabledEntities.push(entity);
    }

    public addComponent<T extends Component>(entity: Entity, componentType: ComponentType<T>): T;
    public addComponent<T extends Component>(entity: Entity, component: T): T;
    public addComponent<T extends Component>(entity: Entity, component: ComponentType<T> | T): T {
        const name = typeof component === "object" ? component.constructor.name : component.name;
        component = typeof component === "object" ? component : new component();

        if (!this.components.has(name)) this.components.set(name, new Map());

        if (this.components.get(name).has(entity)) {
            throw new Error(`Entity ${entity} already has a component of type ${name}`);
        }

        this.components.get(name).set(entity, component);

        return component as T;
    }

    public getComponent<T extends Component>(entity: Entity, { name }: ComponentType<T>): T {
        return this.components.get(name)?.get(entity) as T;
    }

    public removeComponent(entity: Entity, componentType: ComponentType): void;
    public removeComponent(entity: Entity, component: Component): void;
    public removeComponent(entity: Entity, component: ComponentType | Component): void {
        const name = typeof component === "object" ? component.constructor.name : component.name;

        if (
            this.components.has(name) &&
            this.components.get(name).has(entity) &&
            (typeof component !== "object" || this.components.get(name).get(entity) === component)
        ) {
            this.components.get(name).delete(entity);
        }
    }

    public search<T extends Component>(
        { name }: ComponentType<T>,
        includeDisabled: boolean = false,
    ): SearchResult<T>[] {
        const result: SearchResult<T>[] = [];

        if (this.components.has(name)) {
            this.components.get(name).forEach((component, entity) => {
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

        this.components.get(Transform.name).forEach((transform, entity) => {
            if ((includeDisabled || this.isEntityEnabled(entity)) && transform.parent === parentTransform) {
                const component = this.getComponent(entity, componentType);
                if (component) result.push({ entity, component });
            }
        });

        return result;
    }
}
