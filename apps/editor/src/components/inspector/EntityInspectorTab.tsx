import { FileText, Plus } from "lucide-react";
import Icon from "../ui/Icon";
import { useEditor } from "../../hooks/useEditor";
import EntityName from "./EntityName";
import ComponentItem from "./ComponentItem";
import ComponentDialog from "../ui/ComponentDialog";
import { useState } from "react";
import { BuiltInComponent } from "../../types/component";

const EntityInspectorTab = () => {
    const { selectedEntity, entityInspector, addComponent } = useEditor();
    const [isComponentDialogOpen, setIsComponentDialogOpen] = useState(false);

    const handleAddComponent = () => {
        setIsComponentDialogOpen(true);
    };

    const handleComponentSelect = (componentName: BuiltInComponent) => {
        addComponent(componentName);
        setIsComponentDialogOpen(false);
    };

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

            {/* Add Component Button */}
            <div className="p-4 border-t border-border-primary flex-shrink-0">
                <button
                    onClick={handleAddComponent}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm bg-primary-600 hover:bg-primary-700 text-white rounded transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Component</span>
                </button>
            </div>

            {/* Component Dialog */}
            <ComponentDialog
                isOpen={isComponentDialogOpen}
                onClose={() => setIsComponentDialogOpen(false)}
                onSelect={handleComponentSelect}
            />
        </div>
    );
};

export default EntityInspectorTab;
