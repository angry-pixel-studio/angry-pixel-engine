import Component from "../../Engine/Component";
import Camera from "../../Engine/Components/Camera";
import { TAG_PLAYER } from "../../Demo/GameObjects/Player";
import Foreground from "../../Demo/GameObjects/Foreground";

export default class FollowPlayerCamera extends Component {
    camera = null;
    player = null;
    foreground = null;

    constructor(gameObject) {
        super(gameObject);

        this.camera = gameObject.getComponent(Camera.name);
    }

    start() {
        this.player = this.gameObject.scene.getGameObjectByTag(TAG_PLAYER);
        this.foreground = this.gameObject.scene.getGameObject(Foreground.name);
    }

    update(event)  {
        let x = (this.foreground.width - event.canvas.width) / 2
        let y = (this.foreground.height - event.canvas.height) / 2

        x = x < 0 ? event.canvas.width / 2 : x;
        y = x < 0 ? event.canvas.height / 2 : x;
        
        this.gameObject.transform.position.x = this.clamp(this.player.transform.position.x, -x, x);
        this.gameObject.transform.position.y = this.clamp(this.player.transform.position.y, -y, y);
    }

    clamp (number, min, max) {
        return Math.max(min, Math.min(number, max));
    }
}