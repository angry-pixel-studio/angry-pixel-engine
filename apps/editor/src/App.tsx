import { useEditorStore } from "./stores/editorStore";
import ResizablePanel from "./components/ResizablePanel";
import SceneTreeTabs from "./components/SceneTreeTabs";
import EntityInspectorTabs from "./components/EntityInspectorTabs";
import ThemeToggle from "./components/ThemeToggle";
import { Layout, Folder, Search } from "lucide-react";
import Icon from "./components/icons/Icon";

function App() {
    const { panelSizes, setPanelSize } = useEditorStore();

    return (
        <div className="h-screen bg-background-primary flex flex-col">
            {/* Header */}
            <header className="bg-surface-primary border-b border-border-primary px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                            <span className="text-text-inverse font-bold text-sm">AP</span>
                        </div>
                        <h1 className="text-xl font-semibold text-text-primary">Angry Pixel Editor</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="btn-primary">Save Scene</button>
                        <button className="btn-secondary">Export</button>
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            {/* Main Content - 2 columnas principales */}
            <div className="flex-1 flex overflow-hidden">
                {/* Columna Izquierda - Scene Tree + Scene Preview + Filesystem Navigator */}
                <div className="flex-1 flex flex-col">
                    {/* Fila Superior - Scene Tree + Scene Preview */}
                    <div className="flex-1 flex">
                        {/* Scene Tree - Resizable desde el borde derecho */}
                        <ResizablePanel
                            direction="horizontal"
                            initialSize={panelSizes.sceneTree}
                            minSize={150}
                            maxSize={400}
                            resizeHandlePosition="right"
                            className="bg-surface-primary border-r border-border-primary flex flex-col"
                            onResize={(size) => setPanelSize("sceneTree", size)}
                        >
                            <SceneTreeTabs />
                        </ResizablePanel>

                        {/* Scene Preview + Editor - Resizable desde ambos bordes */}
                        <div className="flex-1 flex flex-col">
                            <div className="flex-1 flex items-center justify-center bg-background-secondary">
                                <div className="text-center text-text-secondary">
                                    <div className="mb-3 flex justify-center">
                                        <Icon icon={Layout} size="2xl" variant="primary" />
                                    </div>
                                    <div className="text-lg font-medium">Scene Preview + Editor</div>
                                    <div className="text-sm">Main editing area</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Fila Inferior - Filesystem Navigator - Resizable desde el borde superior */}
                    <ResizablePanel
                        direction="vertical"
                        initialSize={panelSizes.filesystemNav}
                        minSize={120}
                        maxSize={400}
                        resizeHandlePosition="top"
                        className="bg-surface-primary border-t border-border-primary"
                        onResize={(size) => setPanelSize("filesystemNav", size)}
                    >
                        <div className="h-full flex items-center justify-center">
                            <div className="text-center text-text-secondary">
                                <div className="mb-2 flex justify-center">
                                    <Icon icon={Folder} size="2xl" variant="primary" />
                                </div>
                                <div className="text-base font-medium">Filesystem Navigator</div>
                                <div className="text-xs">Component placeholder</div>
                            </div>
                        </div>
                    </ResizablePanel>
                </div>

                {/* Columna Derecha - Entity Inspector - Resizable desde el borde izquierdo */}
                <ResizablePanel
                    direction="horizontal"
                    initialSize={panelSizes.entityInspector}
                    minSize={200}
                    maxSize={600}
                    resizeHandlePosition="left"
                    className="bg-surface-primary border-l border-border-primary flex flex-col"
                    onResize={(size) => setPanelSize("entityInspector", size)}
                >
                    <EntityInspectorTabs />
                </ResizablePanel>
            </div>

            {/* Status Bar */}
            <footer className="bg-surface-primary border-t border-border-primary px-6 py-2">
                <div className="flex items-center justify-between text-sm text-text-secondary">
                    <span>Ready</span>
                    <span>Starting fresh...</span>
                </div>
            </footer>
        </div>
    );
}

export default App;
