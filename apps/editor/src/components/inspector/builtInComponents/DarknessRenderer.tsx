import React from "react";
import { EntityComponent } from "../../../types/scene";
import { useEditor } from "../../../hooks/useEditor";
import NumberField from "../propertyField/NumberField";
import ColorField from "../propertyField/ColorField";
import ListField from "../propertyField/ListField";

interface DarknessRendererProps {
    component: EntityComponent;
}

const DarknessRenderer: React.FC<DarknessRendererProps> = ({ component }) => {
    const { updateComponentProperty, layers } = useEditor();

    const handleUpdate = (propertyName: string) => (newValue: unknown) => {
        updateComponentProperty(component.id, propertyName, newValue);
    };

    return (
        <>
            <ListField
                propertyName="Layer"
                value={component.data?.layer}
                onUpdate={handleUpdate("layer")}
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
                onUpdate={handleUpdate("color")}
                defaultValue="#000000"
                allowClear={false}
            />

            <NumberField
                propertyName="Width"
                value={component.data?.width}
                onUpdate={handleUpdate("width")}
                defaultValue={0}
                options={{ min: 0, step: 1 }}
            />

            <NumberField
                propertyName="Height"
                value={component.data?.height}
                onUpdate={handleUpdate("height")}
                defaultValue={0}
                options={{ min: 0, step: 1 }}
            />

            <NumberField
                propertyName="Opacity"
                value={component.data?.opacity}
                onUpdate={handleUpdate("opacity")}
                defaultValue={1}
                options={{ min: 0, max: 1, step: 0.01 }}
            />
        </>
    );
};

export default DarknessRenderer;
