import { X } from "lucide-react";
import Icon from "../../ui/Icon";

interface Vector2ArrayFieldProps {
    propertyName: string;
    value: unknown;
    onUpdate: (value: unknown) => void;
    defaultValue?: { x: number; y: number }[];
    options?: {
        minX?: number;
        maxX?: number;
        minY?: number;
        maxY?: number;
        step?: number;
    };
}

const Vector2ArrayField = ({ propertyName, value, onUpdate, defaultValue, options }: Vector2ArrayFieldProps) => {
    const arrayValue = (value as { x: number; y: number }[]) ?? defaultValue ?? [];

    const min = {
        x: options?.minX ?? Number.MIN_SAFE_INTEGER,
        y: options?.minY ?? Number.MIN_SAFE_INTEGER,
    };
    const max = {
        x: options?.maxX ?? Number.MAX_SAFE_INTEGER,
        y: options?.maxY ?? Number.MAX_SAFE_INTEGER,
    };

    const handleAddItem = () => {
        onUpdate([...arrayValue, { x: options?.minX ?? 0, y: options?.minY ?? 0 }]);
    };

    const handleRemoveItem = (index: number) => {
        const newArray = arrayValue.filter((_, i) => i !== index);
        onUpdate(newArray);
    };

    const handleVectorChange = (index: number, axis: "x" | "y", newValue: string) => {
        const numValue = parseFloat(newValue) || 0;
        const clampedValue = Math.max(min[axis], Math.min(max[axis], numValue));

        const newArray = [...arrayValue];
        newArray[index] = { ...newArray[index], [axis]: clampedValue };
        onUpdate(newArray);
    };

    return (
        <div className="component-property">
            <span className="property-name">{propertyName}:</span>
            <div className="space-y-2">
                {arrayValue.map((vector, index) => (
                    <div
                        key={index}
                        className="flex items-center space-x-2 p-2 bg-surface-secondary rounded border border-border-primary"
                    >
                        <span className="text-xs text-text-tertiary min-w-[20px]">{index}:</span>
                        <div className="flex items-center space-x-1">
                            <span className="text-xs text-text-tertiary">X:</span>
                            <input
                                type="number"
                                value={vector.x}
                                onChange={(e) => handleVectorChange(index, "x", e.target.value)}
                                step={options?.step ?? 1}
                                className="w-16 text-xs bg-white dark:bg-surface-primary border border-border-primary rounded px-2 py-1 focus:outline-none focus:border-primary-300 text-text-primary"
                            />
                        </div>
                        <div className="flex items-center space-x-1">
                            <span className="text-xs text-text-tertiary">Y:</span>
                            <input
                                type="number"
                                value={vector.y}
                                onChange={(e) => handleVectorChange(index, "y", e.target.value)}
                                step={options?.step ?? 1}
                                className="w-16 text-xs bg-white dark:bg-surface-primary border border-border-primary rounded px-2 py-1 focus:outline-none focus:border-primary-300 text-text-primary"
                            />
                        </div>
                        <button
                            onClick={() => handleRemoveItem(index)}
                            className="p-1 text-accent-error hover:bg-surface-tertiary rounded transition-colors"
                            title="Remove vector"
                        >
                            <Icon icon={X} size="xs" />
                        </button>
                    </div>
                ))}
                <button
                    onClick={handleAddItem}
                    className="w-full p-2 text-accent-success hover:bg-surface-tertiary rounded transition-colors border border-dashed border-border-primary"
                    title="Add new vector"
                >
                    <span className="text-xs">+ Add Vector2</span>
                </button>
            </div>
        </div>
    );
};

export default Vector2ArrayField;
