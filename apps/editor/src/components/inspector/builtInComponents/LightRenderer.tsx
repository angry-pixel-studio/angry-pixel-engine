import React from "react";
import { EntityComponent } from "../../../types/scene";
import { useEditor } from "../../../hooks/useEditor";
import NumberField from "../propertyField/NumberField";
import BooleanField from "../propertyField/BooleanField";
import StringField from "../propertyField/StringField";

interface LightRendererProps {
    component: EntityComponent;
}

const LightRenderer: React.FC<LightRendererProps> = ({ component }) => {
    const { updateComponentProperty } = useEditor();

    const handleUpdate = (propertyName: string) => (newValue: unknown) => {
        updateComponentProperty(component.id, propertyName, newValue);
    };

    return (
        <>
            <NumberField
                propertyName="Radius"
                value={component.data?.radius}
                onUpdate={handleUpdate("radius")}
                defaultValue={100}
                options={{ min: 0, step: 1 }}
            />

            <BooleanField
                propertyName="Smooth"
                value={component.data?.smooth}
                onUpdate={handleUpdate("smooth")}
                defaultValue={true}
            />

            <StringField
                propertyName="Layer"
                value={component.data?.layer}
                onUpdate={handleUpdate("layer")}
                defaultValue="Default"
            />

            <NumberField
                propertyName="Intensity"
                value={component.data?.intensity}
                onUpdate={handleUpdate("intensity")}
                defaultValue={0.8}
                options={{ min: 0, max: 1, step: 0.01 }}
            />
        </>
    );
};

export default LightRenderer;
