import React, { useState } from "react";
import {
    X,
    Plus,
    Minus,
    Image,
    Type,
    Video,
    Square,
    Lightbulb,
    Moon,
    MousePointer,
    Move,
    Map,
    LayoutGrid,
    Circle,
    Hexagon,
    Film,
    Grid2X2,
} from "lucide-react";
import { BuiltInComponent } from "../../types/component";

interface ComponentDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (componentName: BuiltInComponent) => void;
}

const ComponentDialog: React.FC<ComponentDialogProps> = ({ isOpen, onClose, onSelect }) => {
    const [selectedComponent, setSelectedComponent] = useState<BuiltInComponent | null>(null);

    if (!isOpen) return null;

    const getComponentIcon = (componentName: BuiltInComponent) => {
        switch (componentName) {
            case BuiltInComponent.Transform:
                return <Move className="w-5 h-5" />;
            case BuiltInComponent.Camera:
                return <Video className="w-5 h-5" />;
            case BuiltInComponent.SpriteRenderer:
                return <Image className="w-5 h-5" />;
            case BuiltInComponent.TextRenderer:
                return <Type className="w-5 h-5" />;
            case BuiltInComponent.TilemapRenderer:
                return <LayoutGrid className="w-5 h-5" />;
            case BuiltInComponent.MaskRenderer:
                return <Square fill="currentColor" className="w-5 h-5" />;
            case BuiltInComponent.DarknessRenderer:
                return <Moon className="w-5 h-5" />;
            case BuiltInComponent.LightRenderer:
                return <Lightbulb className="w-5 h-5" />;
            case BuiltInComponent.VideoRenderer:
                return <Film className="w-5 h-5" />;
            case BuiltInComponent.Button:
                return <MousePointer className="w-5 h-5" />;
            case BuiltInComponent.TiledWrapper:
                return <Map className="w-5 h-5" />;
            case BuiltInComponent.BoxCollider:
                return <Square className="w-5 h-5" />;
            case BuiltInComponent.BallCollider:
                return <Circle className="w-5 h-5" />;
            case BuiltInComponent.PolygonCollider:
                return <Hexagon className="w-5 h-5" />;
            case BuiltInComponent.EdgeCollider:
                return <Minus className="w-5 h-5" />;
            case BuiltInComponent.TilemapCollider:
                return <Grid2X2 className="w-5 h-5" />;
            default:
                return null;
        }
    };

    const getComponentDescription = (componentName: BuiltInComponent) => {
        switch (componentName) {
            case BuiltInComponent.Transform:
                return "Position, rotation, and scale of the entity";
            case BuiltInComponent.Camera:
                return "Manages which layer is visible, zoom level and depth";
            case BuiltInComponent.SpriteRenderer:
                return "Renders a 2D sprite";
            case BuiltInComponent.TilemapRenderer:
                return "Renders tile-based maps";
            case BuiltInComponent.TextRenderer:
                return "Renders text";
            case BuiltInComponent.VideoRenderer:
                return "Renders video files";
            case BuiltInComponent.MaskRenderer:
                return "Renders a solid color shape";
            case BuiltInComponent.DarknessRenderer:
                return "Renders a darkness rectangle that can be illuminated by LightRenderer";
            case BuiltInComponent.LightRenderer:
                return "Renders a light source that can illuminate DarknessRenderer";
            case BuiltInComponent.Button:
                return "Creates a clickable area";
            case BuiltInComponent.TiledWrapper:
                return "Wrapper for Tiled map editor JSON export";
            case BuiltInComponent.TilemapCollider:
                return "Collision detection for tilemaps";
            case BuiltInComponent.EdgeCollider:
                return "Edge-based collision detection";
            case BuiltInComponent.BoxCollider:
                return "Box-shaped collision detection";
            case BuiltInComponent.BallCollider:
                return "Circular collision detection";
            case BuiltInComponent.PolygonCollider:
                return "Polygon-based collision detection";
            default:
                return "";
        }
    };

    const builtInComponents = Object.values(BuiltInComponent);

    const handleComponentSelect = (componentName: BuiltInComponent) => {
        onSelect(componentName);
        onClose();
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleBackdropClick}
        >
            <div className="bg-surface-primary dark:bg-surface-secondary border border-border-primary rounded-lg shadow-lg w-[600px] h-[600px] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border-primary">
                    <h2 className="text-lg font-semibold text-text-primary">Add Component</h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-surface-tertiary rounded transition-colors text-text-secondary hover:text-text-primary"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-2">
                        {builtInComponents.map((componentName) => (
                            <button
                                key={componentName}
                                onClick={() => setSelectedComponent(componentName)}
                                className={`w-full flex items-center space-x-3 p-1 rounded transition-colors text-left ${
                                    selectedComponent === componentName
                                        ? "bg-primary-100 dark:bg-primary-900 border border-primary-300 dark:border-primary-700"
                                        : "hover:bg-surface-tertiary border border-transparent"
                                }`}
                            >
                                <div className="flex-shrink-0 text-text-secondary">
                                    {getComponentIcon(componentName)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-text-primary">{componentName}</p>
                                    <p className="text-xs text-text-secondary">
                                        {getComponentDescription(componentName)}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-border-primary flex space-x-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 text-sm bg-surface-secondary dark:bg-surface-tertiary border border-border-primary rounded hover:bg-surface-tertiary dark:hover:bg-surface-quaternary transition-colors text-text-primary"
                    >
                        Cancel
                    </button>
                    {selectedComponent && (
                        <button
                            onClick={() => handleComponentSelect(selectedComponent)}
                            className="flex-1 px-4 py-2 text-sm bg-primary-600 hover:bg-primary-700 text-white rounded transition-colors flex items-center justify-center space-x-2"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Add Component</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ComponentDialog;
