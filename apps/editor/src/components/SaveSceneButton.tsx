import { useEditorStore } from "../stores/editorStore";
import { Save } from "lucide-react";
import Icon from "./Icon";

const SaveSceneButton = () => {
    const { scene } = useEditorStore();

    const handleSave = () => {
        try {
            // Create a downloadable file with the scene data
            const sceneData = JSON.stringify(scene, null, 2);
            const blob = new Blob([sceneData], { type: "application/json" });
            const url = URL.createObjectURL(blob);

            // Create download link
            const a = document.createElement("a");
            a.href = url;
            a.download = `${scene.name.replace(/\s+/g, "-").toLowerCase()}.json`;
            document.body.appendChild(a);
            a.click();

            // Cleanup
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            console.log("Scene saved successfully:", scene.name);
        } catch (error) {
            console.error("Error saving scene:", error);
        }
    };

    return (
        <button className="btn-primary flex items-center space-x-2" onClick={handleSave} title="Save Scene">
            <Icon icon={Save} size="sm" />
            <span>Save Scene</span>
        </button>
    );
};

export default SaveSceneButton;
