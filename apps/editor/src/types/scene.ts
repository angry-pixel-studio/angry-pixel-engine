import { BuiltInComponent, Component } from "./component";

export interface Scene {
    id: string;
    name: string;
    components: Component[];
    entities: Entity[];
    systems: System[];
}

export interface Entity {
    id: string;
    name: string;
    enabled: boolean;
    components: EntityComponent[];
    children?: Entity[];
}

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
