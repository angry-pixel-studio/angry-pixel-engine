import Component from "../Component";
import Vector2 from "../Helper/Vector2";

export default class Transform extends Component {
    position = new Vector2(0, 0);
    scale = new Vector2(1, 1);
    innerPosition = new Vector2(0, 0);

    start() {
        this.update();
    }

    update() {
        if (this.gameObject.parent !== null) {
            this.position.x = this.gameObject.parent.transform.position.x + this.innerPosition.x;
            this.position.y = this.gameObject.parent.transform.position.y + this.innerPosition.y;
        } else {
            this.innerPosition.x = this.position.x;
            this.innerPosition.y = this.position.y;
        }
    }
}