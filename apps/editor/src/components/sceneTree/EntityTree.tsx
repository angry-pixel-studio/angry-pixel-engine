import { useState } from "react";
import { ChevronRight, ChevronDown, Box } from "lucide-react";
import Icon from "../Icon";
import { useEditor } from "../../hooks/useEditor";
import { EntityWithComponentsAndChildren } from "../../types/scene";

// Component to render a single entity in the tree
const EntityTreeItem = ({ entity, level = 0 }: { entity: EntityWithComponentsAndChildren; level?: number }) => {
    const { selectedEntity, selectEntity } = useEditor();
    const [isExpanded, setIsExpanded] = useState(false);
    const hasChildren = entity.children && entity.children.length > 0;
    const isSelected = selectedEntity?.id === entity.id;

    const handleToggle = () => {
        if (hasChildren) {
            setIsExpanded(!isExpanded);
        }
    };

    const handleSelect = () => {
        selectEntity(entity);
    };

    return (
        <div className="w-full">
            <div
                className={`flex items-center px-2 hover:bg-surface-secondary cursor-pointer transition-colors ${
                    isSelected ? "bg-primary-100 text-primary-700" : ""
                } ${!entity.enabled ? "opacity-50 text-text-tertiary" : ""}`}
                style={{ paddingLeft: `${level * 16 + 8}px` }}
            >
                {hasChildren && (
                    <button onClick={handleToggle} className="mr-1 p-1 hover:bg-surface-tertiary rounded">
                        <Icon
                            icon={isExpanded ? ChevronDown : ChevronRight}
                            size="sm"
                            className="text-text-secondary"
                        />
                    </button>
                )}
                {!hasChildren && <div className="w-6 mr-1" />}

                <div onClick={handleSelect} className="flex items-center">
                    <Icon
                        icon={Box}
                        size="sm"
                        className={`mr-1 ${entity.enabled ? "text-text-primary" : "text-text-tertiary"}`}
                    />

                    <span className="flex-1 text-sm truncate text-text-secondary">{entity.name}</span>
                </div>
            </div>

            {hasChildren && isExpanded && (
                <div className="w-full">
                    {entity.children!.map((child) => (
                        <EntityTreeItem key={child.id} entity={child} level={level + 1} />
                    ))}
                </div>
            )}
        </div>
    );
};

const EntityTree = () => {
    const { scene } = useEditor();

    return (
        <div className="p-2 my-2">
            <div className="space-y-0.5">
                {scene.entities.map((entity) => (
                    <EntityTreeItem key={entity.id} entity={entity} />
                ))}
            </div>
        </div>
    );
};

export default EntityTree;
