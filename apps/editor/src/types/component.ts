export interface Component {
    name: string;
    displayName: string;
    properties: ComponentProperty[];
}

export interface ComponentProperty {
    name: string;
    displayName: string;
    type: PropertyType;
    defaultValue?: unknown;
    options?: PropertyOption;
    enabled?: boolean;
}

export enum PropertyType {
    Button = "Button",
    Number = "Number",
    String = "String",
    Boolean = "Boolean",
    Vector2 = "Vector2",
    Vector2Array = "Vector2Array",
    Color = "Color",
    Font = "Font",
    Text = "Text",
    Image = "Image",
    Audio = "Audio",
    Video = "Video",
    Object = "Object",
    StringArray = "StringArray",
    Rect = "Rect",
    List = "List",
}

export enum BuiltInComponent {
    Transform = "Transform",
    Camera = "Camera",
    SpriteRenderer = "SpriteRenderer",
    TextRenderer = "TextRenderer",
    TilemapRenderer = "TilemapRenderer",
    MaskRenderer = "MaskRenderer",
    DarknessRenderer = "DarknessRenderer",
    LightRenderer = "LightRenderer",
    VideoRenderer = "VideoRenderer",
    Button = "Button",
    TiledWrapper = "TiledWrapper",
    BoxCollider = "BoxCollider",
    BallCollider = "BallCollider",
    PolygonCollider = "PolygonCollider",
    EdgeCollider = "EdgeCollider",
    TilemapCollider = "TilemapCollider",
}

export type PropertyOption = Record<string, unknown>;
