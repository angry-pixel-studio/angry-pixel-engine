import React from "react";
import { BuiltInComponentProps } from "../../../types/component";
import ImageField from "../propertyField/ImageField";
import RectField from "../propertyField/RectField";
import Vector2Field from "../propertyField/Vector2Field";
import BooleanField from "../propertyField/BooleanField";
import NumberField from "../propertyField/NumberField";
import ColorField from "../propertyField/ColorField";
import ListField from "../propertyField/ListField";
import { useEditorStore } from "../../../stores/editorStore";

const SpriteRenderer: React.FC<BuiltInComponentProps> = ({ component, onUpdate }) => {
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

            <ImageField propertyName="Image" value={component.data?.image} onUpdate={onUpdate("image")} />

            <RectField
                propertyName="Slice"
                value={component.data?.slice}
                onUpdate={onUpdate("slice")}
                options={{ setUndefinedWhenZero: true }}
            />

            <Vector2Field
                propertyName="Tiled"
                value={component.data?.tiled}
                onUpdate={onUpdate("tiled")}
                defaultValue={{ x: 1, y: 1 }}
                options={{ minX: 1, minY: 1, step: 1 }}
            />

            <BooleanField
                propertyName="Flip Horizontally"
                value={component.data?.flipHorizontally}
                onUpdate={onUpdate("flipHorizontally")}
            />

            <BooleanField
                propertyName="Flip Vertically"
                value={component.data?.flipVertically}
                onUpdate={onUpdate("flipVertically")}
            />

            <BooleanField propertyName="Smooth" value={component.data?.smooth} onUpdate={onUpdate("smooth")} />

            <NumberField
                propertyName="Opacity"
                value={component.data?.opacity}
                onUpdate={onUpdate("opacity")}
                defaultValue={1}
                options={{ min: 0, max: 1, step: 0.01 }}
            />

            <ColorField propertyName="Tint Color" value={component.data?.tintColor} onUpdate={onUpdate("tintColor")} />

            <ColorField propertyName="Mask Color" value={component.data?.maskColor} onUpdate={onUpdate("maskColor")} />

            <NumberField
                propertyName="Mask Color Mix"
                value={component.data?.maskColorMix}
                onUpdate={onUpdate("maskColorMix")}
                defaultValue={1}
                options={{ min: 0, max: 1, step: 0.01 }}
            />

            <Vector2Field propertyName="Offset" value={component.data?.offset} onUpdate={onUpdate("offset")} />

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
                options={{ min: -2 * Math.PI, max: 2 * Math.PI, step: 0.03 }}
            />

            <NumberField
                propertyName="Width"
                value={component.data?.width}
                onUpdate={onUpdate("width")}
                options={{ setUndefinedWhenZero: true }}
            />

            <NumberField
                propertyName="Height"
                value={component.data?.height}
                onUpdate={onUpdate("height")}
                options={{ setUndefinedWhenZero: true }}
            />
        </>
    );
};

export default SpriteRenderer;
