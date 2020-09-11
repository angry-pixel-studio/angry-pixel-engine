import Component from "../Component";
import Vector2 from "../Helper/Vector2";

export default class Transform extends Component {
    public position: Vector2 = new Vector2(0, 0);
    public innerPosition: Vector2 = new Vector2(0, 0);
    public scale: Vector2 = new Vector2(1, 1);
    public rotation: number = 0;

    start(): void {
        this.update();
    }

    update(): void {
        if (this.gameObject.parent !== null) {
            this.position.x = this.gameObject.parent.transform.position.x + this.innerPosition.x;
            this.position.y = this.gameObject.parent.transform.position.y + this.innerPosition.y;
        } else {
            this.innerPosition.x = this.position.x;
            this.innerPosition.y = this.position.y;
        }
    }
}