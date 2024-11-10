import { TYPES } from "@config/types";
import { injectable } from "@ioc";

/**
 * This type an unique identifier of an Entity
 * @public
 * @category Core
 */
export type Entity = number;
/**
 * This type represents an instance of a component
 * @public
 * @category Core
 */
export type Component = { [key: string]: any };
/**
 * This type represents a component class
 * @public
 * @category Core
 */
export type ComponentType<T extends Component = Component> = { new (...args: any[]): T };
/**
 * This type represents a search result object
 * @public
 * @category Core
 */
export type SearchResult<T extends Component> = { entity: Entity; component: T };
/**
 * This type represents a search criteria object
 * @public
 * @category Core
 */
export type SearchCriteria = { [key: string]: any };

/**
 * The EntityManager manages the entities and components.\
 * It provides the necessary methods for reading and writing entities and components.
 * @public
 * @category Core
 */
@injectable(TYPES.EntityManager)
export class EntityManager {
    private lastEntityId: number = 0;
    private lastComponentTypeId: number = 0;
    private entities: Set<Entity> = new Set();
    private components: Map<number, Map<Entity, Component>> = new Map(); // componen type id -> entity id -> component
    private disabledEntities: Set<Entity> = new Set();
    private disabledComponents: Map<Entity, Set<number>> = new Map(); // entity -> set of componen type id

    /**
     * Creates an entity without component
     * @return The created Entity
     * @public
     * @example
     * ```js
     * const entity = entityManager.createEntity();
     * ```
     */
    public createEntity(): Entity;
    /**
     * Creates an Entity based on a collection of Component instances and ComponentTypes
     * @param components A collection of component instances and component classes
     * @return The created Entity
     * @public
     * @example
     * ```js
     * const entity = entityManager.createEntity([
     *   new Transform({position: new Vector2(100, 100)}),
     *   SpriteRenderer
     * ]);
     * ```
     */
    public createEntity(components: Array<ComponentType | Component>): Entity;
    public createEntity(components?: Array<ComponentType | Component>): Entity {
        this.lastEntityId++;
        this.entities.add(this.lastEntityId);
        if (components) components.forEach((component) => this.addComponent(this.lastEntityId, component));
        return this.lastEntityId;
    }

    /**
     * Creates multiple entities based on an array of component collections
     * @param componentsList An array of collections of component instances and component classes
     * @return An array with the created entities, in the same order of the collections of components
     * @public
     * @example
     * ```js
     * const parent =  [
     *   new Transform({position: new Vector2(100, 100)}),
     *   SpriteRenderer
     * ];
     *
     * const child =  [
     *   new Transform({parent: parent[0]}),
     *   SpriteRenderer
     * ];
     *
     * const entity = entityManager.createEntities([parent, child]);
     * ```
     */
    public createEntities(componentsList: Component[][]): Entity[] {
        const entities: Entity[] = [];

        componentsList.forEach((components) => entities.push(this.createEntity(components)));

        return entities;
    }

    /**
     * Removes an Entity and all its Components
     * @param entity The entity to remove
     * @public
     * @example
     * ```js
     * entityManager.removeEntity(entity);
     * ```
     */
    public removeEntity(entity: Entity): void {
        this.components.forEach((row) => {
            if (row.has(entity)) row.delete(entity);
        });
        this.disabledComponents.delete(entity);
        this.disabledEntities.delete(entity);
        this.entities.delete(entity);
    }

    /**
     * Removes all Entities and all their Components
     * @public
     * @example
     * ```js
     * entityManager.removeAllEntities();
     * ```
     */
    public removeAllEntities(): void {
        this.components.clear();
        this.disabledComponents.clear();
        this.disabledEntities.clear();
        this.lastEntityId = 0;
        this.entities.clear();
    }

    /**
     * If the Entity exists, returns TRUE, otherwise it returns FALSE
     * @param entity
     * @returns boolean
     * @example
     * ```js
     * const isEntity = entityManager.isEntity(entity);
     * ```
     */
    public isEntity(entity: Entity): boolean {
        return this.entities.has(entity);
    }

