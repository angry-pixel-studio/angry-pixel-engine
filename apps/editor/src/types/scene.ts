import { BuiltInComponent, Component } from "./component";

export interface Scene {
    id: string;
    name: string;
    components: Component[];
    entities: EntityWithComponentsAndChildren[];
    systems: System[];
    assets: Asset[];
}

export interface Entity {
    id: string;
    name: string;
    enabled: boolean;
}

export interface EntityWithParent extends Entity {
    parent: string | null;
    level: number;
}

export interface EntityWithChildren extends Entity {
    children: (EntityWithChildren | EntityWithComponents | EntityWithComponentsAndChildren)[];
}

export interface EntityWithComponents extends Entity {
    components: EntityComponent[];
}

export interface EntityWithComponentsAndChildren extends EntityWithComponents, EntityWithChildren {}

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

export interface Asset {
    id: string;
    name: string;
    url: string;
    type: AssetType;
}

export enum AssetType {
    Image = "image",
    Audio = "audio",
    Video = "video",
    Font = "font",
    Json = "json",
}
