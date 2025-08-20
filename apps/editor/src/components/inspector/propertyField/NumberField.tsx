interface NumberFieldProps {
    propertyName: string;
    value: unknown;
    onUpdate: (value: unknown) => void;
}

const NumberField = ({ propertyName, value, onUpdate }: NumberFieldProps) => {
    const numValue = (value as number) || 0;

    return (
        <div className="flex items-center space-x-2">
            <span className="text-xs text-text-secondary min-w-[60px]">{propertyName}:</span>
            <input
                type="number"
                value={numValue}
                onChange={(e) => onUpdate(parseFloat(e.target.value) || 0)}
                className="flex-1 text-xs bg-white dark:bg-surface-secondary border border-border-primary rounded px-2 py-1 focus:outline-none focus:border-primary-300 text-text-primary"
            />
        </div>
    );
};

export default NumberField;
