import Scene from "../../Engine/Scene";
import SpotPointer from "../GameObjects/SpotPointer";
import FollowPlayerCamera from "../Components/FollowPlayerCamera";
import PlayerTop from "../GameObjects/PlayerTop";
import ForegroundTopDown from "../GameObjects/ForegroundTopDown";
import renderLayers from "../Config/renderLayers";
import Bot from "../GameObjects/Bot";
import InputManager from "../GameObjects/InputManager";
import PlayerStats from "../GameObjects/UI/PlayerStats";
import { container } from "../../Engine/Game";
import MusicPlayer from "../GameObjects/MusicPlayer";

export default class TopDown extends Scene {
    assetManager = container.getSingleton("AssetManager");
    assetsLoaded = false;
    gameObjectsLoaded = false;

    constructor() {
        super();

        this.loadAssets();
    }

    start() {
        this.update();
    }

    update() {
        if (this.assetsLoaded === false) {
            console.log("loading");
            this.assetsLoaded = this.assetManager.getAssetsLoaded();
        }

        if (this.assetsLoaded && this.gameObjectsLoaded === false) {
            this.setupGameObjects();
            this.gameObjectsLoaded = true;
        }
    }

    loadAssets() {
        this.assetManager.createImage("image/demo/earth-cave.png");
        this.assetManager.createImage("image/demo/player-top-down.png");
        this.assetManager.createImage("image/demo/projectile.png");
        this.assetManager.createImage("image/demo/avatar.png");
        this.assetManager.createAudio("audio/footsteps.wav");
        this.assetManager.createAudio("audio/gunshot.wav");
        this.assetManager.createAudio("audio/music.wav");
    }

    setupGameObjects() {
        this.addGameObject(() => new ForegroundTopDown(), "Foreground")
            //.addGameObject(() => new MusicPlayer(), "MusicPlayer")
            //.addGameObject(() => new SpotPointer(), "SpotPointer")
            .addGameObject(() => new InputManager(), "InputManager")
            .addGameObject(() => new PlayerTop(), "Player")
            .addGameObject(() => new PlayerStats(), "PlayerStats");

        this.setUpBots();

        this.gameCamera.camera.renderLayers = renderLayers;
        this.gameCamera.addComponent(() => new FollowPlayerCamera());
    }

    setUpBots() {
        this.addGameObject(() => new Bot(690, 385), "Bot01")
            .addGameObject(() => new Bot(-820, 500), "Bot02")
            .addGameObject(() => new Bot(690, -385), "Bot03")
            .addGameObject(() => new Bot(-820, -500), "Bot04");
    }
}
