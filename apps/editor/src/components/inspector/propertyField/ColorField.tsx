import { useState, useEffect } from "react";

interface ColorFieldProps {
    propertyName: string;
    value: unknown;
    onUpdate: (value: unknown) => void;
    defaultValue?: string;
}

const ColorField = ({ propertyName, value, onUpdate, defaultValue }: ColorFieldProps) => {
    const [colorValue, setColorValue] = useState((value as string) ?? defaultValue ?? "#000000");
    const [textValue, setTextValue] = useState((value as string) ?? defaultValue ?? "");

    useEffect(() => {
        setColorValue((value as string) ?? defaultValue ?? "#000000");
        setTextValue((value as string) ?? defaultValue ?? "");
    }, [value, defaultValue]);

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTextValue(value);
        const hexColorRegex = /^#([0-9a-fA-F]{6})$/;
        if (hexColorRegex.test(value)) {
            onUpdate(value);
        }
    };

    return (
        <div className="component-property">
            <span className="property-name">{propertyName}:</span>
            <input
                type="color"
                value={colorValue}
                onChange={(e) => onUpdate(e.target.value)}
                className="w-12 h-8 border border-border-primary rounded cursor-pointer"
            />
            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    value={textValue}
                    onChange={handleTextChange}
                    className="w-20 text-xs bg-white dark:bg-surface-secondary border border-border-primary rounded px-2 py-1 focus:outline-none focus:border-primary-300 text-text-primary font-mono"
                    placeholder="#000000"
                />
                <button
                    onClick={() => onUpdate(undefined)}
                    className="px-2 py-1 text-xs bg-white dark:bg-surface-secondary border border-border-primary rounded hover:bg-surface-tertiary transition-colors"
                >
                    Clear
                </button>
            </div>
        </div>
    );
};

export default ColorField;
