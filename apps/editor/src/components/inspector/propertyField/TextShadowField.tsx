import { useState, useEffect } from "react";

interface TextShadowFieldProps {
    propertyName: string;
    value: unknown;
    onUpdate: (value: unknown) => void;
    defaultValue?: {
        color: string;
        opacity: number;
        offset: { x: number; y: number };
    };
}

const TextShadowField = ({ propertyName, value, onUpdate, defaultValue }: TextShadowFieldProps) => {
    const defaultShadow = defaultValue ?? {
        color: "#FFFFFF",
        opacity: 1,
        offset: { x: -1, y: -1 },
    };

    const isEnabled = value !== undefined && value !== null;
    const shadowValue = (value as typeof defaultShadow) ?? defaultValue ?? defaultShadow;

    const [colorValue, setColorValue] = useState(shadowValue.color);
    const [colorTextValue, setColorTextValue] = useState(shadowValue.color);
    const [opacityValue, setOpacityValue] = useState(shadowValue.opacity);
    const [offsetX, setOffsetX] = useState(shadowValue.offset.x);
    const [offsetY, setOffsetY] = useState(shadowValue.offset.y);

    useEffect(() => {
        const currentValue = (value as typeof defaultShadow) ?? defaultValue ?? defaultShadow;
        setColorValue(currentValue.color);
        setColorTextValue(currentValue.color);
        setOpacityValue(currentValue.opacity);
        setOffsetX(currentValue.offset.x);
        setOffsetY(currentValue.offset.y);
    }, [value, defaultValue]);

    const updateShadow = (updates: Partial<typeof defaultShadow>) => {
        if (!isEnabled) return;
        const newShadow = { ...shadowValue, ...updates };
        onUpdate(newShadow);
    };

    const handleEnableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            onUpdate(shadowValue);
        } else {
            onUpdate(undefined);
        }
    };

    const handleColorChange = (newColor: string) => {
        setColorValue(newColor);
        setColorTextValue(newColor);
        updateShadow({ color: newColor });
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setColorTextValue(value);
        const hexColorRegex = /^#([0-9a-fA-F]{6})$/;
        if (hexColorRegex.test(value)) {
            updateShadow({ color: value });
        }
    };

    const handleOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newOpacity = Math.max(0, Math.min(1, parseFloat(e.target.value) || 0));
        setOpacityValue(newOpacity);
        updateShadow({ opacity: newOpacity });
    };

    const handleOffsetChange = (axis: "x" | "y", newValue: string) => {
        const numValue = parseFloat(newValue) || 0;
        const newOffset = { ...shadowValue.offset, [axis]: numValue };
        if (axis === "x") {
            setOffsetX(numValue);
        } else {
            setOffsetY(numValue);
        }
        updateShadow({ offset: newOffset });
    };

    return (
        <div className="component-property">
            <span className="property-name">{propertyName}:</span>
            <div className="space-y-2">
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={isEnabled}
                        onChange={handleEnableChange}
                        className="w-4 h-4 border border-border-primary rounded cursor-pointer"
                    />
                    <span className="text-xs text-text-tertiary">Enable</span>
                </div>

                <div className="flex items-center space-x-2">
                    <span className="text-xs text-text-tertiary min-w-[46px]">Color:</span>
                    <input
                        type="color"
                        value={colorValue}
                        onChange={(e) => handleColorChange(e.target.value)}
                        disabled={!isEnabled}
                        className="w-8 h-6 border border-border-primary rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <input
                        type="text"
                        value={colorTextValue}
                        onChange={handleTextChange}
                        disabled={!isEnabled}
                        className="w-20 text-xs bg-white dark:bg-surface-secondary border border-border-primary rounded px-2 py-1 focus:outline-none focus:border-primary-300 text-text-primary font-mono disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="#000000"
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <span className="text-xs text-text-tertiary min-w-[46px]">Opacity:</span>
                    <input
                        type="number"
                        value={opacityValue}
                        onChange={handleOpacityChange}
                        disabled={!isEnabled}
                        min={0}
                        max={1}
                        step={0.01}
                        className="w-16 text-xs bg-white dark:bg-surface-secondary border border-border-primary rounded px-2 py-1 focus:outline-none focus:border-primary-300 text-text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <span className="text-xs text-text-tertiary min-w-[46px]">Offset:</span>
                    <span className="text-xs text-text-tertiary">X:</span>
                    <input
                        type="number"
                        value={offsetX}
                        onChange={(e) => handleOffsetChange("x", e.target.value)}
                        disabled={!isEnabled}
                        step={1}
                        className="w-16 text-xs bg-white dark:bg-surface-secondary border border-border-primary rounded px-2 py-1 focus:outline-none focus:border-primary-300 text-text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <span className="text-xs text-text-tertiary">Y:</span>
                    <input
                        type="number"
                        value={offsetY}
                        onChange={(e) => handleOffsetChange("y", e.target.value)}
                        disabled={!isEnabled}
                        step={1}
                        className="w-16 text-xs bg-white dark:bg-surface-secondary border border-border-primary rounded px-2 py-1 focus:outline-none focus:border-primary-300 text-text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                </div>
            </div>
        </div>
    );
};

export default TextShadowField;
