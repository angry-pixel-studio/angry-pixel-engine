import { useEditorStore } from "./stores/editorStore";
import ResizablePanel from "./components/ui/ResizablePanel";
import SceneTreeTabs from "./components/sceneTree/SceneTreeTabs";
import InspectorTabs from "./components/inspector/InspectorTabs";
import ThemeToggle from "./components/ui/ThemeToggle";
import { Folder } from "lucide-react";
import Icon from "./components/ui/Icon";
import SceneEditor from "./components/sceneEditor";

function App() {
    const { panelSizes, setPanelSize } = useEditorStore();

    return (
        <div className="h-screen bg-background-primary flex flex-col relative">
            {/* Header */}
            <header className="bg-surface-primary border-b border-border-primary px-6 py-4 z-20">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                            <span className="text-text-inverse font-bold text-sm">AP</span>
                        </div>
                        <h1 className="text-xl font-semibold text-text-primary">Angry Pixel Editor</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            {/* Main Content - 2 columnas principales */}
            <div className="flex-1 flex overflow-hidden relative">
                {/* Columna Izquierda - Scene Tree + Filesystem Navigator */}
                <div className="flex-1 flex flex-col">
                    {/* Fila Superior - Scene Tree */}
                    <div className="flex-1 flex">
                        {/* Scene Tree - Resizable desde el borde derecho */}
                        <ResizablePanel
                            direction="horizontal"
                            initialSize={panelSizes.sceneTree}
                            minSize={256}
                            maxSize={400}
                            resizeHandlePosition="right"
                            className="bg-surface-primary border-r border-border-primary flex flex-col z-10"
                            onResize={(size) => setPanelSize("sceneTree", size)}
                        >
                            <SceneTreeTabs />
                        </ResizablePanel>
                    </div>

                    {/* Fila Inferior - Filesystem Navigator - Resizable desde el borde superior */}
                    <ResizablePanel
                        direction="vertical"
                        initialSize={panelSizes.filesystemNav}
                        minSize={200}
                        maxSize={320}
                        resizeHandlePosition="top"
                        className="bg-surface-primary border-t border-border-primary z-10"
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

                {/* Columna Derecha - Entity Inspector */}
                <ResizablePanel
                    direction="horizontal"
                    initialSize={panelSizes.entityInspector}
                    minSize={380}
                    maxSize={600}
                    resizeHandlePosition="left"
                    className="bg-surface-primary border-l border-border-primary flex flex-col z-10"
                    onResize={(size) => setPanelSize("entityInspector", size)}
                >
                    <InspectorTabs />
                </ResizablePanel>
            </div>

            {/* SceneEditor - Posicionado absolutamente por debajo de todo, centrado con 16:9 */}
            <div className="absolute inset-0 z-0">
                <div className="flex items-center justify-center">
                    <div
                        className="relative w-full h-full translate-y-[-15%] translate-x-[-5%]"
                        style={{ aspectRatio: "16/9" }}
                    >
                        <SceneEditor />
                    </div>
                </div>
            </div>

            {/* Status Bar */}
            <footer className="bg-surface-primary border-t border-border-primary px-6 py-2 z-20">
                <div className="flex items-center justify-between text-sm text-text-secondary">
                    <span>Ready</span>
                    <span>Starting fresh...</span>
                </div>
            </footer>
        </div>
    );
}

export default App;
