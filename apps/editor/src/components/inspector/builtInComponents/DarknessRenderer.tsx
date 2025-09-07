import React from "react";
import { EntityComponent } from "../../../types/scene";
import { useEditor } from "../../../hooks/useEditor";
import NumberField from "../propertyField/NumberField";
import ColorField from "../propertyField/ColorField";
import StringField from "../propertyField/StringField";

interface DarknessRendererProps {
    component: EntityComponent;
}

const DarknessRenderer: React.FC<DarknessRendererProps> = ({ component }) => {
    const { updateComponentProperty } = useEditor();

    const handleUpdate = (propertyName: string) => (newValue: unknown) => {
        updateComponentProperty(component.id, propertyName, newValue);
    };

    return (
        <>
            <NumberField
                propertyName="Width"
                value={component.data?.width}
                onUpdate={handleUpdate("width")}
                defaultValue={100}
                options={{ min: 0, step: 1 }}
            />

            <NumberField
                propertyName="Height"
                value={component.data?.height}
                onUpdate={handleUpdate("height")}
                defaultValue={50}
                options={{ min: 0, step: 1 }}
            />

            <ColorField
                propertyName="Color"
                value={component.data?.color}
                onUpdate={handleUpdate("color")}
                defaultValue="#000000"
            />

            <NumberField
                propertyName="Opacity"
                value={component.data?.opacity}
                onUpdate={handleUpdate("opacity")}
                defaultValue={0.5}
                options={{ min: 0, max: 1, step: 0.01 }}
            />

            <StringField
                propertyName="Layer"
                value={component.data?.layer}
                onUpdate={handleUpdate("layer")}
                defaultValue="Default"
            />
        </>
    );
};

export default DarknessRenderer;
