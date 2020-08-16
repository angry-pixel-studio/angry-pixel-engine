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
        this.unloadCurrentScene();
        this.currentScene = this.scenes[sceneId](sceneId, this.game);
    }

    unloadCurrentScene() {
        console.log('unloading');

        if (this.currentScene !== null) {
            this.currentScene.destroy();
            this.currentScene = null;
            this.currentSceneId = null;
        }   
    }
}