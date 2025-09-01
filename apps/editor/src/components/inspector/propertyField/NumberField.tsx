interface NumberFieldProps {
    propertyName: string;
    value: unknown;
    onUpdate: (value: unknown) => void;
    defaultValue?: number;
    options?: NumberFieldOptions;
}

export interface NumberFieldOptions {
    min?: number;
    max?: number;
    step?: number;
    setUndefinedWhenZero?: boolean;
}

const NumberField = ({ propertyName, value, onUpdate, defaultValue, options }: NumberFieldProps) => {
    const numValue = (value as number) ?? defaultValue ?? 0;
    const min = options?.min ?? Number.MIN_SAFE_INTEGER;
    const max = options?.max ?? Number.MAX_SAFE_INTEGER;
    const step = options?.step ?? 1;

    return (
        <div className="component-property">
            <span className="property-name">{propertyName}:</span>
            <input
                type="number"
                value={numValue}
                onChange={(e) => {
                    const numValue = parseFloat(e.target.value);
                    if (options?.setUndefinedWhenZero && numValue === 0) {
                        onUpdate(undefined);
                    } else {
                        onUpdate(Math.max(min, Math.min(max, numValue ?? min)));
                    }
                }}
                step={step}
                className="w-16 text-xs bg-white dark:bg-surface-secondary border border-border-primary rounded px-2 py-1 focus:outline-none focus:border-primary-300 text-text-primary"
            />
        </div>
    );
};

export default NumberField;
