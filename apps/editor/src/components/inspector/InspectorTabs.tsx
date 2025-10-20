import Tabs, { Tab } from "../ui/Tabs";
import { FileText, Layers } from "lucide-react";
import EntityInspectorTab from "./EntityInspectorTab";
import LayersTab from "./LayersTab";
import { useEditorStore } from "../../stores/editorStore";

const InspectorTabs = () => {
    const { activeInspectorTab, setActiveInspectorTab } = useEditorStore();

    const tabs: Tab[] = [
        {
            id: "entityInspector",
            label: "Entity Inspector",
            icon: FileText,
            content: <EntityInspectorTab />,
        },
        {
            id: "layers",
            label: "Layers",
            icon: Layers,
            content: <LayersTab />,
        },
    ];

    const handleTabChange = (tabId: string) => {
        setActiveInspectorTab(tabId);
    };

    return (
        <Tabs
            tabs={tabs}
            activeTab={activeInspectorTab}
            onTabChange={handleTabChange}
            variant="compact"
            size="md"
            className="h-full"
        />
    );
};

export default InspectorTabs;
