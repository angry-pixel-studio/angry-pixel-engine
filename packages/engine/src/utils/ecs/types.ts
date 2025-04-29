/**
 * This type an unique identifier of an Entity
 * @public
 * @category Entity-Component-System
 */
export type Entity = number;
/**
 * This type represents an instance of a component
 * @public
 * @category Entity-Component-System
 */
export type Component = Record<string, any>;
/**
 * This type represents a component class
 * @public
 * @category Entity-Component-System
 */
export type ComponentType<T extends Component = Component> = { new (...args: any[]): T };
/**
 * This type represents a search result object
 * @public
 * @category Entity-Component-System
 */
export type SearchResult<T extends Component> = { entity: Entity; component: T };
/**
 * This type represents a search criteria object
 * @public
 * @category Entity-Component-System
 */
export type SearchCriteria = Record<string, any>;

/**
 * This type represents an Entity Archetype
 * @public
 * @category Entity-Component-System
 */
export type Archetype = {
    components: (Component | ComponentType | DisabledComponent)[];
    children?: Archetype[];
    enabled?: boolean;
};

/**
 * This type represents a disabled component
 * @public
 * @category Entity-Component-System
 */
export type DisabledComponent = { enabled: false; component: Component | ComponentType };

/**
 * This interface is used for the creation of system classes. You will have to inject the dependencies you need manully.
 * @public
 * @category Entity-Component-System
 * @example
 * ```typescript
 * class PlayerSystem implements System {
 *   @inject(Symbols.EntityManager) private readonly entityManager: EntityManager;
 *
 *   public onUpdate() {
 *     this.entityManager.search(Player).forEach(({component, entity}) => {
 *       // do somethng
 *     });
 *   }
 * }
 * ```
 */
export interface System {
    /**
     * This method is called the first time the system is enabled
     * @public
     */
    onCreate?(): void;
    /**
     * This method is called when the system is destroyed
     * @public
     */
    onDestroy?(): void;
    /**
     * This method is called when the system is disabled
     * @public
     */
    onDisabled?(): void;
    /**
     * This method is called when the system is enabled
     * @public
     */
    onEnabled?(): void;
    /**
     * This method is called once every frame
     * @public
     */
    onUpdate(): void;
}

/**
 * This type represents a system class
 * @public
 * @category Entity-Component-System
 */
export type SystemType<T extends System = System> = { new (...args: any[]): T };

/** @internal */
export type SystemGroup = string | number | symbol;
