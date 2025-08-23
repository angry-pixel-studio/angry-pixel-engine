import { FileText } from "lucide-react";
import Icon from "../Icon";
import { useEditor } from "../../hooks/useEditor";
import EntityName from "./EntityName";
import ComponentItem from "./ComponentItem";

const EntityInspectorTab = () => {
    const { selectedEntity, entityInspector } = useEditor();

    if (!selectedEntity) {
        return (
            <div className="p-4">
                <div className="text-center text-text-secondary">
                    <div className="mb-2 flex justify-center">
                        <Icon icon={FileText} size="2xl" variant="primary" />
                    </div>
                    <div className="text-sm font-medium">No Entity Selected</div>
                    <div className="text-xs">Select an entity to view its components</div>
                </div>
            </div>
        );
    }

    const components = Array.from(entityInspector.components.values());
    const hasComponents = components.length > 0;

    return (
        <div className="h-full flex flex-col">
            {/* Fixed header with entity name */}
            <div className="p-4 border-b border-border-primary flex-shrink-0 bg-surface-primary min-w-0 overflow-x-hidden">
                <EntityName entity={selectedEntity} />
            </div>

            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden inspector-scroll min-w-0">
                {hasComponents ? (
                    <div className="p-4 space-y-3 min-w-0">
                        {components.map((component) => (
                            <ComponentItem key={component.id} component={component} />
                        ))}
                    </div>
                ) : (
                    <div className="p-4 text-center text-text-secondary min-w-0">
                        <div className="text-sm">No components found</div>
                        <div className="text-xs">This entity has no components</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EntityInspectorTab;
