interface FontFieldProps {
    propertyName: string;
    value: unknown;
    onUpdate: (value: unknown) => void;
}

const FontField = ({ propertyName, value, onUpdate }: FontFieldProps) => {
    const fontValue = (value as string) || "";

    return (
        <div className="component-property">
            <span className="property-name">{propertyName}:</span>
            <select
                value={fontValue}
                onChange={(e) => onUpdate(e.target.value)}
                className="flex-1 text-xs bg-white dark:bg-surface-secondary border border-border-primary rounded px-2 py-1 focus:outline-none focus:border-primary-300 text-text-primary"
            >
                <option value="">Select font...</option>
                <option value="Arial">Arial</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
            </select>
        </div>
    );
};

export default FontField;
