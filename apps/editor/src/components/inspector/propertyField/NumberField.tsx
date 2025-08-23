interface NumberFieldProps {
    propertyName: string;
    value: unknown;
    onUpdate: (value: unknown) => void;
}

const NumberField = ({ propertyName, value, onUpdate }: NumberFieldProps) => {
    const numValue = (value as number) || 0;

    return (
        <div className="component-property">
            <span className="property-name">{propertyName}:</span>
            <input
                type="number"
                value={numValue}
                onChange={(e) => onUpdate(parseFloat(e.target.value) || 0)}
                className="w-16 text-xs bg-white dark:bg-surface-secondary border border-border-primary rounded px-2 py-1 focus:outline-none focus:border-primary-300 text-text-primary"
            />
        </div>
    );
};

export default NumberField;
