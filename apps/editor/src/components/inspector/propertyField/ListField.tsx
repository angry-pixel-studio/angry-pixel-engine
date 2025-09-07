type ListValue = string | number;

interface ListFieldProps {
    propertyName: string;
    value: unknown;
    onUpdate: (value: unknown) => void;
    defaultValue?: ListValue;
    options?: ListFieldOptions;
}

export interface ListFieldOptions {
    items: Array<{ value: ListValue; label: string }>;
    castValue?: (value: string) => unknown;
}

const ListField = ({ propertyName, value, onUpdate, defaultValue, options }: ListFieldProps) => {
    const currentValue = ((value !== undefined ? value : defaultValue) as ListValue) || "";
    const items = options?.items || [];

    return (
        <div className="component-property">
            <span className="property-name">{propertyName}:</span>
            <select
                value={currentValue}
                onChange={(e) => onUpdate(options?.castValue ? options.castValue(e.target.value) : e.target.value)}
                className="flex-1 text-xs bg-white dark:bg-surface-secondary border border-border-primary rounded px-2 py-1 focus:outline-none focus:border-primary-300 text-text-primary"
            >
                {items.map((item, index) => (
                    <option key={index} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ListField;
