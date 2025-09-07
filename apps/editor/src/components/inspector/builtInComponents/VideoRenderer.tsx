import React from "react";
import { EntityComponent } from "../../../types/scene";
import { useEditor } from "../../../hooks/useEditor";
import VideoField from "../propertyField/VideoField";
import NumberField from "../propertyField/NumberField";
import Vector2Field from "../propertyField/Vector2Field";
import BooleanField from "../propertyField/BooleanField";
import ColorField from "../propertyField/ColorField";
import StringField from "../propertyField/StringField";
import RectField from "../propertyField/RectField";
import ListField from "../propertyField/ListField";

interface VideoRendererProps {
    component: EntityComponent;
}

const VideoRenderer: React.FC<VideoRendererProps> = ({ component }) => {
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

            <VideoField propertyName="Video" value={component.data?.video} onUpdate={handleUpdate("video")} />

            <NumberField
                propertyName="Width"
                value={component.data?.width}
                onUpdate={handleUpdate("width")}
                options={{ min: 0, step: 1 }}
            />

            <NumberField
                propertyName="Height"
                value={component.data?.height}
                onUpdate={handleUpdate("height")}
                options={{ min: 0, step: 1 }}
            />

            <Vector2Field
                propertyName="Offset"
                value={component.data?.offset}
                onUpdate={handleUpdate("offset")}
                defaultValue={{ x: 0, y: 0 }}
            />

            <BooleanField
                propertyName="Flip Horizontally"
                value={component.data?.flipHorizontally}
                onUpdate={handleUpdate("flipHorizontally")}
                defaultValue={false}
            />

            <BooleanField
                propertyName="Flip Vertically"
                value={component.data?.flipVertically}
                onUpdate={handleUpdate("flipVertically")}
                defaultValue={false}
            />

            <NumberField
                propertyName="Rotation"
                value={component.data?.rotation}
                onUpdate={handleUpdate("rotation")}
                defaultValue={0}
                options={{ min: -2 * Math.PI, max: 2 * Math.PI, step: 0.03 }}
            />

            <NumberField
                propertyName="Opacity"
                value={component.data?.opacity}
                onUpdate={handleUpdate("opacity")}
                defaultValue={1}
                options={{ min: 0, max: 1, step: 0.01 }}
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
                defaultValue={0}
                options={{ min: 0, max: 1, step: 0.01 }}
            />

            <ColorField
                propertyName="Tint Color"
                value={component.data?.tintColor}
                onUpdate={handleUpdate("tintColor")}
            />

            <RectField
                propertyName="Slice"
                value={component.data?.slice}
                onUpdate={handleUpdate("slice")}
                options={{ setUndefinedWhenZero: true }}
            />

            <NumberField
                propertyName="Volume"
                value={component.data?.volume}
                onUpdate={handleUpdate("volume")}
                defaultValue={1}
                options={{ min: 0, max: 1, step: 0.01 }}
            />

            <BooleanField
                propertyName="Loop"
                value={component.data?.loop}
                onUpdate={handleUpdate("loop")}
                defaultValue={false}
            />

            <BooleanField
                propertyName="Fixed To Time Scale"
                value={component.data?.fixedToTimeScale}
                onUpdate={handleUpdate("fixedToTimeScale")}
                defaultValue={false}
            />

            <ListField
                propertyName="Action"
                value={component.data?.action}
                onUpdate={handleUpdate("action")}
                defaultValue="play"
                options={{
                    items: [
                        { value: "play", label: "Play" },
                        { value: "pause", label: "Pause" },
                        { value: "stop", label: "Stop" },
                    ],
                }}
            />
        </>
    );
};

export default VideoRenderer;
