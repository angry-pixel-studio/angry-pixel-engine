import React from "react";
import { BuiltInComponentProps } from "../../../types/component";
import NumberField from "../propertyField/NumberField";
import BooleanField from "../propertyField/BooleanField";
import ListField from "../propertyField/ListField";
import { useEditorStore } from "../../../stores/editorStore";

const LightRenderer: React.FC<BuiltInComponentProps> = ({ component, onUpdate }) => {
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

            <NumberField
                propertyName="Radius"
                value={component.data?.radius}
                onUpdate={onUpdate("radius")}
                defaultValue={0}
                options={{ min: 0, step: 1 }}
            />

            <NumberField
                propertyName="Intensity"
                value={component.data?.intensity}
                onUpdate={onUpdate("intensity")}
                defaultValue={1}
                options={{ min: 0, max: 1, step: 0.01 }}
            />

            <BooleanField
                propertyName="Smooth"
                value={component.data?.smooth}
                onUpdate={onUpdate("smooth")}
                defaultValue={false}
            />
        </>
    );
};

export default LightRenderer;
