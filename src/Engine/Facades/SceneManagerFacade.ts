import { SceneManager } from "../Core/Scene/SceneManager";
import { container } from "../Game";

export class SceneManagerFacade {
    private static sceneManager: SceneManager = null;

    public static initialize(): void {
        this.sceneManager = container.getSingleton<SceneManager>("SceneManager");
    }

    public static loadScene(name: string): void {
        this.sceneManager.loadScene(name);
    }

    public static getCurrentSceneName(): string {
        return this.sceneManager.currentSceneName;
    }

    public static loadOpeningScene(): void {
        this.sceneManager.loadOpeningScene();
    }
}
