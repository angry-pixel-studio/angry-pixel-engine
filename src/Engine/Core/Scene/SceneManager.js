export default class SceneManager {
    game = null;
    scenes = [];
    currentScene = null;
    currentSceneId = null;
    openingSceneId = null;

    constructor(game) {
        this.game = game;
    }

    addScene(sceneId, sceneFunction, openingScene = false) {
        this.scenes[sceneId] = sceneFunction;
        
        if (openingScene === true || this.openingSceneId === null) {
            this.openingSceneId = sceneId;
        }
    }

    loadOpeningScene() {
        this.loadScene(this.openingSceneId);
    }

    loadScene(sceneId) {
        const resetLoop = this.game.running;
        
        if (resetLoop) {
            this.game.stopLoop();
        }
        
        this.unloadCurrentScene();
        this.currentScene = this.scenes[sceneId]();
        this.currentScene.id = sceneId;
        this.currentScene.game = this.game;
        
        if (resetLoop) {
            this.game.resumeLoop(true);
        }
    }

    unloadCurrentScene() {
        if (this.currentScene !== null) {
            this.currentScene._destroy();
            this.currentScene = null;
            this.currentSceneId = null;

            this.game.renderManager.clearRenderStack();
        }   
    }
}