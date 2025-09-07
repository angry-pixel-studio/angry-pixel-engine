import React from "react";
import { EntityComponent } from "../../../types/scene";
import { useEditor } from "../../../hooks/useEditor";
import TextField from "../propertyField/TextField";
import ColorField from "../propertyField/ColorField";
import FontField from "../propertyField/FontField";
import NumberField from "../propertyField/NumberField";
import StringField from "../propertyField/StringField";
import ListField from "../propertyField/ListField";
import Vector2Field from "../propertyField/Vector2Field";
import BooleanField from "../propertyField/BooleanField";

interface TextRendererProps {
    component: EntityComponent;
}

const TextRenderer: React.FC<TextRendererProps> = ({ component }) => {
    const { updateComponentProperty } = useEditor();

    const handleUpdate = (propertyName: string) => (newValue: unknown) => {
        updateComponentProperty(component.id, propertyName, newValue);
    };

    return (
        <>
            <TextField
                propertyName="Text"
                value={component.data?.text}
                onUpdate={handleUpdate("text")}
                defaultValue="Hello World!"
            />

            <ColorField
                propertyName="Color"
                value={component.data?.color}
                onUpdate={handleUpdate("color")}
                defaultValue="#000000"
            />

            <FontField
                propertyName="Font"
                value={component.data?.font}
                onUpdate={handleUpdate("font")}
                defaultValue="Arial"
            />

            <NumberField
                propertyName="Font Size"
                value={component.data?.fontSize}
                onUpdate={handleUpdate("fontSize")}
                defaultValue={16}
                options={{ min: 1 }}
            />

            <NumberField
                propertyName="Width"
                value={component.data?.width}
                onUpdate={handleUpdate("width")}
                defaultValue={192}
                options={{ min: 0 }}
            />

            <NumberField
                propertyName="Height"
                value={component.data?.height}
                onUpdate={handleUpdate("height")}
                defaultValue={16}
                options={{ min: 0 }}
            />

            <StringField
                propertyName="Layer"
                value={component.data?.layer}
                onUpdate={handleUpdate("layer")}
                defaultValue="Default"
            />

            <NumberField
                propertyName="Opacity"
                value={component.data?.opacity}
                onUpdate={handleUpdate("opacity")}
                defaultValue={1}
                options={{ min: 0, max: 1, step: 0.01 }}
            />

            <ListField
                propertyName="Orientation"
                value={component.data?.orientation}
                onUpdate={handleUpdate("orientation")}
                options={{
                    items: [
                        { value: 0, label: "Center" },
                        { value: 1, label: "Right Center" },
                        { value: 2, label: "Right Up" },
                        { value: 3, label: "Right Down" },
                    ],
                    castValue: (value: string) => value !== undefined && Number(value),
                }}
                defaultValue={0}
            />

            <NumberField
                propertyName="Rotation"
                value={component.data?.rotation}
                onUpdate={handleUpdate("rotation")}
                defaultValue={0}
                options={{ min: -2 * Math.PI, max: 2 * Math.PI, step: 0.03 }}
            />

            <Vector2Field
                propertyName="Offset"
                value={component.data?.offset}
                onUpdate={handleUpdate("offset")}
                defaultValue={{ x: 0, y: 0 }}
            />

            <BooleanField
                propertyName="Flip Horizontally"
                value={component.data?.flipHorizontally}
                onUpdate={handleUpdate("flipHorizontally")}
                defaultValue={false}
            />

            <BooleanField
                propertyName="Flip Vertically"
                value={component.data?.flipVertically}
                onUpdate={handleUpdate("flipVertically")}
                defaultValue={false}
            />

            <BooleanField
                propertyName="Smooth"
                value={component.data?.smooth}
                onUpdate={handleUpdate("smooth")}
                defaultValue={false}
            />

            <NumberField
                propertyName="Letter Spacing"
                value={component.data?.letterSpacing}
                onUpdate={handleUpdate("letterSpacing")}
                defaultValue={0}
            />

            <NumberField
                propertyName="Line Height"
                value={component.data?.lineHeight}
                onUpdate={handleUpdate("lineHeight")}
                options={{ min: 0 }}
            />
        </>
    );
};

export default TextRenderer;
