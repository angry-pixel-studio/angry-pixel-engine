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
    TilemapRenderer = "TilemapRenderer",
    TextRenderer = "TextRenderer",
    VideoRenderer = "VideoRenderer",
    MaskRenderer = "MaskRenderer",
    LightRenderer = "LightRenderer",
    DarknessRenderer = "DarknessRenderer",
    Button = "Button",
    TiledWrapper = "TiledWrapper",
    TilemapCollider = "TilemapCollider",
    EdgeCollider = "EdgeCollider",
    BoxCollider = "BoxCollider",
    BallCollider = "BallCollider",
    PolygonCollider = "PolygonCollider",
    // test component
    TypeTest = "TypeTest",
}

export type PropertyOption = Record<string, unknown>;
