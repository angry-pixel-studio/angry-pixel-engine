import React from "react";
import { EntityComponent } from "../../../types/scene";
import { useEditor } from "../../../hooks/useEditor";
import Vector2Field from "../propertyField/Vector2Field";
import NumberField from "../propertyField/NumberField";

interface TransformProps {
    component: EntityComponent;
}

const Transform: React.FC<TransformProps> = ({ component }) => {
    const { updateComponentProperty } = useEditor();

    const handleUpdate = (propertyName: string) => (newValue: unknown) => {
        updateComponentProperty(component.id, propertyName, newValue);
    };

    return (
        <>
            <Vector2Field
                propertyName="Position"
                value={component.data?.position}
                onUpdate={handleUpdate("position")}
                defaultValue={{ x: 0, y: 0 }}
            />

            <Vector2Field
                propertyName="Scale"
                value={component.data?.scale}
                onUpdate={handleUpdate("scale")}
                defaultValue={{ x: 1, y: 1 }}
            />

            <NumberField
                propertyName="Rotation"
                value={component.data?.rotation}
                onUpdate={handleUpdate("rotation")}
                defaultValue={0}
                options={{ min: -2 * Math.PI, max: 2 * Math.PI, step: 0.03 }}
            />
        </>
    );
};

export default Transform;
