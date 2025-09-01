import Tabs, { Tab } from "../ui/Tabs";
import { FileText } from "lucide-react";
import EntityInspectorTab from "./EntityInspectorTab";

const InspectorTabs = () => {
    const tabs: Tab[] = [
        {
            id: "entityInspector",
            label: "Entity Inspector",
            icon: FileText,
            content: <EntityInspectorTab />,
        },
    ];

    const handleTabChange = (tabId: string) => {
        console.log(`Tab changed to: ${tabId}`);
        // Aquí puedes agregar lógica adicional cuando cambie la pestaña
    };

    return (
        <Tabs
            tabs={tabs}
            defaultTab="entityInspector"
            onTabChange={handleTabChange}
            variant="compact"
            size="md"
            className="h-full"
        />
    );
};

export default InspectorTabs;
