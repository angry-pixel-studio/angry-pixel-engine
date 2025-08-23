interface StringFieldProps {
    propertyName: string;
    value: unknown;
    onUpdate: (value: unknown) => void;
}

const StringField = ({ propertyName, value, onUpdate }: StringFieldProps) => {
    const stringValue = (value as string) || "";

    return (
        <div className="component-property">
            <span className="property-name">{propertyName}:</span>
            <input
                type="text"
                value={stringValue}
                onChange={(e) => onUpdate(e.target.value)}
                className="flex-1 text-xs bg-white dark:bg-surface-secondary border border-border-primary rounded px-2 py-1 focus:outline-none focus:border-primary-300 text-text-primary"
            />
        </div>
    );
};

export default StringField;
