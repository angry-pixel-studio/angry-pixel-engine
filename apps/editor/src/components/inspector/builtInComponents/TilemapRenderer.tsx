import React from "react";
import { BuiltInComponentProps } from "../../../types/component";
import { useEditorStore } from "../../../stores/editorStore";
import ButtonField from "../propertyField/ButtonField";
import ListField from "../propertyField/ListField";
import NumberField from "../propertyField/NumberField";
import ColorField from "../propertyField/ColorField";
import BooleanField from "../propertyField/BooleanField";

const TilemapRenderer: React.FC<BuiltInComponentProps> = ({ component, onUpdate }) => {
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

            <ButtonField
                propertyName="Tileset"
                value={component.data?.tileset}
                onUpdate={onUpdate("tileset")}
                options={{ buttonLabel: "Edit" }}
            />

            <ButtonField
                propertyName="Tilemap"
                value={component.data?.data}
                onUpdate={onUpdate("data")}
                options={{ buttonLabel: "Edit" }}
            />

            <NumberField
                propertyName="Tile Width"
                value={component.data?.tileWidth}
                onUpdate={onUpdate("tileWidth")}
                options={{ min: 0 }}
            />

            <NumberField
                propertyName="Tile Height"
                value={component.data?.tileHeight}
                onUpdate={onUpdate("tileHeight")}
                options={{ min: 0 }}
            />

            <ColorField
                propertyName="Tint Color"
                value={component.data?.tintColor}
                onUpdate={onUpdate("tintColor")}
                defaultValue="#FFFFFF"
            />

            <ColorField
                propertyName="Mask Color"
                value={component.data?.maskColor}
                onUpdate={onUpdate("maskColor")}
                defaultValue="#FFFFFF"
            />

            <NumberField
                propertyName="Mask Color Mix"
                value={component.data?.maskColorMix}
                onUpdate={onUpdate("maskColorMix")}
                options={{ min: 0, max: 1, step: 0.01 }}
            />

            <NumberField
                propertyName="Opacity"
                value={component.data?.opacity}
                onUpdate={onUpdate("opacity")}
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

export default TilemapRenderer;
