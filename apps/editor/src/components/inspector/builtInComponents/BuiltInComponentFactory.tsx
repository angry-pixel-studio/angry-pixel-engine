import React from "react";
import { EntityComponent } from "../../../types/scene";
import { BuiltInComponent } from "../../../types/component";
import Transform from "./Transform";
import Camera from "./Camera";
import SpriteRenderer from "./SpriteRenderer";
import TextRenderer from "./TextRenderer";
import TilemapRenderer from "./TilemapRenderer";
import VideoRenderer from "./VideoRenderer";
import MaskRenderer from "./MaskRenderer";
import LightRenderer from "./LightRenderer";
import DarknessRenderer from "./DarknessRenderer";
import { useSceneStore } from "../../../stores/sceneStore";
import { useEditorStore } from "../../../stores/editorStore";

interface BuiltInComponentFactoryProps {
    component: EntityComponent;
}

const BuiltInComponentFactory: React.FC<BuiltInComponentFactoryProps> = ({ component }) => {
    const componentName = component.name as BuiltInComponent;
    const { selectedEntityId } = useEditorStore();
    const { updateComponentData: updateComponent } = useSceneStore();

    const handleUpdate = (propertyName: string) => (newValue: unknown) => {
        updateComponent(selectedEntityId as string, component.id, { [propertyName]: newValue });
    };

    switch (componentName) {
        case BuiltInComponent.Transform:
            return <Transform component={component} onUpdate={handleUpdate} />;

        case BuiltInComponent.Camera:
            return <Camera component={component} onUpdate={handleUpdate} />;

        case BuiltInComponent.SpriteRenderer:
            return <SpriteRenderer component={component} onUpdate={handleUpdate} />;

        case BuiltInComponent.TextRenderer:
            return <TextRenderer component={component} onUpdate={handleUpdate} />;

        case BuiltInComponent.TilemapRenderer:
            return <TilemapRenderer component={component} onUpdate={handleUpdate} />;

        case BuiltInComponent.VideoRenderer:
            return <VideoRenderer component={component} onUpdate={handleUpdate} />;

        case BuiltInComponent.MaskRenderer:
            return <MaskRenderer component={component} onUpdate={handleUpdate} />;

        case BuiltInComponent.LightRenderer:
            return <LightRenderer component={component} onUpdate={handleUpdate} />;

        case BuiltInComponent.DarknessRenderer:
            return <DarknessRenderer component={component} onUpdate={handleUpdate} />;

        default:
            // TODO: remove when all components are implemented
            console.warn(`Unknown built-in component: ${componentName}`);
            return (
                <div className="p-2 text-sm text-text-secondary bg-surface-secondary rounded">
                    Unknown component: {componentName}
                </div>
            );
    }
};

export default BuiltInComponentFactory;
