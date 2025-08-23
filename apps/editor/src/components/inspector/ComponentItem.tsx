import { useEditor } from "../../hooks/useEditor";
import { EntityComponent } from "../../types/scene";
import { builtInComponents } from "../../data/built-in-components";
import { PropertyType } from "../../types/component";
import PropertyFieldFactory from "./propertyField/PropertyFieldFactory";

interface ComponentItemProps {
    component: EntityComponent;
    entityId: string;
}

const ComponentItem = ({ component, entityId }: ComponentItemProps) => {
    const { selectedComponent, selectComponent, updateComponent } = useEditor();
    const isSelected = selectedComponent?.id === component.id;
    const isBuiltIn = component.builtIn;

    // Helper function to get property type from built-in components
    const getPropertyType = (propertyName: string): PropertyType => {
        if (!isBuiltIn) return PropertyType.String; // Default for non-built-in components

        const builtInComponent = builtInComponents.find((c) => c.name === component.name);
        if (!builtInComponent) return PropertyType.String;

        const property = builtInComponent.properties.find((p) => p.name === propertyName);
        return property ? property.type : PropertyType.String;
    };

    const handleToggleEnabled = () => {
        updateComponent(entityId, component.id, { enabled: !component.enabled });
    };

    return (
        <div
            className={`border rounded-lg transition-colors ${
                isSelected ? "border-primary-300 bg-primary-50" : "border-border-primary hover:border-primary-200"
            }`}
        >
            {/* Component Header */}
            <div
                className="flex items-center justify-between p-3 cursor-pointer"
                onClick={() => selectComponent(component)}
            >
                <span className="text-sm font-medium text-text-primary">{component.name}</span>

                <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={component.enabled}
                        onChange={handleToggleEnabled}
                        className="w-4 h-4 text-primary-600 bg-surface-secondary border-border-primary rounded focus:ring-primary-500 focus:ring-2"
                    />
                    <span className="text-xs text-text-secondary">Enabled</span>
                </label>
            </div>

            {/* Component Properties (only for built-in components) */}
            {isBuiltIn && component.data && (
                <div className="px-3 pb-3 border-t border-border-primary">
                    <div className="text-xs text-text-tertiary mb-2 mt-2">Properties:</div>
                    <div className="space-y-2">
                        {Object.entries(component.data).map(([key, value]) => (
                            <PropertyFieldFactory
                                key={key}
                                propertyName={key}
                                value={value}
                                componentId={component.id}
                                propertyType={getPropertyType(key)}
                                onUpdate={(newValue: unknown) => {
                                    updateComponent(entityId, component.id, {
                                        data: { ...component.data, [key]: newValue },
                                    });
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Raw Data (for non-built-in components) */}
            {!isBuiltIn && component.data && Object.keys(component.data).length > 0 && (
                <div className="px-3 pb-3 border-t border-border-primary">
                    <div className="text-xs text-text-tertiary mb-1">Data:</div>
                    <div className="space-y-1">
                        {Object.entries(component.data).map(([key, value]) => (
                            <div key={key} className="flex justify-between text-xs">
                                <span className="text-text-secondary">{key}:</span>
                                <span className="text-text-primary font-mono">
                                    {typeof value === "object" ? JSON.stringify(value) : String(value)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ComponentItem;
