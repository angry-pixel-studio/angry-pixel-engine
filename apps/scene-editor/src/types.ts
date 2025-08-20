export interface SceneData {
    assets: {
        images: string[];
        fonts: FontData[];
        audio: string[];
        video: string[];
    };
    entities: EntityData[];
}

export interface FontData {
    name: string;
    url: string;
}

export interface EntityData {
    id: string;
    name: string;
    active: boolean;
    components: ComponentData[];
    children?: EntityData[];
}

export interface ComponentData {
    name: string;
    active: boolean;
    data: Record<string, unknown>;
}
