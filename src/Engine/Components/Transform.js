import Component from "../Component";
import Vector2 from "../Helper/Vector2";

export default class Transform extends Component {
    position = null;
    scale = null;

    constructor(gameObject) {
        super(gameObject);

        this.position = new Vector2(0, 0);
        this.scale = new Vector2(1, 1);
    }
}