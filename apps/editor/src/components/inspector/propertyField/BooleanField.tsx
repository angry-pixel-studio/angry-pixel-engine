interface BooleanFieldProps {
    propertyName: string;
    value: unknown;
    onUpdate: (value: unknown) => void;
}

const BooleanField = ({ propertyName, value, onUpdate }: BooleanFieldProps) => {
    const boolValue = (value as boolean) || false;

    return (
        <div className="flex items-center space-x-2">
            <span className="text-xs text-text-secondary min-w-[60px]">{propertyName}:</span>
            <input
                type="checkbox"
                checked={boolValue}
                onChange={(e) => onUpdate(e.target.checked)}
                className="w-4 h-4 text-primary-600 bg-white dark:bg-surface-secondary border border-border-primary rounded focus:ring-primary-500 focus:ring-2"
            />
            <span className="text-xs text-text-secondary">{boolValue ? "True" : "False"}</span>
        </div>
    );
};

export default BooleanField;
