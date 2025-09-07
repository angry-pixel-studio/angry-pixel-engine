import React from "react";
import { EntityComponent } from "../../../types/scene";
import { useEditor } from "../../../hooks/useEditor";
import NumberField from "../propertyField/NumberField";
import StringField from "../propertyField/StringField";
import BooleanField from "../propertyField/BooleanField";
import Vector2Field from "../propertyField/Vector2Field";
import ColorField from "../propertyField/ColorField";
import FontField from "../propertyField/FontField";
import TextField from "../propertyField/TextField";
import ImageField from "../propertyField/ImageField";
import AudioField from "../propertyField/AudioField";
import VideoField from "../propertyField/VideoField";
import ObjectField from "../propertyField/ObjectField";
import StringArrayField from "../propertyField/StringArrayField";
import RectField from "../propertyField/RectField";
import ButtonField from "../propertyField/ButtonField";
import JsonField from "../propertyField/JsonField";

interface TypeTestProps {
    component: EntityComponent;
}

const TypeTest: React.FC<TypeTestProps> = ({ component }) => {
    const { updateComponentProperty } = useEditor();

    const handleUpdate = (propertyName: string) => (newValue: unknown) => {
        updateComponentProperty(component.id, propertyName, newValue);
    };

    return (
        <>
            <NumberField
                propertyName="Number"
                value={component.data?.numberProp}
                onUpdate={handleUpdate("numberProp")}
            />

            <StringField
                propertyName="String"
                value={component.data?.stringProp}
                onUpdate={handleUpdate("stringProp")}
            />

            <BooleanField
                propertyName="Boolean"
                value={component.data?.booleanProp}
                onUpdate={handleUpdate("booleanProp")}
            />

            <Vector2Field
                propertyName="Vector2"
                value={component.data?.vector2Prop}
                onUpdate={handleUpdate("vector2Prop")}
            />

            <ColorField propertyName="Color" value={component.data?.colorProp} onUpdate={handleUpdate("colorProp")} />

            <FontField propertyName="Font" value={component.data?.fontProp} onUpdate={handleUpdate("fontProp")} />

            <TextField propertyName="Text" value={component.data?.textProp} onUpdate={handleUpdate("textProp")} />

            <ImageField propertyName="Image" value={component.data?.imageProp} onUpdate={handleUpdate("imageProp")} />

            <AudioField propertyName="Audio" value={component.data?.audioProp} onUpdate={handleUpdate("audioProp")} />

            <VideoField propertyName="Video" value={component.data?.videoProp} onUpdate={handleUpdate("videoProp")} />

            <JsonField propertyName="Json" value={component.data?.jsonProp} onUpdate={handleUpdate("jsonProp")} />

            <ObjectField
                propertyName="Object"
                value={component.data?.objectProp}
                onUpdate={handleUpdate("objectProp")}
            />

            <StringArrayField
                propertyName="String Array"
                value={component.data?.stringArrayProp}
                onUpdate={handleUpdate("stringArrayProp")}
            />

            <RectField propertyName="Rect" value={component.data?.rectProp} onUpdate={handleUpdate("rectProp")} />

            <ButtonField
                propertyName="Button"
                value={component.data?.buttonProp}
                onUpdate={handleUpdate("buttonProp")}
                options={{ buttonLabel: "Click Me" }}
            />
        </>
    );
};

export default TypeTest;
