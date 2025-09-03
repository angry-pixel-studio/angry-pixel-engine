interface Vector2FieldProps {
    propertyName: string;
    value: unknown;
    onUpdate: (value: unknown) => void;
    defaultValue?: { x: number; y: number };
    options?: {
        minX?: number;
        maxX?: number;
        minY?: number;
        maxY?: number;
        step?: number;
    };
}

const Vector2Field = ({ propertyName, value, onUpdate, defaultValue, options }: Vector2FieldProps) => {
    const vectorValue = (value as { x: number; y: number }) ??
        defaultValue ?? { x: options?.minX ?? 0, y: options?.minY ?? 0 };

    const min = {
        x: options?.minX ?? Number.MIN_SAFE_INTEGER,
        y: options?.minY ?? Number.MIN_SAFE_INTEGER,
    };
    const max = {
        x: options?.maxX ?? Number.MAX_SAFE_INTEGER,
        y: options?.maxY ?? Number.MAX_SAFE_INTEGER,
    };

    const handleVectorChange = (axis: "x" | "y", newValue: string) => {
        const numValue = parseFloat(newValue) || 0;
        onUpdate({ ...vectorValue, [axis]: Math.max(min[axis], Math.min(max[axis], numValue ?? min[axis])) });
    };

    return (
        <div className="component-property">
            <span className="property-name">{propertyName}:</span>
            <div className="flex items-center space-x-2">
                <span className="text-xs text-text-tertiary">X:</span>
                <input
                    type="number"
                    value={vectorValue.x}
                    onChange={(e) => handleVectorChange("x", e.target.value)}
                    step={options?.step ?? 1}
                    className="w-16 text-xs bg-white dark:bg-surface-secondary border border-border-primary rounded px-2 py-1 focus:outline-none focus:border-primary-300 text-text-primary"
                />
                <span className="text-xs text-text-tertiary">Y:</span>
                <input
                    type="number"
                    value={vectorValue.y}
                    onChange={(e) => handleVectorChange("y", e.target.value)}
                    step={options?.step ?? 1}
                    className="w-16 text-xs bg-white dark:bg-surface-secondary border border-border-primary rounded px-2 py-1 focus:outline-none focus:border-primary-300 text-text-primary"
                />
            </div>
        </div>
    );
};

export default Vector2Field;