    /**
     * If the Entity is enabled, returns TRUE, otherwise it returns FALSE
     * @param entity The entity to verify
     * @returns boolean
     * @public
     * @example
     * ```js
     * const entityEnabled = entityManager.isEntityEnabled(entity);
     * ```
     */
    public isEntityEnabled(entity: Entity): boolean {
        return this.isEntity(entity) && !this.disabledEntities.has(entity);
    }

    /**
     * Enables an Entity
     * @param entity The entity to be enabled
     * @public
     * @example
     * ```js
     * entityManager.enableEntity(entity);
     * ```
     */
    public enableEntity(entity: Entity): void {
        if (this.isEntity(entity)) this.disabledEntities.delete(entity);
    }

    /**
     * Disables an Entity
     * @param entity The entity to be disabled
     * @public
     * @example
     * ```js
     * entityManager.disableEntity(entity);
     * ```
     */
    public disableEntity(entity: Entity): void {
        if (this.isEntity(entity)) this.disabledEntities.add(entity);
    }

    /**
     * Disable all Entities that have a component of the given type
     * @param componentType The class of the component
     * @public
     * @example
     * ```js
     * entityManager.disableEntitiesByComponent(SpriteRenderer);
     * ```
     */
    public disableEntitiesByComponent(componentType: ComponentType): void {
        for (const entity of this.components.get(this.getComponentTypeId(componentType))?.keys() ?? []) {
            this.disableEntity(entity);
        }
    }

    /**
     * Enable all Entities that have a component of the given type
     * @param componentType The class of the component
     * @public
     * @example
     * ```js
     * entityManager.enableEntitiesByComponent(SpriteRenderer);
     * ```
     */
    public enableEntitiesByComponent(componentType: ComponentType): void {
        for (const entity of this.components.get(this.getComponentTypeId(componentType))?.keys() ?? []) {
            this.enableEntity(entity);
        }
    }

    /**
     * Adds a component to the entity
     * @param entity The Entity to which the component will be added
     * @param componentType The class of the component
     * @returns The instance of the component
     * @public
     * @example
     * ```js
     * const spriteRenderer = entityManager.addComponent(entity, SpriteRenderer);
     * ```
     */
    public addComponent<T extends Component>(entity: Entity, componentType: ComponentType<T>): T;
    /**
     * Adds an instance of a component to an entity
     * @param entity The Entity to which the component will be added
     * @param component The instance of the component
     * @returns The instance of the component
     * @public
     * @example
     * ```js
     * const spriteRenderer = new SpriteRenderer();
     * entityManager.addComponent(entity, spriteRenderer);
     * ```
     */
    public addComponent<T extends Component>(entity: Entity, component: T): T;
    public addComponent<T extends Component>(entity: Entity, component: ComponentType<T> | T): T {
        const id = this.getComponentTypeId(component);
        const instance = typeof component === "object" ? component : new component();

        if (!this.components.has(id)) this.components.set(id, new Map());

        if (this.components.get(id).has(entity)) {
            throw new Error(`Entity ${entity} already has a component of type ${id}`);
        }

        this.components.get(id).set(entity, instance);

        return instance as T;
    }

    /**
     * Returns TRUE if the Entity has a component of the given type, otherwise it returns FALSE.
     * @param entity The entity to verify
     * @param componentType The class of the component
     * @returns boolean
     * @public
     * @example
     * ```js
     * const hasSpriteRenderer = entityManager.hasComponent(entity, SpriteRenderer);
     * ```
     */
    public hasComponent(entity: Entity, componentType: ComponentType): boolean {
        return this.getComponent(entity, componentType) !== undefined;
    }

    /**
     * Returns the component of the given type belonging to the entity
     * @param entity The entity
     * @param componentType The class of the component
     * @returns The instance of the component
     * @public
     * @example
     * ```js
     * const spriteRenderer = entityManager.getComponent(entity, SpriteRenderer);
     * ```
     */
    public getComponent<T extends Component>(entity: Entity, componentType: ComponentType<T>): T {
        return this.components.get(this.getComponentTypeId(componentType))?.get(entity) as T;
    }

