import { X } from "lucide-react";
import Icon from "../../Icon";

interface StringArrayFieldProps {
    propertyName: string;
    value: unknown;
    onUpdate: (value: unknown) => void;
}

const StringArrayField = ({ propertyName, value, onUpdate }: StringArrayFieldProps) => {
    const arrayValue = (value as string[]) || [];

    const handleAddItem = () => {
        onUpdate([...arrayValue, "New Item"]);
    };

    const handleRemoveItem = (index: number) => {
        const newArray = arrayValue.filter((_, i) => i !== index);
        onUpdate(newArray);
    };

    const handleItemChange = (index: number, newValue: string) => {
        const newArray = [...arrayValue];
        newArray[index] = newValue;
        onUpdate(newArray);
    };

    return (
        <div className="component-property">
            <span className="property-name">{propertyName}:</span>
            <div className="space-y-1">
                {arrayValue.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={item}
                            onChange={(e) => handleItemChange(index, e.target.value)}
                            className="flex-1 text-xs bg-white dark:bg-surface-secondary border border-border-primary rounded px-2 py-1 focus:outline-none focus:border-primary-300 text-text-primary"
                        />
                        <button
                            onClick={() => handleRemoveItem(index)}
                            className="p-1 text-accent-error hover:bg-surface-tertiary rounded transition-colors"
                            title="Remove item"
                        >
                            <Icon icon={X} size="xs" />
                        </button>
                    </div>
                ))}
                <button
                    onClick={handleAddItem}
                    className="w-full p-1 text-accent-success hover:bg-surface-tertiary rounded transition-colors border border-dashed border-border-primary"
                    title="Add new item"
                >
                    <span className="text-xs">+ Add Item</span>
                </button>
            </div>
        </div>
    );
};

export default StringArrayField;
