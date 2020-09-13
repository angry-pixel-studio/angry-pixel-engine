import Scene from "../../Engine/Scene";
import SpotPointer from "../GameObjects/SpotPointer";
import FollowPlayerCamera from "../Components/FollowPlayerCamera";
import PlayerTop from "../GameObjects/PlayerTop";
import ForegroundTopDown from "../GameObjects/ForegroundTopDown";
import renderLayers from '../Config/renderLayers';
import Bot from "../GameObjects/Bot";

export default class TopDown extends Scene {

    constructor() {
        super();

        this.addGameObject(() => new ForegroundTopDown(), 'Foreground')
            //.addGameObject(() => new SpotPointer(), 'SpotPointer')
            .addGameObject(() => new PlayerTop(), 'Player')
            .addGameObject(() => new Bot(), 'Bot');

        this.gameCamera.camera.renderLayers = renderLayers;
        this.gameCamera.addComponent(() => new FollowPlayerCamera());
    }

    start(event) {
        event.game.canvasBGColor = '#080500';
    }
}