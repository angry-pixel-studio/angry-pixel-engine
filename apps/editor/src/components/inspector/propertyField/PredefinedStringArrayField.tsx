import { X } from "lucide-react";
import Icon from "../../ui/Icon";

interface PredefinedStringArrayFieldProps {
    propertyName: string;
    value: string[];
    onUpdate: (value: unknown) => void;
    defaultValue?: string[];
    availableOptions: string[];
}

const PredefinedStringArrayField = ({
    propertyName,
    value,
    onUpdate,
    defaultValue,
    availableOptions,
}: PredefinedStringArrayFieldProps) => {
    const arrayValue = (value as string[]) ?? defaultValue ?? [];

    // Calculate available options (those not already selected)
    const availableOptionsFiltered = availableOptions.filter((option) => !arrayValue.includes(option));

    const sortLayers = (layers: string[]) => {
        return [...layers].sort((a, b) => {
            const indexA = availableOptions.indexOf(a);
            const indexB = availableOptions.indexOf(b);
            return indexA - indexB;
        });
    };

    const handleAddItem = (selectedValue: string) => {
        onUpdate(sortLayers([...arrayValue, selectedValue]));
    };

    const handleRemoveItem = (index: number) => {
        const itemToRemove = sortedArrayValue[index];
        const newArray = arrayValue.filter((item) => item !== itemToRemove);
        onUpdate(sortLayers(newArray));
    };

    const sortedArrayValue = sortLayers(arrayValue);

    return (
        <div className="component-property">
            <span className="property-name">{propertyName}:</span>
            <div className="space-y-1 w-full">
                {sortedArrayValue.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <div className="flex-1 text-xs bg-surface-secondary border border-border-primary rounded px-2 py-1 text-text-primary">
                            {item}
                        </div>
                        <button
                            onClick={() => handleRemoveItem(index)}
                            className="p-1 text-accent-error hover:bg-surface-tertiary rounded transition-colors"
                            title="Remove item"
                        >
                            <Icon icon={X} size="xs" />
                        </button>
                    </div>
                ))}

                {availableOptionsFiltered.length > 0 && (
                    <div className="flex items-center">
                        <select
                            data-property={propertyName}
                            onChange={(e) => {
                                if (e.target.value) {
                                    handleAddItem(e.target.value);
                                    e.target.value = ""; // Reset selection
                                }
                            }}
                            value=""
                            className="flex-1 text-xs bg-white dark:bg-surface-secondary border border-border-primary rounded px-2 py-1 focus:outline-none focus:border-primary-300 text-text-primary"
                        >
                            <option value="">Select an option...</option>
                            {availableOptionsFiltered.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {availableOptionsFiltered.length === 0 && sortedArrayValue.length > 0 && (
                    <div className="text-xs text-text-secondary italic">All available options have been selected</div>
                )}
            </div>
        </div>
    );
};

export default PredefinedStringArrayField;
