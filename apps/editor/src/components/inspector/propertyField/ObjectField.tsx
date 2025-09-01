interface ObjectFieldProps {
    propertyName: string;
    value: unknown;
    onUpdate: (value: unknown) => void;
    defaultValue?: object;
}

const ObjectField = ({ propertyName, value, onUpdate, defaultValue }: ObjectFieldProps) => {
    const objectValue = (value as object) ?? defaultValue ?? {};
    const jsonString = JSON.stringify(objectValue, null, 2);

    return (
        <div className="space-y-2 border-b border-border-primary pb-2">
            <div className="property-name">{propertyName}:</div>
            <textarea
                value={jsonString}
                onChange={(e) => {
                    try {
                        const parsed = JSON.parse(e.target.value);
                        onUpdate(parsed);
                    } catch {
                        // Invalid JSON, don't update
                    }
                }}
                className="w-full text-xs bg-white dark:bg-surface-secondary border border-border-primary rounded px-2 py-1 focus:outline-none focus:border-primary-300 text-text-primary font-mono resize-none"
                rows={4}
                placeholder="{}"
            />
        </div>
    );
};

export default ObjectField;
