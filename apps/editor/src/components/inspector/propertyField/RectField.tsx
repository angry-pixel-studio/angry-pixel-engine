interface RectFieldProps {
    propertyName: string;
    value: unknown;
    onUpdate: (value: unknown) => void;
    defaultValue?: { x: number; y: number; width: number; height: number };
    options?: RectFieldOptions;
}

export interface RectFieldOptions {
    setUndefinedWhenZero?: boolean;
}

const isRectZero = (rect: { x: number; y: number; width: number; height: number }): boolean => {
    return rect.x === 0 && rect.y === 0 && rect.width === 0 && rect.height === 0;
};

const RectField = ({ propertyName, value, onUpdate, defaultValue, options }: RectFieldProps) => {
    const rectValue = (value as { x: number; y: number; width: number; height: number }) ??
        defaultValue ?? {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        };

    const handleRectChange = (property: "x" | "y" | "width" | "height", newValue: string) => {
        const numValue = parseFloat(newValue) || 0;
        const newRectValue = { ...rectValue, [property]: numValue };
        if (options?.setUndefinedWhenZero && isRectZero(newRectValue)) {
            onUpdate(undefined);
        } else {
            onUpdate({ ...rectValue, [property]: numValue });
        }
    };

    return (
        <div className="flex flex-col space-y-2 border-b border-border-primary pb-2">
            <div className="flex items-center space-x-2">
                <span className="property-name font-medium">{propertyName}:</span>
                <div className="flex items-center space-x-2">
                    <span className="text-xs text-text-tertiary">X:</span>
                    <input
                        type="number"
                        value={rectValue.x}
                        onChange={(e) => handleRectChange("x", e.target.value)}
                        className="w-16 text-xs bg-white dark:bg-surface-secondary border border-border-primary rounded px-2 py-1 focus:outline-none focus:border-primary-300 text-text-primary"
                    />
                    <span className="text-xs text-text-tertiary">Y:</span>
                    <input
                        type="number"
                        value={rectValue.y}
                        onChange={(e) => handleRectChange("y", e.target.value)}
                        className="w-16 text-xs bg-white dark:bg-surface-secondary border border-border-primary rounded px-2 py-1 focus:outline-none focus:border-primary-300 text-text-primary"
                    />
                </div>
            </div>
            <div className="flex items-center space-x-2 ml-[85px]">
                <div className="flex items-center space-x-2">
                    <span className="text-xs text-text-tertiary">W:</span>
                    <input
                        type="number"
                        value={rectValue.width}
                        onChange={(e) => handleRectChange("width", e.target.value)}
                        className="w-16 text-xs bg-white dark:bg-surface-secondary border border-border-primary rounded px-2 py-1 focus:outline-none focus:border-primary-300 text-text-primary"
                    />
                    <span className="text-xs text-text-tertiary">H:</span>
                    <input
                        type="number"
                        value={rectValue.height}
                        onChange={(e) => handleRectChange("height", e.target.value)}
                        className="w-16 text-xs bg-white dark:bg-surface-secondary border border-border-primary rounded px-2 py-1 focus:outline-none focus:border-primary-300 text-text-primary"
                    />
                </div>
            </div>
        </div>
    );
};

export default RectField;
