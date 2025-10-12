import React, { useState } from "react";
import { EntityComponent } from "../../../types/scene";
import { useEditor } from "../../../hooks/useEditor";
import ListField from "../propertyField/ListField";
import ColorField from "../propertyField/ColorField";
import NumberField from "../propertyField/NumberField";
import Vector2ArrayField from "../propertyField/Vector2ArrayField";
import Vector2Field from "../propertyField/Vector2Field";
import { MaskShape } from "angry-pixel";
import { BuiltInComponent } from "../../../types/component";
import { defaultValues, MaskRendererDefaultValues } from "../../../utils/builtInComponent/defaultValues";

interface MaskRendererProps {
    component: EntityComponent;
}

const MaskRenderer: React.FC<MaskRendererProps> = ({ component }) => {
    const { updateComponentProperty, layers } = useEditor();
    const [shape, setShape] = useState<MaskShape>(component.data?.shape as MaskShape);
    const defaultValue = defaultValues[BuiltInComponent.MaskRenderer] as MaskRendererDefaultValues;

    const handleUpdate = (propertyName: string) => (newValue: unknown) => {
        updateComponentProperty(component.id, propertyName, newValue);
    };

    const handleShapeChange = (newValue: unknown) => {
        setShape(newValue as MaskShape);
        handleUpdate("shape")(newValue === "" ? undefined : newValue);
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
                        { value: defaultValue.layer, label: defaultValue.layer },
                        ...layers.renderLayers.map((layer) => ({ value: layer, label: layer })),
                    ],
                }}
            />

            <ListField
                propertyName="Shape"
                value={component.data?.shape}
                onUpdate={handleShapeChange}
                defaultValue={defaultValue.shape}
                options={{
                    items: [
                        { value: MaskShape.Rectangle, label: "Rectangle" },
                        { value: MaskShape.Circumference, label: "Circumference" },
                        { value: MaskShape.Polygon, label: "Polygon" },
                    ],
                    castValue: (value: string) => value !== undefined && Number(value),
                }}
            />

            <ColorField
                propertyName="Color"
                value={component.data?.color}
                onUpdate={handleUpdate("color")}
                defaultValue={defaultValue.color}
                allowClear={false}
            />

            {shape === MaskShape.Rectangle && (
                <NumberField
                    propertyName="Width"
                    value={component.data?.width}
                    onUpdate={handleUpdate("width")}
                    defaultValue={defaultValue.width}
                    options={{ min: 0, step: 1 }}
                />
            )}

            {shape === MaskShape.Rectangle && (
                <NumberField
                    propertyName="Height"
                    value={component.data?.height}
                    onUpdate={handleUpdate("height")}
                    defaultValue={defaultValue.height}
                    options={{ min: 0, step: 1 }}
                />
            )}

            {shape === MaskShape.Circumference && (
                <NumberField
                    propertyName="Radius"
                    value={component.data?.radius}
                    onUpdate={handleUpdate("radius")}
                    defaultValue={defaultValue.radius}
                    options={{ min: 0, step: 1 }}
                />
            )}

            {shape === MaskShape.Polygon && (
                <Vector2ArrayField
                    propertyName="Vertex Model"
                    value={component.data?.vertexModel}
                    onUpdate={handleUpdate("vertexModel")}
                    defaultValue={defaultValue.vertexModel}
                />
            )}

            <Vector2Field
                propertyName="Offset"
                value={component.data?.offset}
                onUpdate={handleUpdate("offset")}
                defaultValue={defaultValue.offset}
            />

            {shape !== MaskShape.Circumference && (
                <NumberField
                    propertyName="Rotation"
                    value={component.data?.rotation}
                    onUpdate={handleUpdate("rotation")}
                    defaultValue={defaultValue.rotation}
                    options={{ min: -2 * Math.PI, max: 2 * Math.PI, step: 0.03 }}
                />
            )}

            <NumberField
                propertyName="Opacity"
                value={component.data?.opacity}
                onUpdate={handleUpdate("opacity")}
                defaultValue={defaultValue.opacity}
                options={{ min: 0, max: 1, step: 0.01 }}
            />
        </>
    );
};

export default MaskRenderer;
