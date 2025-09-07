import { useState } from "react";
import { GripVertical, Plus, X, Eye, Shield, LucideIcon } from "lucide-react";
import Icon from "../ui/Icon";
import { useEditorStore } from "../../stores/editorStore";

interface DragItem {
    index: number;
    id: string;
    type: "render" | "collision";
}

const LayersTab = () => {
    const { layers, setRenderLayers, setCollisionLayers } = useEditorStore();
    const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
    const [editingIndex, setEditingIndex] = useState<{ type: "render" | "collision"; index: number } | null>(null);
    const [editingValue, setEditingValue] = useState("");

    const handleDragStart = (e: React.DragEvent, index: number, type: "render" | "collision") => {
        setDraggedItem({ index, id: `${type}-${index}`, type });
        e.dataTransfer.effectAllowed = "move";

        if (e.currentTarget) {
            (e.currentTarget as HTMLElement).style.opacity = "0.5";
        }
    };

    const handleDragEnd = (e: React.DragEvent) => {
        setDraggedItem(null);
        setDragOverIndex(null);
        if (e.currentTarget) {
            (e.currentTarget as HTMLElement).style.opacity = "1";
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    const handleDrop = (e: React.DragEvent, dropIndex: number, targetType: "render" | "collision") => {
        e.preventDefault();

        if (!draggedItem || draggedItem.type !== targetType) return;

        const currentLayers = targetType === "render" ? layers.renderLayers : layers.collisionLayers;
        const newLayers = [...currentLayers];
        const draggedLayer = newLayers[draggedItem.index];

        newLayers.splice(draggedItem.index, 1);
        newLayers.splice(dropIndex, 0, draggedLayer);

        if (targetType === "render") {
            setRenderLayers(newLayers);
        } else {
            setCollisionLayers(newLayers);
        }

        setDragOverIndex(null);
    };

    const handleDragEnter = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        setDragOverIndex(index);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOverIndex(null);
    };

    const handleAddLayer = (type: "render" | "collision") => {
        const newLayer = `Layer ${(type === "render" ? layers.renderLayers : layers.collisionLayers).length + 1}`;
        if (type === "render") {
            setRenderLayers([...layers.renderLayers, newLayer]);
        } else {
            setCollisionLayers([...layers.collisionLayers, newLayer]);
        }
    };

    const handleRemoveLayer = (index: number, type: "render" | "collision") => {
        if (type === "render") {
            const newLayers = layers.renderLayers.filter((_, i) => i !== index);
            setRenderLayers(newLayers);
        } else {
            const newLayers = layers.collisionLayers.filter((_, i) => i !== index);
            setCollisionLayers(newLayers);
        }
    };

    const handleStartEdit = (index: number, type: "render" | "collision") => {
        const currentLayers = type === "render" ? layers.renderLayers : layers.collisionLayers;
        setEditingIndex({ type, index });
        setEditingValue(currentLayers[index]);
    };

    const handleSaveEdit = () => {
        if (!editingIndex || !editingValue.trim()) return;

        const { type, index } = editingIndex;
        const currentLayers = type === "render" ? layers.renderLayers : layers.collisionLayers;
        const newLayers = [...currentLayers];
        newLayers[index] = editingValue.trim();

        if (type === "render") {
            setRenderLayers(newLayers);
        } else {
            setCollisionLayers(newLayers);
        }

        setEditingIndex(null);
        setEditingValue("");
    };

    const handleCancelEdit = () => {
        setEditingIndex(null);
        setEditingValue("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSaveEdit();
        } else if (e.key === "Escape") {
            handleCancelEdit();
        }
    };

    const renderLayerList = (type: "render" | "collision", layers: string[], icon: LucideIcon) => {
        return (
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Icon icon={icon} size="sm" className="text-text-secondary" />
                        <span className="text-sm font-medium text-text-primary">
                            {type === "render" ? "Render Layers" : "Collision Layers"}
                        </span>
                    </div>
                    <button
                        onClick={() => handleAddLayer(type)}
                        className="p-1 text-accent-success hover:bg-surface-tertiary rounded transition-colors"
                        title={`Add ${type} layer`}
                    >
                        <Icon icon={Plus} size="xs" />
                    </button>
                </div>

                <div className="space-y-1">
                    {layers.map((layer, index) => (
                        <div
                            key={`${type}-${index}`}
                            draggable
                            onDragStart={(e) => handleDragStart(e, index, type)}
                            onDragEnd={handleDragEnd}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, index, type)}
                            onDragEnter={(e) => handleDragEnter(e, index)}
                            onDragLeave={handleDragLeave}
                            className={`flex items-center px-2 py-1 hover:bg-surface-secondary cursor-move transition-colors rounded ${
                                dragOverIndex === index ? "bg-surface-tertiary" : ""
                            }`}
                        >
                            {/* Drag handle */}
                            <div className="mr-2 text-text-tertiary hover:text-text-secondary">
                                <Icon icon={GripVertical} size="sm" />
                            </div>

                            {/* Layer content */}
                            <div className="flex-1">
                                {editingIndex?.type === type && editingIndex?.index === index ? (
                                    <input
                                        type="text"
                                        value={editingValue}
                                        onChange={(e) => setEditingValue(e.target.value)}
                                        onBlur={handleSaveEdit}
                                        onKeyDown={handleKeyDown}
                                        className="w-full text-xs bg-white dark:bg-surface-secondary border border-border-primary rounded px-2 py-1 focus:outline-none focus:border-primary-300 text-text-primary"
                                        autoFocus
                                    />
                                ) : (
                                    <span
                                        className="text-sm text-text-secondary cursor-pointer hover:text-text-primary"
                                        onClick={() => handleStartEdit(index, type)}
                                    >
                                        {layer}
                                    </span>
                                )}
                            </div>

                            {/* Remove button */}
                            <button
                                onClick={() => handleRemoveLayer(index, type)}
                                className="p-1 text-accent-error hover:bg-surface-tertiary rounded transition-colors"
                                title="Remove layer"
                            >
                                <Icon icon={X} size="xs" />
                            </button>
                        </div>
                    ))}

                    {layers.length === 0 && (
                        <div className="text-center py-4 text-text-tertiary text-sm">No {type} layers defined</div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="p-4 space-y-6 h-full overflow-y-auto">
            {renderLayerList("render", layers.renderLayers, Eye)}
            <div className="border-t border-border-primary"></div>
            {renderLayerList("collision", layers.collisionLayers, Shield)}
        </div>
    );
};

export default LayersTab;