    /**
     * Returns all the component belonging to the entity
     * @param entity The entity
     * @returns A collection of component instances
     * @public
     * @example
     * ```js
     * const components = entityManager.getComponents(entity);
     * ```
     */
    public getComponents(entity: Entity): Component[] {
        const components: Component[] = [];

        this.components.forEach((entityComponent) =>
            entityComponent.forEach((c, e) => {
                if (entity === e) components.push(c);
            }),
        );

        return components;
    }

    /**
     * Searches for and returns an entity for the component instance
     * @param component The component instance
     * @returns The found Entity
     * @public
     * @example
     * ```js
     * const entity = entityManager.getEntityForComponent(spriteRenderer);
     * ```
     */
    public getEntityForComponent(component: Component): Entity {
        const id = this.getComponentTypeId(component);
        if (this.components.has(id)) {
            for (const [e, c] of this.components.get(id)) {
                if (c === component) return e;
            }
        }
        return undefined;
    }

    /**
     * Removes the component instance from its Entity
     * @param component The component instance
     * @public
     * @example
     * ```js
     * entityManager.removeComponent(spriteRenderer)
     * ```
     */
    public removeComponent(component: Component): void;
    /**
     * Removes a component from the entity according to the given type
     * @param entity The target entity
     * @param componentType The component class
     * @public
     * @example
     * ```js
     * entityManager.removeComponent(entity, SriteRenderer)
     * ```
     */
    public removeComponent(entity: Entity, componentType: ComponentType): void;
    public removeComponent(arg1: Entity | Component, arg2?: ComponentType): void {
        const id = this.getComponentTypeId(typeof arg1 === "object" ? arg1 : arg2);
        const entity = typeof arg1 === "number" ? arg1 : this.getEntityForComponent(arg1);

        if (entity !== undefined && this.components.get(id)?.has(entity)) this.components.get(id).delete(entity);
    }

    /**
     * Returns TRUE if the component is enabled, otherwise it returns FALSE
     * @param component The component instance
     * @returns boolean
     * @public
     * @example
     * ```js
     * entityManager.isComponentEnabled(spriteRenderer)
     * ```
     */
    public isComponentEnabled(component: Component): boolean;
    /**
     * Returns TRUE if the component is enabled, otherwise it returns FALSE
     * @param entity The target entity
     * @param componentType The component class
     * @returns boolean
     * @public
     * @example
     * ```js
     * entityManager.isComponentEnabled(entity, SpriteRenderer)
     * ```
     */
    public isComponentEnabled<T extends Component>(entity: Entity, componentType: ComponentType<T>): boolean;
    public isComponentEnabled<T extends Component>(arg1: Entity | T, arg2?: ComponentType<T>): boolean {
        const id = this.getComponentTypeId(typeof arg1 === "object" ? arg1 : arg2);
        const entity = typeof arg1 === "number" ? arg1 : this.getEntityForComponent(arg1);

        return entity !== undefined && !this.disabledComponents.get(entity)?.has(id);
    }

    /**
     * Disables a component instance
     * @param component The component instance
     * @public
     * @example
     * ```js
     * entityManager.disableComponent(spriteRenderer);
     * ```
     */
    public disableComponent(component: Component): void;
    /**
     * Disables a component by its entity and type
     * @param entity The target entity
     * @param componentType The component class
     * @public
     * @example
     * ```js
     * entityManager.disableComponent(entity, SpriteRenderer);
     * ```
     */
    public disableComponent<T extends Component>(entity: Entity, componentType: ComponentType<T>): void;
    public disableComponent<T extends Component>(arg1: Entity | T, arg2?: ComponentType<T>): void {
        const entity = typeof arg1 === "number" ? arg1 : this.getEntityForComponent(arg1);
        const id = this.getComponentTypeId(typeof arg1 === "object" ? arg1 : arg2);

        if (entity == undefined) return;

        if (!this.disabledComponents.has(entity)) {
            this.disabledComponents.set(entity, new Set([id]));
        } else if (!this.disabledComponents.get(entity).has(id)) {
            this.disabledComponents.get(entity).add(id);
        }
    }

