interface ImageFieldProps {
    propertyName: string;
    value: unknown;
    onUpdate: (value: unknown) => void;
    defaultValue?: string;
}

const ImageField = ({ propertyName, value, onUpdate, defaultValue }: ImageFieldProps) => {
    const imageValue = (value as string) ?? defaultValue ?? "";

    return (
        <div className="component-property">
            <span className="property-name">{propertyName}:</span>
            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    value={imageValue}
                    onChange={(e) => onUpdate(e.target.value)}
                    className="flex-1 text-xs bg-white dark:bg-surface-secondary border border-border-primary rounded px-2 py-1 focus:outline-none focus:border-primary-300 text-text-primary"
                    placeholder="assets/images/example.png"
                />
                <button
                    className="px-2 py-1 text-xs bg-white dark:bg-surface-secondary border border-border-primary rounded hover:bg-surface-tertiary transition-colors"
                    title="Browse image"
                >
                    Browse
                </button>
            </div>
        </div>
    );
};

export default ImageField;
