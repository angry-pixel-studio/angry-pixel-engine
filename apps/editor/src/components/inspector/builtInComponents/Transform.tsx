import React from "react";
import { BuiltInComponentProps } from "../../../types/component";
import Vector2Field from "../propertyField/Vector2Field";
import NumberField from "../propertyField/NumberField";

const Transform: React.FC<BuiltInComponentProps> = ({ component, onUpdate }) => {
    return (
        <>
            <Vector2Field
                propertyName="Position"
                value={component.data?.position}
                onUpdate={onUpdate("position")}
                defaultValue={{ x: 0, y: 0 }}
            />

            <Vector2Field
                propertyName="Scale"
                value={component.data?.scale}
                onUpdate={onUpdate("scale")}
                defaultValue={{ x: 1, y: 1 }}
            />

            <NumberField
                propertyName="Rotation"
                value={component.data?.rotation}
                onUpdate={onUpdate("rotation")}
                defaultValue={0}
                options={{ min: -2 * Math.PI, max: 2 * Math.PI, step: 0.03 }}
            />
        </>
    );
};

export default Transform;
