export declare class SceneManagerFacade {
    private static sceneManager;
    static initialize(): void;
    static loadScene(name: string): void;
    static getCurrentSceneName(): string;
    static loadOpeningScene(): void;
}
