interface NumberFieldProps {
    propertyName: string;
    value: unknown;
    onUpdate: (value: unknown) => void;
    options?: NumberFieldOptions;
}

export interface NumberFieldOptions {
    min?: number;
    max?: number;
    step?: number;
}

const NumberField = ({ propertyName, value, onUpdate, options }: NumberFieldProps) => {
    const numValue = (value as number) ?? 0;
    const min = options?.min ?? Number.MIN_SAFE_INTEGER;
    const max = options?.max ?? Number.MAX_SAFE_INTEGER;
    const step = options?.step ?? 1;

    return (
        <div className="component-property">
            <span className="property-name">{propertyName}:</span>
            <input
                type="number"
                value={numValue}
                onChange={(e) => onUpdate(Math.max(min, Math.min(max, parseFloat(e.target.value) ?? min)))}
                step={step}
                className="w-16 text-xs bg-white dark:bg-surface-secondary border border-border-primary rounded px-2 py-1 focus:outline-none focus:border-primary-300 text-text-primary"
            />
        </div>
    );
};

export default NumberField;
