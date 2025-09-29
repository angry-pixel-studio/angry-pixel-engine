import React from "react";
import { EntityComponent } from "../../../types/scene";
import { useEditor } from "../../../hooks/useEditor";
import { useEditorStore } from "../../../stores/editorStore";
import { PredefinedStringArrayField } from "../propertyField";
import NumberField from "../propertyField/NumberField";

interface CameraProps {
    component: EntityComponent;
}

const Camera: React.FC<CameraProps> = ({ component }) => {
    const { updateComponentProperty } = useEditor();
    const { layers } = useEditorStore();

    const handleUpdate = (propertyName: string) => (newValue: unknown) => {
        updateComponentProperty(component.id, propertyName, newValue);
    };

    return (
        <>
            <PredefinedStringArrayField
                propertyName="Layers"
                value={component.data?.layers as string[]}
                onUpdate={handleUpdate("layers")}
                defaultValue={["Default"]}
                availableOptions={layers.renderLayers}
            />

            <NumberField
                propertyName="Zoom"
                value={component.data?.zoom}
                onUpdate={handleUpdate("zoom")}
                defaultValue={1}
                options={{ min: 0, step: 0.1 }}
            />

            <NumberField
                propertyName="Depth"
                value={component.data?.depth}
                onUpdate={handleUpdate("depth")}
                defaultValue={0}
            />
        </>
    );
};

export default Camera;
