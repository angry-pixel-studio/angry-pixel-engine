import { FileText } from "lucide-react";
import Icon from "../Icon";
import { useEditor } from "../../hooks/useEditor";
import EntityName from "./EntityName";
import ComponentItem from "./ComponentItem";

const EntityInspectorTab = () => {
    const { selectedEntity } = useEditor();

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

    return (
        <div className="p-4">
            <div className="mb-4">
                <EntityName entity={selectedEntity} />
            </div>

            <div className="space-y-3">
                {selectedEntity.components.map((component) => (
                    <ComponentItem key={component.id} component={component} entityId={selectedEntity.id} />
                ))}
            </div>
        </div>
    );
};

export default EntityInspectorTab;
