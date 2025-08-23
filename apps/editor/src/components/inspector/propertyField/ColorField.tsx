interface ColorFieldProps {
    propertyName: string;
    value: unknown;
    onUpdate: (value: unknown) => void;
}

const ColorField = ({ propertyName, value, onUpdate }: ColorFieldProps) => {
    const colorValue = (value as string) || "#000000";

    return (
        <div className="component-property">
            <span className="property-name">{propertyName}:</span>
            <input
                type="color"
                value={colorValue}
                onChange={(e) => onUpdate(e.target.value)}
                className="w-12 h-8 border border-border-primary rounded cursor-pointer"
            />
            <input
                type="text"
                value={colorValue}
                onChange={(e) => onUpdate(e.target.value)}
                className="flex-1 text-xs bg-white dark:bg-surface-secondary border border-border-primary rounded px-2 py-1 focus:outline-none focus:border-primary-300 text-text-primary font-mono"
                placeholder="#000000"
            />
        </div>
    );
};

export default ColorField;
