import { useState } from "react";
import { Edit2, Check, X } from "lucide-react";
import Icon from "../Icon";
import { useEditorStore } from "../../stores/editorStore";
import { Entity } from "../../types/scene";

const EntityName = ({ entity }: { entity: Entity }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(entity.name);
    const { updateEntity } = useEditorStore();
    const [isEnabled, setIsEnabled] = useState(entity.enabled);
    const [entityName, setEntityName] = useState(entity.name);

    const handleEdit = () => {
        setIsEditing(true);
        setEditValue(entityName);
    };

    const handleSave = () => {
        if (editValue.trim() !== "" && editValue !== entityName) {
            updateEntity(entity.id, { name: editValue.trim() });
            setEntityName(editValue.trim());
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditValue(entityName);
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSave();
        } else if (e.key === "Escape") {
            handleCancel();
        }
    };

    if (isEditing) {
        return (
            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 text-md text-text-primary bg-surface-secondary border border-border-primary rounded px-2 py-1 focus:outline-none focus:border-primary-300"
                    autoFocus
                />
                <button
                    onClick={handleSave}
                    className="p-1 text-accent-success hover:bg-surface-tertiary rounded transition-colors"
                    title="Save changes"
                >
                    <Icon icon={Check} size="sm" />
                </button>
                <button
                    onClick={handleCancel}
                    className="p-1 text-accent-error hover:bg-surface-tertiary rounded transition-colors"
                    title="Cancel editing"
                >
                    <Icon icon={X} size="sm" />
                </button>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 ml-2">
                <span className="text-base font-medium text-text-primary">{entityName}</span>

                <button
                    onClick={handleEdit}
                    className="text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded transition-colors p-1"
                    title="Edit entity name"
                >
                    <Icon icon={Edit2} size="sm" />
                </button>
            </div>

            <label className="flex items-center space-x-2 cursor-pointer mr-2">
                <input
                    type="checkbox"
                    checked={isEnabled}
                    onChange={(e) => {
                        setIsEnabled(e.target.checked);
                        updateEntity(entity.id, { enabled: e.target.checked });
                    }}
                    className="w-4 h-4 text-primary-600 bg-surface-secondary border-border-primary rounded focus:ring-primary-500 focus:ring-2"
                />
                <span className="text-sm text-text-secondary">Enabled</span>
            </label>
        </div>
    );
};

export default EntityName;
