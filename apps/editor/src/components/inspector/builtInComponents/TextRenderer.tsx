import React from "react";
import { EntityComponent } from "../../../types/scene";
import { useEditor } from "../../../hooks/useEditor";
import TextField from "../propertyField/TextField";
import ColorField from "../propertyField/ColorField";
import FontField from "../propertyField/FontField";
import NumberField from "../propertyField/NumberField";
import ListField from "../propertyField/ListField";
import Vector2Field from "../propertyField/Vector2Field";
import BooleanField from "../propertyField/BooleanField";
import TextShadowField from "../propertyField/TextShadowField";
import { BuiltInComponent } from "../../../types/component";
import { defaultValues, TextRendererDefaultValues } from "../../../utils/builtInComponent/defaultValues";

interface TextRendererProps {
    component: EntityComponent;
}

const TextRenderer: React.FC<TextRendererProps> = ({ component }) => {
    const { updateComponentProperty, layers } = useEditor();
    const defaultValue = defaultValues[BuiltInComponent.TextRenderer] as TextRendererDefaultValues;

    const handleUpdate = (propertyName: string) => (newValue: unknown) => {
        updateComponentProperty(component.id, propertyName, newValue);
    };

    return (
        <>
            <ListField
                propertyName="Layer"
                value={component.data?.layer}
                onUpdate={handleUpdate("layer")}
                defaultValue={defaultValue.layer}
                options={{
                    items: [
                        { value: "Default", label: "Default" },
                        ...layers.renderLayers.map((layer) => ({ value: layer, label: layer })),
                    ],
                }}
            />

            <FontField
                propertyName="Font"
                value={component.data?.font}
                onUpdate={handleUpdate("font")}
                defaultValue={defaultValue.font as string}
            />

            <TextField
                propertyName="Text"
                value={component.data?.text}
                onUpdate={handleUpdate("text")}
                defaultValue={defaultValue.text}
            />

            <ColorField
                propertyName="Color"
                value={component.data?.color}
                onUpdate={handleUpdate("color")}
                defaultValue={defaultValue.color}
                allowClear={false}
            />

            <NumberField
                propertyName="Font Size"
                value={component.data?.fontSize}
                onUpdate={handleUpdate("fontSize")}
                defaultValue={defaultValue.fontSize}
                options={{ min: 1 }}
            />

            <NumberField
                propertyName="Width"
                value={component.data?.width}
                onUpdate={handleUpdate("width")}
                defaultValue={defaultValue.width}
                options={{ min: 0 }}
            />

            <NumberField
                propertyName="Height"
                value={component.data?.height}
                onUpdate={handleUpdate("height")}
                defaultValue={defaultValue.height}
                options={{ min: 0 }}
            />

            <NumberField
                propertyName="Opacity"
                value={component.data?.opacity}
                onUpdate={handleUpdate("opacity")}
                defaultValue={defaultValue.opacity}
                options={{ min: 0, max: 1, step: 0.01 }}
            />

            <ListField
                propertyName="Alignment"
                value={component.data?.alignment}
                onUpdate={handleUpdate("alignment")}
                options={{
                    items: [
                        { value: 0, label: "Center" },
                        { value: 1, label: "Right" },
                        { value: 2, label: "Left" },
                    ],
                    castValue: (value: string) => value !== undefined && Number(value),
                }}
                defaultValue={defaultValue.alignment}
            />

            <NumberField
                propertyName="Rotation"
                value={component.data?.rotation}
                onUpdate={handleUpdate("rotation")}
                defaultValue={defaultValue.rotation}
                options={{ min: -2 * Math.PI, max: 2 * Math.PI, step: 0.03 }}
            />

            <Vector2Field
                propertyName="Offset"
                value={component.data?.offset}
                onUpdate={handleUpdate("offset")}
                defaultValue={defaultValue.offset}
            />

            <BooleanField
                propertyName="Flip Horizontally"
                value={component.data?.flipHorizontally}
                onUpdate={handleUpdate("flipHorizontally")}
                defaultValue={defaultValue.flipHorizontally}
            />

            <BooleanField
                propertyName="Flip Vertically"
                value={component.data?.flipVertically}
                onUpdate={handleUpdate("flipVertically")}
                defaultValue={defaultValue.flipVertically}
            />

            <BooleanField
                propertyName="Smooth"
                value={component.data?.smooth}
                onUpdate={handleUpdate("smooth")}
                defaultValue={defaultValue.smooth}
            />

            <NumberField
                propertyName="Letter Spacing"
                value={component.data?.letterSpacing}
                onUpdate={handleUpdate("letterSpacing")}
                defaultValue={defaultValue.letterSpacing}
            />

            <NumberField
                propertyName="Line Height"
                value={component.data?.lineHeight}
                onUpdate={handleUpdate("lineHeight")}
                options={{ min: 0 }}
                defaultValue={defaultValue.lineHeight ?? 0}
            />

            <TextShadowField
                propertyName="Shadow"
                value={component.data?.shadow}
                onUpdate={handleUpdate("shadow")}
                defaultValue={defaultValue.shadow}
            />
        </>
    );
};

export default TextRenderer;
