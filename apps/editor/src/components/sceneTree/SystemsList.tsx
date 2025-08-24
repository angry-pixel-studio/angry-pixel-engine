import { useState } from "react";
import { Cpu, GripVertical, ChevronUp, ChevronDown } from "lucide-react";
import Icon from "../Icon";
import { useEditor } from "../../hooks/useEditor";
import { System } from "../../types/scene";

interface DragItem {
    index: number;
    id: string;
    type: string;
}

const SystemsList = () => {
    const { systemsMap, updateSystems } = useEditor();
    const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
    const [selectedSystemId, setSelectedSystemId] = useState<string | null>(null);

    const systemsArray = Array.from(systemsMap.values());

    const handleDragStart = (e: React.DragEvent, index: number, system: System) => {
        setDraggedItem({ index, id: system.id, type: "system" });
        e.dataTransfer.effectAllowed = "move";

        // Add visual feedback
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

    const handleDrop = (e: React.DragEvent, dropIndex: number) => {
        e.preventDefault();

        if (!draggedItem || draggedItem.type !== "system") return;

        const systems = [...systemsArray];
        const draggedSystem = systems[draggedItem.index];

        // Remove from original position
        systems.splice(draggedItem.index, 1);

        // Insert at new position
        systems.splice(dropIndex, 0, draggedSystem);

        // Update the scene with reordered systems
        updateSystems(systems);

        setDragOverIndex(null);
    };

    const handleDragEnter = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        setDragOverIndex(index);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        // Only clear if we're leaving the entire drop zone
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setDragOverIndex(null);
        }
    };

    const handleSystemSelect = (systemId: string) => {
        setSelectedSystemId(selectedSystemId === systemId ? null : systemId);
    };

    const moveSystemUp = () => {
        if (!selectedSystemId) return;

        const systems = [...systemsArray];
        const currentIndex = systems.findIndex((s: System) => s.id === selectedSystemId);

        if (currentIndex > 0) {
            // Swap with previous system
            [systems[currentIndex], systems[currentIndex - 1]] = [systems[currentIndex - 1], systems[currentIndex]];
            updateSystems(systems);
        }
    };

    const moveSystemDown = () => {
        if (!selectedSystemId) return;

        const systems = [...systemsArray];
        const currentIndex = systems.findIndex((s: System) => s.id === selectedSystemId);

        if (currentIndex < systems.length - 1) {
            // Swap with next system
            [systems[currentIndex], systems[currentIndex + 1]] = [systems[currentIndex + 1], systems[currentIndex]];
            updateSystems(systems);
        }
    };

    const canMoveUp = selectedSystemId && systemsArray.findIndex((s: System) => s.id === selectedSystemId) > 0;
    const canMoveDown =
        selectedSystemId && systemsArray.findIndex((s: System) => s.id === selectedSystemId) < systemsArray.length - 1;

    return (
        <div className="p-2">
            {/* Navigation buttons */}
            <div className="flex justify-center space-x-2 mb-3 mt-2">
                <button
                    onClick={moveSystemUp}
                    disabled={!canMoveUp}
                    className={`p-1.5 rounded-md transition-colors ${
                        canMoveUp
                            ? "bg-surface-secondary hover:bg-surface-tertiary text-text-primary"
                            : "bg-surface-tertiary text-text-tertiary cursor-not-allowed"
                    }`}
                    title="Move system up"
                >
                    <Icon icon={ChevronUp} size="xs" />
                </button>
                <button
                    onClick={moveSystemDown}
                    disabled={!canMoveDown}
                    className={`p-1.5 rounded-md transition-colors ${
                        canMoveDown
                            ? "bg-surface-secondary hover:bg-surface-tertiary text-text-primary"
                            : "bg-surface-secondary hover:bg-surface-tertiary text-text-primary"
                    }`}
                    title="Move system down"
                >
                    <Icon icon={ChevronDown} size="xs" />
                </button>
            </div>

            {/* Separator line */}
            <div className="border-t border-border-primary mb-3"></div>

            <div className="space-y-0.5">
                {systemsArray.map((system: System, index: number) => (
                    <div
                        key={system.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index, system)}
                        onDragEnd={handleDragEnd}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, index)}
                        onDragEnter={(e) => handleDragEnter(e, index)}
                        onDragLeave={handleDragLeave}
                        onClick={() => handleSystemSelect(system.id)}
                        className={`flex items-center px-2 py-1 hover:bg-surface-secondary cursor-move transition-colors ${
                            dragOverIndex === index ? "bg-surface-tertiary" : ""
                        } ${selectedSystemId === system.id ? "bg-primary-100 text-primary-700" : ""}`}
                    >
                        {/* Drag handle */}
                        <div className="mr-2 text-text-tertiary hover:text-text-secondary">
                            <Icon icon={GripVertical} size="sm" />
                        </div>

                        {/* System icon */}
                        <div className="mr-2">
                            <Icon
                                icon={Cpu}
                                size="sm"
                                className={system.enabled ? "text-text-primary" : "text-text-tertiary"}
                            />
                        </div>

                        {/* System name with lighter text */}
                        <span className="flex-1 text-sm truncate text-text-secondary">{system.name}</span>
                    </div>
                ))}
            </div>

            {systemsArray.length === 0 && (
                <div className="text-center text-text-tertiary py-4">
                    <div className="text-sm">No systems defined</div>
                    <div className="text-xs">Add systems to control game behavior</div>
                </div>
            )}
        </div>
    );
};

export default SystemsList;
