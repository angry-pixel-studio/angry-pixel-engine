import React from "react";
import { BuiltInComponentProps } from "../../../types/component";
import { useEditorStore } from "../../../stores/editorStore";
import { PredefinedStringArrayField } from "../propertyField";
import NumberField from "../propertyField/NumberField";

const Camera: React.FC<BuiltInComponentProps> = ({ component, onUpdate }) => {
    const { layers } = useEditorStore();

    return (
        <>
            <PredefinedStringArrayField
                propertyName="Layers"
                value={component.data?.layers as string[]}
                onUpdate={onUpdate("layers")}
                defaultValue={["Default"]}
                availableOptions={layers.renderLayers}
            />

            <NumberField
                propertyName="Zoom"
                value={component.data?.zoom}
                onUpdate={onUpdate("zoom")}
                defaultValue={1}
                options={{ min: 0, step: 0.1 }}
            />

            <NumberField
                propertyName="Depth"
                value={component.data?.depth}
                onUpdate={onUpdate("depth")}
                defaultValue={0}
            />
        </>
    );
};

export default Camera;
