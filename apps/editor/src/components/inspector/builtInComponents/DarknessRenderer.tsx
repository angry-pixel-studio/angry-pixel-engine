import React from "react";
import { BuiltInComponentProps } from "../../../types/component";
import NumberField from "../propertyField/NumberField";
import ColorField from "../propertyField/ColorField";
import ListField from "../propertyField/ListField";
import { useEditorStore } from "../../../stores/editorStore";

const DarknessRenderer: React.FC<BuiltInComponentProps> = ({ component, onUpdate }) => {
    const { layers } = useEditorStore();

    return (
        <>
            <ListField
                propertyName="Layer"
                value={component.data?.layer}
                onUpdate={onUpdate("layer")}
                defaultValue="Default"
                options={{
                    items: [
                        { value: "Default", label: "Default" },
                        ...layers.renderLayers.map((layer) => ({ value: layer, label: layer })),
                    ],
                }}
            />

            <ColorField
                propertyName="Color"
                value={component.data?.color}
                onUpdate={onUpdate("color")}
                defaultValue="#000000"
                allowClear={false}
            />

            <NumberField
                propertyName="Width"
                value={component.data?.width}
                onUpdate={onUpdate("width")}
                defaultValue={0}
                options={{ min: 0, step: 1 }}
            />

            <NumberField
                propertyName="Height"
                value={component.data?.height}
                onUpdate={onUpdate("height")}
                defaultValue={0}
                options={{ min: 0, step: 1 }}
            />

            <NumberField
                propertyName="Opacity"
                value={component.data?.opacity}
                onUpdate={onUpdate("opacity")}
                defaultValue={1}
                options={{ min: 0, max: 1, step: 0.01 }}
            />
        </>
    );
};

export default DarknessRenderer;
