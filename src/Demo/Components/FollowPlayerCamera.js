import Component from "../../Engine/Component";
import { TAG_PLAYER } from "../../Demo/GameObjects/PlayerTop";
import Game from "../../Engine/Game";

export default class FollowPlayerCamera extends Component {
    canvas = Game.get("Canvas");
    player = null;
    foreground = null;

    start() {
        this.player = this.gameObject.findGameObjectByTag(TAG_PLAYER);
        this.foreground = this.gameObject.findGameObjectByTag("Foreground");
    }

    update() {
        let x = (this.foreground.width - this.canvas.width) / 2;
        let y = (this.foreground.height - this.canvas.height) / 2;

        x = x < 0 ? this.canvas.width / 2 : x;
        y = x < 0 ? this.canvas.height / 2 : x;

        //this.gameObject.transform.position.x = this.clamp(this.player.transform.position.x, -x, x);
        //this.gameObject.transform.position.y = this.clamp(this.player.transform.position.y, -y, y);

        this.gameObject.transform.position.x = this.player.transform.position.x;
        this.gameObject.transform.position.y = this.player.transform.position.y;
    }

    clamp(number, min, max) {
        return Math.max(min, Math.min(number, max));
    }
}
