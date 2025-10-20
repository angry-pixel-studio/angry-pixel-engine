import { useCallback, useEffect, useState } from "react";
import { ChevronRight, ChevronDown, Box, Copy, Trash2, Plus, FileBox } from "lucide-react";
import Icon from "../ui/Icon";
import { useContextMenu } from "../../hooks/useContextMenu";
import { EntityWithChildren, EntityWithParent } from "../../types/scene";
import { ContextMenuItem } from "../../types/contextMenu";
import { v4 as uuid } from "uuid";
import { useSceneStore } from "../../stores/sceneStore";
import { BuiltInComponent } from "../../types/component";
import { defaultValues } from "../../utils/builtInComponent/defaultValues";
import { useEditorStore } from "../../stores/editorStore";

type EntityTreeItemProps = {
    entity: EntityWithChildren;
    level?: number;
    onAddChild: (parentId?: string) => () => void;
    onDuplicate: (entityId: string) => () => void;
};

const EntityTreeItem = ({ entity, level = 0, onAddChild, onDuplicate }: EntityTreeItemProps) => {
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
                onClick: onDuplicate(entity.id),
            },
            {
                id: "separator1",
                separator: true,
            },
            {
                id: "add-child",
                label: "Add Child",
                icon: <Icon icon={Plus} size="sm" />,
                onClick: onAddChild(entity.id),
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
                        <EntityTreeItem
                            key={child.id}
                            entity={child as EntityWithChildren}
                            level={level + 1}
                            onAddChild={onAddChild}
                            onDuplicate={onDuplicate}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const EntityTree = () => {
    const { entitiesMap, addEntity, componentsMap } = useSceneStore();
    const [tree, setTree] = useState<EntityWithChildren[]>([]);
    const { showContextMenu } = useContextMenu();

    const buildTree = useCallback(() => {
        const entities = Array.from(entitiesMap.values());

        const buildEntityTree = (parentId: string | null): EntityWithChildren[] => {
            return entities
                .filter((entity) => entity.parent === parentId)
                .map((entity) => ({
                    id: entity.id,
                    name: entity.name,
                    enabled: entity.enabled,
                    children: buildEntityTree(entity.id),
                }));
        };

        setTree(buildEntityTree(null));
    }, [entitiesMap]);

    useEffect(() => {
        buildTree();
    }, [buildTree, entitiesMap]);

    const handleAddEntity = (parentId?: string) => () => {
        addEntity(
            {
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
            },
            parentId,
        );
    };

    const handleDuplicateEntity = (entityId: string) => () => {
        const entity = entitiesMap.get(entityId);
        if (!entity) return;

        const entities = Array.from(entitiesMap.values());
        // TODO: allow duplicate entities with children
        if (entities.filter((e) => e.parent === entity.id).length > 0) return;

        const createCopy = (entity: EntityWithParent, parentId?: string) => {
            const id = uuid();

            addEntity(
                {
                    id,
                    name: `${entity.name} (Copy)`,
                    enabled: entity.enabled,
                    components: (componentsMap.get(entity.id) ?? []).map((component) => ({
                        ...component,
                        id: uuid(),
                        data: { ...component.data },
                    })),
                },
                parentId,
            );
        };

        createCopy(entity, entity.parent ?? undefined);
    };

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const contextMenuItems: ContextMenuItem[] = [
            {
                id: "add-entity",
                label: "Add Entity",
                icon: <Icon icon={Plus} size="sm" />,
                onClick: handleAddEntity(),
            },
        ];

        showContextMenu(contextMenuItems, { x: e.clientX, y: e.clientY });
    };

    return (
        <div className="p-2 my-2 h-full" onContextMenu={handleContextMenu}>
            <div className="space-y-0.5">
                {tree.map((entity) => (
                    <EntityTreeItem
                        key={entity.id}
                        entity={entity}
                        onAddChild={handleAddEntity}
                        onDuplicate={handleDuplicateEntity}
                    />
                ))}
            </div>
        </div>
    );
};

export default EntityTree;
