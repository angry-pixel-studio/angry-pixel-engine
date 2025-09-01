interface ButtonFieldProps {
    propertyName: string;
    value: unknown;
    onUpdate: (value: unknown) => void;
    defaultValue?: unknown;
    options?: ButtonFieldOptions;
}

export interface ButtonFieldOptions {
    buttonLabel: string;
}

const ButtonField = ({ propertyName, value, onUpdate, defaultValue, options }: ButtonFieldProps) => {
    const handleClick = () => {
        // TODO: Implement button functionality
        onUpdate(value ?? defaultValue);
    };

    return (
        <div className="component-property">
            <span className="property-name">{propertyName}:</span>
            <button
                onClick={handleClick}
                className="px-3 py-1 text-xs bg-primary-500 hover:bg-primary-600 text-white rounded border border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-1 transition-colors duration-200"
            >
                {options?.buttonLabel ?? propertyName}
            </button>
        </div>
    );
};

export default ButtonField;
