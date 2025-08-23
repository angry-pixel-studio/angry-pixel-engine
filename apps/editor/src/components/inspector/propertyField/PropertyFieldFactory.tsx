import { PropertyType } from "../../../types/component";
import {
    Vector2Field,
    StringArrayField,
    NumberField,
    StringField,
    BooleanField,
    ColorField,
    ImageField,
    FontField,
    TextField,
    AudioField,
    VideoField,
    ObjectField,
    RectField,
} from "./index";

interface PropertyFieldFactoryProps {
    propertyName: string;
    value: unknown;
    componentId: string;
    propertyType: PropertyType;
    onUpdate: (value: unknown) => void;
}

const PropertyFieldFactory = ({ propertyName, value, propertyType, onUpdate }: PropertyFieldFactoryProps) => {
    const commonProps = {
        propertyName,
        value,
        onUpdate,
    };

    switch (propertyType) {
        case PropertyType.Vector2:
            return <Vector2Field {...commonProps} />;
        case PropertyType.StringArray:
            return <StringArrayField {...commonProps} />;
        case PropertyType.Number:
            return <NumberField {...commonProps} />;
        case PropertyType.String:
            return <StringField {...commonProps} />;
        case PropertyType.Boolean:
            return <BooleanField {...commonProps} />;
        case PropertyType.Color:
            return <ColorField {...commonProps} />;
        case PropertyType.Image:
            return <ImageField {...commonProps} />;
        case PropertyType.Font:
            return <FontField {...commonProps} />;
        case PropertyType.Text:
            return <TextField {...commonProps} />;
        case PropertyType.Audio:
            return <AudioField {...commonProps} />;
        case PropertyType.Video:
            return <VideoField {...commonProps} />;
        case PropertyType.Object:
            return <ObjectField {...commonProps} />;
        case PropertyType.Rect:
            return <RectField {...commonProps} />;
        default:
            // Default case - generic text input for unknown types
            const stringValue = String(value || "");
            return (
                <div className="flex items-center space-x-2">
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
