import { SceneManager } from "../Core/Scene/SceneManager";
import { container } from "../Game";

export class SceneManagerFacade {
    private static sceneManager: SceneManager = null;

    public static initialize(): void {
        this.sceneManager = container.getSingleton<SceneManager>("SceneManager");
    }

    /**
     * Unload the current scene and load the new scene
     * @param name The scene name to load
     */
    public static loadScene(name: string): void {
        this.sceneManager.loadScene(name);
    }

    /**
     * @returns The name of the current scene
     */
    public static getCurrentSceneName(): string {
        return this.sceneManager.currentSceneName;
    }

    /**
     * Load the opening scene
     */
    public static loadOpeningScene(): void {
        this.sceneManager.loadOpeningScene();
    }
}
