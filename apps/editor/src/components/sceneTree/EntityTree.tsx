import { useCallback, useEffect, useState } from "react";
import { ChevronRight, ChevronDown, Box, Copy, Trash2, Plus, FileBox } from "lucide-react";
import Icon from "../ui/Icon";
import { useContextMenu } from "../../hooks/useContextMenu";
import { EntityWithChildren } from "../../types/scene";
import { ContextMenuItem } from "../../types/contextMenu";
import { v4 as uuid } from "uuid";
import { useSceneStore } from "../../stores/sceneStore";
import { BuiltInComponent } from "../../types/component";
import { defaultValues } from "../../utils/builtInComponent/defaultValues";
import { useEditorStore } from "../../stores/editorStore";

const EntityTreeItem = ({ entity, level = 0 }: { entity: EntityWithChildren; level?: number }) => {
    const { selectedEntityId, selectEntity } = useEditorStore();
    const { deleteEntity } = useSceneStore();
    const { showContextMenu } = useContextMenu();
    const [isExpanded, setIsExpanded] = useState(false);
    const hasChildren = entity.children && entity.children.length > 0;
    const isSelected = selectedEntityId === entity.id;

    const handleToggle = () => {
        if (hasChildren) {
            setIsExpanded(!isExpanded);
        }
    };

    const handleSelect = () => {
        selectEntity(entity);
    };

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        selectEntity(entity);

        const contextMenuItems: ContextMenuItem[] = [
            {
                id: "duplicate",
                label: "Duplicate",
                icon: <Icon icon={Copy} size="sm" />,
                onClick: () => {},
            },
            {
                id: "separator1",
                separator: true,
            },
            {
                id: "add-child",
                label: "Add Child",
                icon: <Icon icon={Plus} size="sm" />,
                onClick: () => {},
            },
            {
                id: "separator2",
                separator: true,
            },
            {
                id: "create-archetype",
                label: "Create Archetype",
                icon: <Icon icon={FileBox} size="sm" />,
                onClick: () => {},
            },
            {
                id: "separator3",
                separator: true,
            },
            {
                id: "delete",
                label: "Delete",
                icon: <Icon icon={Trash2} size="sm" />,
                onClick: () => {
                    deleteEntity(entity.id);
                },
            },
        ];

        showContextMenu(contextMenuItems, { x: e.clientX, y: e.clientY });
    };

    return (
        <div className="w-full">
            <div
                className={`flex items-center px-2 hover:bg-surface-secondary cursor-pointer transition-colors ${
                    isSelected ? "bg-primary-100 text-primary-700" : ""
                } ${!entity.enabled ? "opacity-50 text-text-tertiary" : ""}`}
                style={{ paddingLeft: `${level * 16 + 8}px` }}
                onContextMenu={handleContextMenu}
                onClick={handleSelect}
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

                <div className="flex items-center">
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
                        <EntityTreeItem key={child.id} entity={child as EntityWithChildren} level={level + 1} />
                    ))}
                </div>
            )}
        </div>
    );
};

const EntityTree = () => {
    const { entitiesMap, addEntity } = useSceneStore();
    const [tree, setTree] = useState<EntityWithChildren[]>([]);
    const { showContextMenu } = useContextMenu();

    const buildTree = useCallback(() => {
        const tree = Array.from(entitiesMap.values())
            .sort((a, b) => a.level - b.level)
            .reduce((acc, entity) => {
                if (entity.parent === null) {
                    acc.push({
                        id: entity.id,
                        name: entity.name,
                        enabled: entity.enabled,
                        children: [],
                    });
                } else {
                    const parent = acc.find((e) => e.id === entity.parent);
                    if (parent) {
                        parent.children.push({
                            id: entity.id,
                            name: entity.name,
                            enabled: entity.enabled,
                            children: [],
                        });
                    }
                }
                return acc;
            }, [] as EntityWithChildren[]);

        setTree(tree);
    }, [entitiesMap]);

    useEffect(() => {
        buildTree();
    }, [buildTree]);

    const handleAddEntity = () => {
        addEntity({
            id: uuid(),
            name: "New Entity",
            enabled: true,
            components: [
                {
                    enabled: true,
                    id: uuid(),
                    name: BuiltInComponent.Transform,
                    data: defaultValues[BuiltInComponent.Transform] as Record<string, unknown>,
                    builtIn: true,
                },
            ],
        });
    };

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const contextMenuItems: ContextMenuItem[] = [
            {
                id: "add-entity",
                label: "Add Entity",
                icon: <Icon icon={Plus} size="sm" />,
                onClick: handleAddEntity,
            },
        ];

        showContextMenu(contextMenuItems, { x: e.clientX, y: e.clientY });
    };

    return (
        <div className="p-2 my-2 h-full" onContextMenu={handleContextMenu}>
            <div className="space-y-0.5">
                {tree.map((entity) => (
                    <EntityTreeItem key={entity.id} entity={entity} />
                ))}
            </div>
        </div>
    );
};

export default EntityTree;
