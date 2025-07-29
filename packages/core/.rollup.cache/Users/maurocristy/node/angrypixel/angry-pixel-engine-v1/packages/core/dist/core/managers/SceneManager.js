import { Exception } from "../../utils/Exception";
import { FrameEvent } from "./IterationManager";
/** @internal */
export class SceneManager {
    constructor(container, renderManager) {
        this.container = container;
        this.renderManager = renderManager;
        this.scenes = new Map();
        this.sceneNamePendingToLoad = null;
    }
    /**
     * @inheritdoc
     */
    addScene(sceneClass, name, options, openingScene = false) {
        if (this.scenes.has(name)) {
            throw new Exception(`There is already a scene with the name '${name}'`);
        }
        this.scenes.set(name, () => {
            const scene = new sceneClass(this.container, name, this.container.getConstant("Game"));
            this.currentScene = scene;
            scene.dispatch(FrameEvent.Init, options);
            return scene;
        });
        if (openingScene || !this.openingSceneName) {
            this.openingSceneName = name;
        }
    }
    /**
     * @inheritdoc
     */
    loadScene(name) {
        if (this.scenes.has(name) === false) {
            throw new Exception(`Scene with name ${name} does not exists`);
        }
        this.sceneNamePendingToLoad = name;
    }
    /**
     * @inheritdoc
     */
    getLoadedScene() {
        return this.currentScene;
    }
    /**
     * @inheritdoc
     */
    loadOpeningScene() {
        if (this.openingSceneName === null) {
            throw new Exception(`There is no opening scene`);
        }
        this.scenes.get(this.openingSceneName)();
    }
    /**
     * @inheritdoc
     */
    pendingSceneToload() {
        return this.sceneNamePendingToLoad !== null;
    }
    /**
     * @inheritdoc
     */
    loadPendingScene() {
        if (!this.sceneNamePendingToLoad)
            return;
        this.scenes.get(this.sceneNamePendingToLoad)();
        this.sceneNamePendingToLoad = null;
    }
    /**
     * @inheritdoc
     */
    unloadCurrentScene() {
        if (!this.currentScene)
            return;
        this.currentScene.dispatch(FrameEvent.Destroy);
        this.currentScene = undefined;
    }
}
//# sourceMappingURL=SceneManager.js.map