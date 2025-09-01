import { PropertyOption, PropertyType } from "../../../types/component";
import {
    Vector2Field,
    StringArrayField,
    NumberField,
    StringField,
    BooleanField,
    ButtonField,
    ColorField,
    ImageField,
    FontField,
    TextField,
    AudioField,
    VideoField,
    ObjectField,
    RectField,
    ButtonFieldOptions,
} from "./index";

interface PropertyFieldFactoryProps {
    propertyName: string;
    value: unknown;
    componentId: string;
    propertyType: PropertyType;
    onUpdate: (value: unknown) => void;
    options?: PropertyOption;
    defaultValue?: unknown;
}

const PropertyFieldFactory = ({
    propertyName,
    value,
    propertyType,
    onUpdate,
    options,
    defaultValue,
}: PropertyFieldFactoryProps) => {
    const commonProps = {
        propertyName,
        value,
        onUpdate,
        options,
    };

    switch (propertyType) {
        case PropertyType.Vector2:
            return <Vector2Field {...commonProps} defaultValue={defaultValue as { x: number; y: number }} />;
        case PropertyType.StringArray:
            return <StringArrayField {...commonProps} defaultValue={defaultValue as string[]} />;
        case PropertyType.Number:
            return <NumberField {...commonProps} defaultValue={defaultValue as number} />;
        case PropertyType.String:
            return <StringField {...commonProps} defaultValue={defaultValue as string} />;
        case PropertyType.Boolean:
            return <BooleanField {...commonProps} defaultValue={defaultValue as boolean} />;
        case PropertyType.Button:
            return (
                <ButtonField
                    {...commonProps}
                    defaultValue={defaultValue as unknown}
                    options={options as unknown as ButtonFieldOptions}
                />
            );
        case PropertyType.Color:
            return <ColorField {...commonProps} defaultValue={defaultValue as string} />;
        case PropertyType.Image:
            return <ImageField {...commonProps} defaultValue={defaultValue as string} />;
        case PropertyType.Font:
            return <FontField {...commonProps} defaultValue={defaultValue as string} />;
        case PropertyType.Text:
            return <TextField {...commonProps} defaultValue={defaultValue as string} />;
        case PropertyType.Audio:
            return <AudioField {...commonProps} defaultValue={defaultValue as string} />;
        case PropertyType.Video:
            return <VideoField {...commonProps} defaultValue={defaultValue as string} />;
        case PropertyType.Object:
            return <ObjectField {...commonProps} defaultValue={defaultValue as object} />;
        case PropertyType.Rect:
            return (
                <RectField
                    {...commonProps}
                    defaultValue={defaultValue as { x: number; y: number; width: number; height: number }}
                />
            );
        default:
            // Default case - generic text input for unknown types
            const stringValue = String(value || "");
            return (
                <div className="flex items-center space-x-2 border-t border-border-primary pt-2">
                    <span className="text-xs text-text-secondary min-w-[60px]">{propertyName}:</span>
                    <input
                        type="text"
                        value={stringValue}
                        onChange={(e) => onUpdate(e.target.value)}
                        className="flex-1 text-xs bg-white dark:bg-surface-secondary border border-border-primary rounded px-2 py-1 focus:outline-none focus:border-primary-300 text-text-primary"
                    />
                </div>
            );
    }
};

export default PropertyFieldFactory;
