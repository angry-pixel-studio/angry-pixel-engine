import React from "react";
import { EntityComponent } from "../../../types/scene";
import { useEditor } from "../../../hooks/useEditor";
import ImageField from "../propertyField/ImageField";
import RectField from "../propertyField/RectField";
import Vector2Field from "../propertyField/Vector2Field";
import BooleanField from "../propertyField/BooleanField";
import NumberField from "../propertyField/NumberField";
import ColorField from "../propertyField/ColorField";
import ListField from "../propertyField/ListField";

interface SpriteRendererProps {
    component: EntityComponent;
}

const SpriteRenderer: React.FC<SpriteRendererProps> = ({ component }) => {
    const { updateComponentProperty, layers } = useEditor();

    const handleUpdate = (propertyName: string) => (newValue: unknown) => {
        updateComponentProperty(component.id, propertyName, newValue);
    };

    return (
        <>
            <ListField
                propertyName="Layer"
                value={component.data?.layer}
                onUpdate={handleUpdate("layer")}
                defaultValue="Default"
                options={{
                    items: [
                        { value: "Default", label: "Default" },
                        ...layers.renderLayers.map((layer) => ({ value: layer, label: layer })),
                    ],
                }}
            />

            <ImageField propertyName="Image" value={component.data?.image} onUpdate={handleUpdate("image")} />

            <RectField
                propertyName="Slice"
                value={component.data?.slice}
                onUpdate={handleUpdate("slice")}
                options={{ setUndefinedWhenZero: true }}
            />

            <Vector2Field
                propertyName="Tiled"
                value={component.data?.tiled}
                onUpdate={handleUpdate("tiled")}
                defaultValue={{ x: 1, y: 1 }}
                options={{ minX: 1, minY: 1, step: 1 }}
            />

            <BooleanField
                propertyName="Flip Horizontally"
                value={component.data?.flipHorizontally}
                onUpdate={handleUpdate("flipHorizontally")}
            />

            <BooleanField
                propertyName="Flip Vertically"
                value={component.data?.flipVertically}
                onUpdate={handleUpdate("flipVertically")}
            />

            <BooleanField propertyName="Smooth" value={component.data?.smooth} onUpdate={handleUpdate("smooth")} />

            <NumberField
                propertyName="Opacity"
                value={component.data?.opacity}
                onUpdate={handleUpdate("opacity")}
                defaultValue={1}
                options={{ min: 0, max: 1, step: 0.01 }}
            />

            <ColorField
                propertyName="Tint Color"
                value={component.data?.tintColor}
                onUpdate={handleUpdate("tintColor")}
            />

            <ColorField
                propertyName="Mask Color"
                value={component.data?.maskColor}
                onUpdate={handleUpdate("maskColor")}
            />

            <NumberField
                propertyName="Mask Color Mix"
                value={component.data?.maskColorMix}
                onUpdate={handleUpdate("maskColorMix")}
                defaultValue={1}
                options={{ min: 0, max: 1, step: 0.01 }}
            />

            <Vector2Field propertyName="Offset" value={component.data?.offset} onUpdate={handleUpdate("offset")} />

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
                options={{ min: -2 * Math.PI, max: 2 * Math.PI, step: 0.03 }}
            />

            <NumberField
                propertyName="Width"
                value={component.data?.width}
                onUpdate={handleUpdate("width")}
                options={{ setUndefinedWhenZero: true }}
            />

            <NumberField
                propertyName="Height"
                value={component.data?.height}
                onUpdate={handleUpdate("height")}
                options={{ setUndefinedWhenZero: true }}
            />
        </>
    );
};

export default SpriteRenderer;
