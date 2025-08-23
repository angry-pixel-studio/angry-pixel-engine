import { Download } from "lucide-react";
import Icon from "./Icon";
import { useEditor } from "../hooks/useEditor";

const SaveSceneButton = () => {
    const { getSceneJson } = useEditor();

    const handleSave = () => {
        const sceneJson = getSceneJson();
        const blob = new Blob([sceneJson], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement("a");
        a.href = url;
        a.download = "scene.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors"
            title="Save scene as JSON"
        >
            <Icon icon={Download} size="sm" />
            <span>Save Scene</span>
        </button>
    );
};

export default SaveSceneButton;
