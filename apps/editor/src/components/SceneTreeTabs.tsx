import Tabs, { Tab } from "./Tabs";
import { TreePine, Cpu } from "lucide-react";
import Icon from "./icons/Icon";

const SceneTreeTabs = () => {
    const tabs: Tab[] = [
        {
            id: "entities",
            label: "Entities",
            icon: TreePine,
            content: (
                <div className="p-4">
                    <div className="text-center text-text-secondary">
                        <div className="mb-2 flex justify-center">
                            <Icon icon={TreePine} size="2xl" variant="primary" />
                        </div>
                        <div className="text-sm font-medium">Entities</div>
                        <div className="text-xs">Game objects and actors</div>
                        <div className="mt-4 text-xs text-text-tertiary">Lista de entidades en la escena</div>
                    </div>
                </div>
            ),
        },
        {
            id: "systems",
            label: "Systems",
            icon: Cpu,
            content: (
                <div className="p-4">
                    <div className="text-center text-text-secondary">
                        <div className="mb-2 flex justify-center">
                            <Icon icon={Cpu} size="2xl" variant="primary" />
                        </div>
                        <div className="text-sm font-medium">Systems</div>
                        <div className="text-xs">Game logic and behavior</div>
                        <div className="mt-4 text-xs text-text-tertiary">Sistemas de lógica del juego</div>
                    </div>
                </div>
            ),
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
