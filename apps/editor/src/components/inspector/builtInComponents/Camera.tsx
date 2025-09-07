import React from "react";
import { EntityComponent } from "../../../types/scene";
import { useEditor } from "../../../hooks/useEditor";
import StringArrayField from "../propertyField/StringArrayField";
import NumberField from "../propertyField/NumberField";

interface CameraProps {
    component: EntityComponent;
}

const Camera: React.FC<CameraProps> = ({ component }) => {
    const { updateComponentProperty } = useEditor();

    const handleUpdate = (propertyName: string) => (newValue: unknown) => {
        updateComponentProperty(component.id, propertyName, newValue);
    };

    return (
        <>
            <StringArrayField
                propertyName="Layers"
                value={component.data?.layers}
                onUpdate={handleUpdate("layers")}
                defaultValue={["Default"]}
            />

            <NumberField
                propertyName="Depth"
                value={component.data?.depth}
                onUpdate={handleUpdate("depth")}
                defaultValue={0}
            />

            <NumberField
                propertyName="Zoom"
                value={component.data?.zoom}
                onUpdate={handleUpdate("zoom")}
                defaultValue={1}
                options={{ min: 0, step: 0.1 }}
            />
        </>
    );
};

export default Camera;
