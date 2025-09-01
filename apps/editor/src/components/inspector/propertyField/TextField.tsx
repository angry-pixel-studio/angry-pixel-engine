interface TextFieldProps {
    propertyName: string;
    value: unknown;
    onUpdate: (value: unknown) => void;
    defaultValue?: string;
}

const TextField = ({ propertyName, value, onUpdate, defaultValue }: TextFieldProps) => {
    const textValue = (value as string) ?? defaultValue ?? "";

    return (
        <div className="space-y-2 border-b border-border-primary pb-2">
            <span className="property-name">{propertyName}:</span>
            <textarea
                value={textValue}
                onChange={(e) => onUpdate(e.target.value)}
                className="w-full text-xs bg-white dark:bg-surface-secondary border border-border-primary rounded px-2 py-1 focus:outline-none focus:border-primary-300 text-text-primary resize-none"
                rows={3}
                placeholder="Enter text..."
            />
        </div>
    );
};

export default TextField;
