interface Vector2FieldProps {
    propertyName: string;
    value: unknown;
    onUpdate: (value: unknown) => void;
}

const Vector2Field = ({ propertyName, value, onUpdate }: Vector2FieldProps) => {
    const vectorValue = (value as { x: number; y: number }) || { x: 0, y: 0 };

    const handleVectorChange = (axis: "x" | "y", newValue: string) => {
        const numValue = parseFloat(newValue) || 0;
        onUpdate({ ...vectorValue, [axis]: numValue });
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
                    className="w-16 text-xs bg-white dark:bg-surface-secondary border border-border-primary rounded px-2 py-1 focus:outline-none focus:border-primary-300 text-text-primary"
                />
                <span className="text-xs text-text-tertiary">Y:</span>
                <input
                    type="number"
                    value={vectorValue.y}
                    onChange={(e) => handleVectorChange("y", e.target.value)}
                    className="w-16 text-xs bg-white dark:bg-surface-secondary border border-border-primary rounded px-2 py-1 focus:outline-none focus:border-primary-300 text-text-primary"
                />
            </div>
        </div>
    );
};

export default Vector2Field;