    /**
     * Enables a component instance
     * @param component The component instance
     * @public
     * @example
     * ```js
     * entityManager.enableComponent(spriteRenderer);
     * ```
     */
    public enableComponent(component: Component): void;
    /**
     * Enables a component by its entity and type
     * @param entity The target entity
     * @param componentType The component class
     * @public
     * @example
     * ```js
     * entityManager.enableComponent(entity, SpriteRenderer);
     * ```
     */
    public enableComponent<T extends Component>(entity: Entity, componentType: ComponentType<T>): void;
    public enableComponent<T extends Component>(arg1: Entity | T, arg2?: ComponentType<T>): void {
        const entity = typeof arg1 === "number" ? arg1 : this.getEntityForComponent(arg1);
        const id = this.getComponentTypeId(typeof arg1 === "object" ? arg1 : arg2);

        if (entity !== undefined && this.disabledComponents.get(entity)?.has(id)) {
            this.disabledComponents.get(entity).delete(id);
        }
    }

    /**
     * Performs a search for entities given a component type.\
     * This method returns a collection of objects of type SearchResult, which has the entity found, and the instance of the component.\
     * This search can be filtered by passing as a second argument an instance of SearchCriteria, which performs a match between the attributes of the component and the given value.\
     * The third argument determines if disabled entities or components are included in the search result,\its default value is FALSE.
     * @param componentType The component class
     * @param criteria The search criteria
     * @param includeDisabled TRUE to incluide disabled entities and components, FALSE otherwise
     * @returns SearchResult
     * @public
     * @example
     * ```js
     * const searchResult = entityManager.search(SpriteRenderer);
     * searchResult.forEach(({component, entity}) => {
     *   // do something with the component and entity
     * })
     * ```
     * @example
     * ```js
     * const searchResult = entityManager.search(Enemy, {status: "alive"});
     * searchResult.forEach(({component, entity}) => {
     *   // do something with the component and entity
     * })
     * ```
     */
    public search<T extends Component>(
        componentType: ComponentType<T>,
        criteria?: SearchCriteria,
        includeDisabled: boolean = false,
    ): SearchResult<T>[] {
        const result: SearchResult<T>[] = [];
        const id = this.getComponentTypeId(componentType);

        if (this.components.has(id)) {
            this.components.get(id).forEach((component, entity) => {
                if (
                    (!criteria || Object.keys(criteria).every((key) => component[key] === criteria[key])) &&
                    (includeDisabled ||
                        (this.isEntityEnabled(entity) && this.isComponentEnabled(entity, componentType)))
                )
                    result.push({ entity, component: component as T });
            });
        }

        return result;
    }

    /**
     * Performs an entity search given a collection of component types.\
     * The entities found must have an instance of all the given component types.\
     * This method returns a collection of Entities.
     * @param componentTypes A collection of component classes
     * @returns A collection of entities
     * @public
     * @example
     * ```js
     * const entities = entityManager.searchEntitiesByComponents([Transform, SpriteRenderer, Animator]);
     * ```
     */
    public searchEntitiesByComponents(componentTypes: ComponentType[]): Entity[] {
        const entities: Entity[] = [];
        let first = true;

        for (const componentType of componentTypes) {
            const id = this.getComponentTypeId(componentType);
            if (!id || !this.components.has(id)) return [];

            if (first) {
                entities.push(...this.components.get(id).keys());
                first = false;
                continue;
            }

            const toCompare = new Set(this.components.get(id).keys());

            entities.forEach((e, i) => {
                if (!toCompare.has(e)) entities.splice(i, 1);
            });
        }

        return entities;
    }

    private getComponentTypeId<T extends Component>(component: ComponentType<T> | T): number {
        const prototype = typeof component === "object" ? component.constructor.prototype : component.prototype;
        if (prototype.__ecs_type_id === undefined) prototype.__ecs_type_id = ++this.lastComponentTypeId;
        return prototype.__ecs_type_id;
    }
}
