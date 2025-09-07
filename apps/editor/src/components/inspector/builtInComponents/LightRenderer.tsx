import React from "react";
import { EntityComponent } from "../../../types/scene";
import { useEditor } from "../../../hooks/useEditor";
import NumberField from "../propertyField/NumberField";
import BooleanField from "../propertyField/BooleanField";
import ListField from "../propertyField/ListField";

interface LightRendererProps {
    component: EntityComponent;
}

const LightRenderer: React.FC<LightRendererProps> = ({ component }) => {
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

            <NumberField
                propertyName="Radius"
                value={component.data?.radius}
                onUpdate={handleUpdate("radius")}
                defaultValue={0}
                options={{ min: 0, step: 1 }}
            />

            <NumberField
                propertyName="Intensity"
                value={component.data?.intensity}
                onUpdate={handleUpdate("intensity")}
                defaultValue={1}
                options={{ min: 0, max: 1, step: 0.01 }}
            />

            <BooleanField
                propertyName="Smooth"
                value={component.data?.smooth}
                onUpdate={handleUpdate("smooth")}
                defaultValue={false}
            />
        </>
    );
};

export default LightRenderer;
