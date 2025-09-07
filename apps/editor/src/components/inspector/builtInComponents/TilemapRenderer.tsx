import React from "react";
import { EntityComponent } from "../../../types/scene";
import { useEditor } from "../../../hooks/useEditor";
import ButtonField from "../propertyField/ButtonField";
import ListField from "../propertyField/ListField";
import NumberField from "../propertyField/NumberField";
import ColorField from "../propertyField/ColorField";
import BooleanField from "../propertyField/BooleanField";

interface TilemapRendererProps {
    component: EntityComponent;
}

const TilemapRenderer: React.FC<TilemapRendererProps> = ({ component }) => {
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

            <ButtonField
                propertyName="Tileset"
                value={component.data?.tileset}
                onUpdate={handleUpdate("tileset")}
                options={{ buttonLabel: "Edit" }}
            />

            <ButtonField
                propertyName="Tilemap"
                value={component.data?.data}
                onUpdate={handleUpdate("data")}
                options={{ buttonLabel: "Edit" }}
            />

            <NumberField
                propertyName="Tile Width"
                value={component.data?.tileWidth}
                onUpdate={handleUpdate("tileWidth")}
                options={{ min: 0 }}
            />

            <NumberField
                propertyName="Tile Height"
                value={component.data?.tileHeight}
                onUpdate={handleUpdate("tileHeight")}
                options={{ min: 0 }}
            />

            <ColorField
                propertyName="Tint Color"
                value={component.data?.tintColor}
                onUpdate={handleUpdate("tintColor")}
                defaultValue="#FFFFFF"
            />

            <ColorField
                propertyName="Mask Color"
                value={component.data?.maskColor}
                onUpdate={handleUpdate("maskColor")}
                defaultValue="#FFFFFF"
            />

            <NumberField
                propertyName="Mask Color Mix"
                value={component.data?.maskColorMix}
                onUpdate={handleUpdate("maskColorMix")}
                options={{ min: 0, max: 1, step: 0.01 }}
            />

            <NumberField
                propertyName="Opacity"
                value={component.data?.opacity}
                onUpdate={handleUpdate("opacity")}
                defaultValue={1}
                options={{ min: 0, max: 1, step: 0.01 }}
            />

            <BooleanField
                propertyName="Smooth"
                value={component.data?.smooth}
                onUpdate={handleUpdate("smooth")}
                defaultValue={false}
            />
        </>
    );
};

export default TilemapRenderer;
