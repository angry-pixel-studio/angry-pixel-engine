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
}

export enum BuiltInComponent {
    Transform = "Transform",
    Camera = "Camera",
    SpriteRenderer = "SpriteRenderer",
}
