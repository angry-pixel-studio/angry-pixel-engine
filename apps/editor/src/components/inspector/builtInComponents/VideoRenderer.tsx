import React from "react";
import { BuiltInComponentProps } from "../../../types/component";
import VideoField from "../propertyField/VideoField";
import NumberField from "../propertyField/NumberField";
import Vector2Field from "../propertyField/Vector2Field";
import BooleanField from "../propertyField/BooleanField";
import ColorField from "../propertyField/ColorField";
import RectField from "../propertyField/RectField";
import ListField from "../propertyField/ListField";
import { useEditorStore } from "../../../stores/editorStore";

const VideoRenderer: React.FC<BuiltInComponentProps> = ({ component, onUpdate }) => {
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

            <VideoField propertyName="Video" value={component.data?.video} onUpdate={onUpdate("video")} />

            <NumberField
                propertyName="Width"
                value={component.data?.width}
                onUpdate={onUpdate("width")}
                options={{ min: 0, step: 1 }}
            />

            <NumberField
                propertyName="Height"
                value={component.data?.height}
                onUpdate={onUpdate("height")}
                options={{ min: 0, step: 1 }}
            />

            <Vector2Field
                propertyName="Offset"
                value={component.data?.offset}
                onUpdate={onUpdate("offset")}
                defaultValue={{ x: 0, y: 0 }}
            />

            <BooleanField
                propertyName="Flip Horizontally"
                value={component.data?.flipHorizontally}
                onUpdate={onUpdate("flipHorizontally")}
                defaultValue={false}
            />

            <BooleanField
                propertyName="Flip Vertically"
                value={component.data?.flipVertically}
                onUpdate={onUpdate("flipVertically")}
                defaultValue={false}
            />

            <NumberField
                propertyName="Rotation"
                value={component.data?.rotation}
                onUpdate={onUpdate("rotation")}
                defaultValue={0}
                options={{ min: -2 * Math.PI, max: 2 * Math.PI, step: 0.03 }}
            />

            <NumberField
                propertyName="Opacity"
                value={component.data?.opacity}
                onUpdate={onUpdate("opacity")}
                defaultValue={1}
                options={{ min: 0, max: 1, step: 0.01 }}
            />

            <ColorField propertyName="Mask Color" value={component.data?.maskColor} onUpdate={onUpdate("maskColor")} />

            <NumberField
                propertyName="Mask Color Mix"
                value={component.data?.maskColorMix}
                onUpdate={onUpdate("maskColorMix")}
                defaultValue={0}
                options={{ min: 0, max: 1, step: 0.01 }}
            />

            <ColorField propertyName="Tint Color" value={component.data?.tintColor} onUpdate={onUpdate("tintColor")} />

            <RectField
                propertyName="Slice"
                value={component.data?.slice}
                onUpdate={onUpdate("slice")}
                options={{ setUndefinedWhenZero: true }}
            />

            <NumberField
                propertyName="Volume"
                value={component.data?.volume}
                onUpdate={onUpdate("volume")}
                defaultValue={1}
                options={{ min: 0, max: 1, step: 0.01 }}
            />

            <BooleanField
                propertyName="Loop"
                value={component.data?.loop}
                onUpdate={onUpdate("loop")}
                defaultValue={false}
            />

            <BooleanField
                propertyName="Fixed To Time Scale"
                value={component.data?.fixedToTimeScale}
                onUpdate={onUpdate("fixedToTimeScale")}
                defaultValue={false}
            />

            <ListField
                propertyName="Action"
                value={component.data?.action}
                onUpdate={onUpdate("action")}
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
