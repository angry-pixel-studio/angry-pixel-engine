import Scene from "../../Engine/Scene";
import SpotPointer from "../GameObjects/SpotPointer";
import FollowPlayerCamera from "../Components/FollowPlayerCamera";
import PlayerTop from "../GameObjects/PlayerTop";
import ForegroundTopDown from "../GameObjects/ForegroundTopDown";
import renderLayers from '../Config/renderLayers';
import Bot from "../GameObjects/Bot";
import InputManager from "../GameObjects/InputManager";
import PlayerStats from "../GameObjects/UI/PlayerStats";

export default class TopDown extends Scene {

    constructor() {
        super();

        this.addGameObject(() => new ForegroundTopDown(), 'Foreground')
            //.addGameObject(() => new SpotPointer(), 'SpotPointer')
            .addGameObject(() => new InputManager(), 'InputManager')
            .addGameObject(() => new PlayerTop(), 'Player')
            .addGameObject(() => new PlayerStats(), 'PlayerStats')
            .addGameObject(() => new Bot(690, 385), 'Bot')
        /*.addGameObject(() => new Bot(710, 385), 'Bot')
        .addGameObject(() => new Bot(-900, 550), 'Bot')
        .addGameObject(() => new Bot(900, 550), 'Bot')
        .addGameObject(() => new Bot(900, -550), 'Bot')
        .addGameObject(() => new Bot(-900, -550), 'Bot');*/
        /*.addGameObject(() => new Bot(), 'Bot')
        .addGameObject(() => new Bot(), 'Bot')
        .addGameObject(() => new Bot(), 'Bot')
        .addGameObject(() => new Bot(), 'Bot');*/

        this.gameCamera.camera.renderLayers = renderLayers;
        this.gameCamera.addComponent(() => new FollowPlayerCamera());
    }

    start(event) {
        event.game.canvasBGColor = '#080500';
    }
}
