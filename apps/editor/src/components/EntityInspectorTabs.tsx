import Tabs, { Tab } from "./Tabs";
import { FileText, Cpu, Radio } from "lucide-react";
import Icon from "./icons/Icon";

const EntityInspectorTabs = () => {
    const tabs: Tab[] = [
        {
            id: "components",
            label: "Components",
            icon: FileText,
            content: (
                <div className="p-4">
                    <div className="text-center text-text-secondary">
                        <div className="mb-2 flex justify-center">
                            <Icon icon={FileText} size="2xl" variant="primary" />
                        </div>
                        <div className="text-sm font-medium">Components</div>
                        <div className="text-xs">Entity components and values</div>
                        <div className="mt-4 text-xs text-text-tertiary">Components of the selected entity</div>
                    </div>
                </div>
            ),
        },
    ];

    const handleTabChange = (tabId: string) => {
        console.log(`Entity Inspector tab changed to: ${tabId}`);
        // Aquí puedes agregar lógica específica del Entity Inspector
    };

    return (
        <Tabs
            tabs={tabs}
            defaultTab="components"
            onTabChange={handleTabChange}
            variant="compact"
            size="sm"
            className="h-full"
        />
    );
};

export default EntityInspectorTabs;
