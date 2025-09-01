interface AudioFieldProps {
    propertyName: string;
    value: unknown;
    onUpdate: (value: unknown) => void;
    defaultValue?: string;
}

const AudioField = ({ propertyName, value, onUpdate, defaultValue }: AudioFieldProps) => {
    const audioValue = (value as string) ?? defaultValue ?? "";

    return (
        <div className="component-property">
            <span className="property-name">{propertyName}:</span>
            <input
                type="text"
                value={audioValue}
                onChange={(e) => onUpdate(e.target.value)}
                className="flex-1 text-xs bg-white dark:bg-surface-secondary border border-border-primary rounded px-2 py-1 focus:outline-none focus:border-primary-300 text-text-primary"
                placeholder="assets/audio/example.mp3"
            />
            <button
                className="px-2 py-1 text-xs bg-white dark:bg-surface-secondary border border-border-primary rounded hover:bg-surface-tertiary transition-colors"
                title="Browse audio file"
            >
                Browse
            </button>
        </div>
    );
};

export default AudioField;
