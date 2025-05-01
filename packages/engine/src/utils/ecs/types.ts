/**
 * This type represents a unique numeric identifier for an Entity in the ECS system
 * @public
 * @category Entity-Component-System
 */
export type Entity = number;
/**
 * This type represents an instance of a component in the ECS system.\
 * Components are data containers that can be attached to entities\
 * to define their properties and state.\
 * They are implemented as plain objects with key-value pairs.
 * @public
 * @category Entity-Component-System
 * @example
 * ```typescript
 * class PlayerComponent {
 *   health: number;
 *   speed: number;
 * }
 * ```
 */
export type Component = Record<string, any>;
/**
 * This type represents a constructor function for creating component instances.\
 * Component classes define the structure and behavior of components that can be attached to entities.\
 * They serve as templates/factories for creating component instances with consistent properties and methods.
 * @public
 * @category Entity-Component-System
 * @example
 * ```typescript
 * class PlayerComponent {
 *   health: number;
 *   speed: number;
 * }
 * ```
 */
export type ComponentType<T extends Component = Component> = { new (...args: any[]): T };
/**
 * This type represents a search result object containing an entity and its matching component.\
 * Used when searching for entities with specific components and criteria.\
 * The generic type T extends Component to provide type safety for the returned component.
 * @public
 * @category Entity-Component-System
 */
export type SearchResult<T extends Component> = { entity: Entity; component: T };
/**
 * This type represents a search criteria object used to filter components when searching for entities.\
 * It defines a set of key-value pairs where the keys correspond to component properties\
 * and the values are the criteria to match against those properties.
 * @public
 * @category Entity-Component-System
 */
export type SearchCriteria = Record<string, any>;

/**
 * This type represents an Entity Archetype, which defines a template for creating entities with a specific set of components.\
 * It specifies which components should be attached to the entity, whether the entity should be enabled/disabled,\
 * and can include child archetypes to create hierarchical entity structures.
 * @public
 * @category Entity-Component-System
 * @example
 * ```typescript
 * // Define an archetype for a player entity with multiple components
 * const playerArchetype: Archetype = {
 *   components: [
 *     new Transform({position: new Vector2(0, 0)}),
 *     new Player({health: 100}),
 *     new SpriteRenderer({sprite: 'player.png'})
 *   ],
 * };
 *
 * // Define an archetype with disabled components and child entities
 * const enemyArchetype: Archetype = {
 *   components: [
 *     new Transform(),
 *     new Enemy(),
 *     disableComponent(new BoxCollider()) // This component starts disabled
 *   ],
 *   children: [
 *     {
 *       components: [new WeaponMount()],
 *       enabled: false // This child entity starts disabled
 *     }
 *   ],
 * };
 * ```
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
 * This interface defines the core structure for system classes in the ECS architecture.\
 * Systems contain the game logic that operates on entities and their components.\
 * Dependencies like EntityManager can be injected using dependency injection decorators.\
 * Systems must implement onUpdate() and can optionally implement lifecycle hooks like onCreate(), onDestroy(), onEnabled() and onDisabled().
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
 * This type represents a constructor type for System classes.\
 * It defines the shape of a class that can be instantiated to create System objects.\
 * Used for type-safe system registration and retrieval in the SystemManager.
 * @public
 * @category Entity-Component-System
 */
export type SystemType<T extends System = System> = { new (...args: any[]): T };

/** @internal */
export type SystemGroup = string | number | symbol;
