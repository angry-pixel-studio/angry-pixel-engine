import { useEffect, useRef } from "react";
import { createGame } from "../../utils/sceneEditorGame";
import { Game } from "angry-pixel";
import { useSceneStore } from "../../stores/sceneStore";

const SceneEditor = () => {
    const divRef = useRef<HTMLDivElement>(null);
    const gameRef = useRef<Game | undefined>(undefined);

    useEffect(() => {
        if (divRef.current) {
            gameRef.current = createGame({
                containerNode: divRef.current,
                width: 1920,
                height: 1080,
                canvasColor: "#334155",
            });
            gameRef.current.addDependencyInstance(useSceneStore, "useSceneStore");
            gameRef.current.start();
        }

        return () => {
            gameRef.current?.stop();
            gameRef.current = undefined;
            if (divRef.current) {
                divRef.current.innerHTML = "";
            }
        };
    }, []);

    return <div className="scene-editor" ref={divRef}></div>;
};

export default SceneEditor;
