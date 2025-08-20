interface TextFieldProps {
    propertyName: string;
    value: unknown;
    onUpdate: (value: unknown) => void;
}

const TextField = ({ propertyName, value, onUpdate }: TextFieldProps) => {
    const textValue = (value as string) || "";

    return (
        <div className="space-y-2">
            <div className="text-xs text-text-secondary font-medium">{propertyName}:</div>
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
