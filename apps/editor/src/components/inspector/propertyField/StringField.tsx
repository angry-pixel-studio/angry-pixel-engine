interface StringFieldProps {
    propertyName: string;
    value: unknown;
    onUpdate: (value: unknown) => void;
    defaultValue?: string;
    options?: StringFieldOptions;
}

interface StringFieldOptions {
    setUndefinedWhenEmpty?: boolean;
}

const StringField = ({ propertyName, value, onUpdate, defaultValue, options }: StringFieldProps) => {
    const stringValue = (value as string) || defaultValue || "";

    return (
        <div className="component-property">
            <span className="property-name">{propertyName}:</span>
            <input
                type="text"
                value={stringValue}
                onChange={(e) => {
                    if (options?.setUndefinedWhenEmpty && e.target.value === "") {
                        onUpdate(undefined);
                    } else {
                        onUpdate(e.target.value);
                    }
                }}
                className="flex-1 text-xs bg-white dark:bg-surface-secondary border border-border-primary rounded px-2 py-1 focus:outline-none focus:border-primary-300 text-text-primary"
            />
        </div>
    );
};

export default StringField;
