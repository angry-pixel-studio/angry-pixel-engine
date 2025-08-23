import { BuiltInComponent, Component } from "./component";

export interface Scene {
    id: string;
    name: string;
    components: Component[];
    entities: EntityWithComponentsAndChildren[];
    systems: System[];
}

export interface Entity {
    id: string;
    name: string;
    enabled: boolean;
}

export interface EntityWithChildren<T extends Entity> extends Entity {
    children: T[];
}

export interface EntityWithComponents extends Entity {
    components: EntityComponent[];
}

export interface EntityWithComponentsAndChildren
    extends EntityWithComponents,
        EntityWithChildren<EntityWithComponentsAndChildren> {}

export interface EntityComponent {
    id: string;
    name: string | BuiltInComponent;
    enabled: boolean;
    data?: Record<string, unknown>;
    builtIn?: boolean;
}

export interface System {
    id: string;
    name: string;
    enabled: boolean;
    url: string;
}
