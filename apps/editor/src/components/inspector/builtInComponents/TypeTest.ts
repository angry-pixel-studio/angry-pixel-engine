import { BuiltInComponent, Component, PropertyType } from "../../../types/component";

export const typeTest: Component = {
    name: BuiltInComponent.TypeTest,
    displayName: "Type Test",
    properties: [
        {
            name: "numberProp",
            displayName: "Number",
            type: PropertyType.Number,
        },
        {
            name: "stringProp",
            displayName: "String",
            type: PropertyType.String,
        },
        {
            name: "booleanProp",
            displayName: "Boolean",
            type: PropertyType.Boolean,
        },
        {
            name: "vector2Prop",
            displayName: "Vector2",
            type: PropertyType.Vector2,
        },
        {
            name: "colorProp",
            displayName: "Color",
            type: PropertyType.Color,
        },
        {
            name: "fontProp",
            displayName: "Font",
            type: PropertyType.Font,
        },
        {
            name: "textProp",
            displayName: "Text",
            type: PropertyType.Text,
        },
        {
            name: "imageProp",
            displayName: "Image",
            type: PropertyType.Image,
        },
        {
            name: "audioProp",
            displayName: "Audio",
            type: PropertyType.Audio,
        },
        {
            name: "videoProp",
            displayName: "Video",
            type: PropertyType.Video,
        },
        {
            name: "objectProp",
            displayName: "Object",
            type: PropertyType.Object,
        },
        {
            name: "stringArrayProp",
            displayName: "String Array",
            type: PropertyType.StringArray,
        },
        {
            name: "rectProp",
            displayName: "Rect",
            type: PropertyType.Rect,
        },
        {
            name: "buttonProp",
            displayName: "Button",
            type: PropertyType.Button,
            options: { buttonLabel: "Button Label" },
        },
    ],
};
