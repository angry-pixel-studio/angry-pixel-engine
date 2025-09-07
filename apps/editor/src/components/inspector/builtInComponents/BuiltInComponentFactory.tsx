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

interface BuiltInComponentFactoryProps {
    component: EntityComponent;
}

const BuiltInComponentFactory: React.FC<BuiltInComponentFactoryProps> = ({ component }) => {
    const componentName = component.name as BuiltInComponent;

    switch (componentName) {
        case BuiltInComponent.Transform:
            return <Transform component={component} />;

        case BuiltInComponent.Camera:
            return <Camera component={component} />;

        case BuiltInComponent.SpriteRenderer:
            return <SpriteRenderer component={component} />;

        case BuiltInComponent.TextRenderer:
            return <TextRenderer component={component} />;

        case BuiltInComponent.TilemapRenderer:
            return <TilemapRenderer component={component} />;

        case BuiltInComponent.VideoRenderer:
            return <VideoRenderer component={component} />;

        case BuiltInComponent.MaskRenderer:
            return <MaskRenderer component={component} />;

        case BuiltInComponent.LightRenderer:
            return <LightRenderer component={component} />;

        case BuiltInComponent.DarknessRenderer:
            return <DarknessRenderer component={component} />;

        default:
            // Fallback for unknown component types
            console.warn(`Unknown built-in component: ${componentName}`);
            return (
                <div className="p-2 text-sm text-text-secondary bg-surface-secondary rounded">
                    Unknown component: {componentName}
                </div>
            );
    }
};

export default BuiltInComponentFactory;
