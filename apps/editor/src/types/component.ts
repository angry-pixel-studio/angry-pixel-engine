export interface Component {
    name: string;
    displayName: string;
    properties: ComponentProperty[];
}

export interface ComponentProperty {
    name: string;
    displayName: string;
    type: PropertyType;
}

export enum PropertyType {
    Number = "Number",
    String = "String",
    Boolean = "Boolean",
    Vector2 = "Vector2",
    Color = "Color",
    Font = "Font",
    Text = "Text",
    Image = "Image",
    Audio = "Audio",
    Video = "Video",
    Object = "Object",
    StringArray = "StringArray",
    Rect = "Rect",
}

export enum BuiltInComponent {
    TypeTest = "TypeTest",
    Transform = "Transform",
    Camera = "Camera",
    SpriteRenderer = "SpriteRenderer",
}
