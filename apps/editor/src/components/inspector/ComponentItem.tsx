import { useEditor } from "../../hooks/useEditor";
import { EntityComponent } from "../../types/scene";
import { BuiltInComponentFactory } from "./builtInComponents";
import { StringField } from "./propertyField";

interface ComponentItemProps {
    component: EntityComponent;
}

const ComponentItem = ({ component }: ComponentItemProps) => {
    const { entityInspector, toggleComponentCollapsed, setComponentEnabled, updateComponentProperty } = useEditor();

    const isBuiltIn = component.builtIn;
    const isCollapsed = entityInspector.collapsedComponents.has(component.id);

    const handleToggleEnabled = () => {
        setComponentEnabled(component.id, !component.enabled);
    };

    const handleToggleCollapse = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleComponentCollapsed(component.id);
    };

    return (
        <div className="border rounded-lg transition-colors border-border-primary hover:border-primary-200">
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

            {!isCollapsed && (
                <div className="px-3 pb-3 border-t border-border-primary">
                    <div className="space-y-2 mt-2">
                        {isBuiltIn ? (
                            <BuiltInComponentFactory component={component} />
                        ) : (
                            component.data &&
                            Object.keys(component.data).length > 0 &&
                            Object.entries(component.data).map(([key, value]) => (
                                <StringField
                                    key={key}
                                    propertyName={key}
                                    value={typeof value === "object" ? JSON.stringify(value) : String(value)}
                                    onUpdate={(newValue: unknown) => {
                                        updateComponentProperty(component.id, key, newValue);
                                    }}
                                />
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ComponentItem;
