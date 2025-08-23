import { useEditor } from "../../hooks/useEditor";
import { EntityComponent } from "../../types/scene";
import { builtInComponents } from "../../data/built-in-components";
import { PropertyType } from "../../types/component";
import PropertyFieldFactory from "./propertyField/PropertyFieldFactory";

interface ComponentItemProps {
    component: EntityComponent;
}

const ComponentItem = ({ component }: ComponentItemProps) => {
    const { entityInspector, toggleComponentCollapsed, setComponentEnabled, updateComponentProperty } = useEditor();

    const isBuiltIn = component.builtIn;
    const isCollapsed = entityInspector.collapsedComponents.has(component.id);

    // Helper function to get property type from built-in components
    const getPropertyType = (propertyName: string): PropertyType => {
        if (!isBuiltIn) return PropertyType.String; // Default for non-built-in components

        const builtInComponent = builtInComponents.find((c) => c.name === component.name);
        if (!builtInComponent) return PropertyType.String;

        const property = builtInComponent.properties.find((p) => p.name === propertyName);
        return property ? property.type : PropertyType.String;
    };

    const handleToggleEnabled = () => {
        setComponentEnabled(component.id, !component.enabled);
    };

    const handleToggleCollapse = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleComponentCollapsed(component.id);
    };

    return (
        <div className="border rounded-lg transition-colors border-border-primary hover:border-primary-200">
            {/* Component Header */}
            <div className="flex items-center justify-between p-3 cursor-pointer">
                <div className="flex items-center space-x-2">
                    <button
                        onClick={handleToggleCollapse}
                        className="w-4 h-4 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
                        title={isCollapsed ? "Expandir" : "Colapsar"}
                    >
                        <svg
                            className={`w-3 h-3 transition-transform ${isCollapsed ? "rotate-90" : ""}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                    <span className="text-sm font-medium text-text-primary">{component.name}</span>
                </div>

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
            {!isCollapsed && isBuiltIn && component.data && (
                <div className="px-3 pb-3 border-t border-border-primary">
                    <div className="space-y-2 mt-2">
                        {Object.entries(component.data).map(([key, value]) => (
                            <PropertyFieldFactory
                                key={key}
                                propertyName={key}
                                value={value}
                                componentId={component.id}
                                propertyType={getPropertyType(key)}
                                onUpdate={(newValue: unknown) => {
                                    updateComponentProperty(component.id, key, newValue);
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Raw Data (for non-built-in components) */}
            {!isCollapsed && !isBuiltIn && component.data && Object.keys(component.data).length > 0 && (
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
