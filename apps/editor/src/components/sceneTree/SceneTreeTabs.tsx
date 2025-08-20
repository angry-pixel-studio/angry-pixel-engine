import Tabs, { Tab } from "../Tabs";
import { Box, Cpu } from "lucide-react";
import EntityTree from "./EntityTree";
import SystemsList from "./SystemsList";

const SceneTreeTabs = () => {
    const tabs: Tab[] = [
        {
            id: "entities",
            label: "Entities",
            icon: Box,
            content: <EntityTree />,
        },
        {
            id: "systems",
            label: "Systems",
            icon: Cpu,
            content: <SystemsList />,
        },
    ];

    const handleTabChange = (tabId: string) => {
        console.log(`Tab changed to: ${tabId}`);
        // Aquí puedes agregar lógica adicional cuando cambie la pestaña
    };

    return (
        <Tabs
            tabs={tabs}
            defaultTab="entities"
            onTabChange={handleTabChange}
            variant="default"
            size="md"
            className="h-full"
        />
    );
};

export default SceneTreeTabs;
