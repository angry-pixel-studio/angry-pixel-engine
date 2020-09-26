import Component from "../Component";
import Vector2 from "../Helper/Vector2";

export default class Transform extends Component {
    public position: Vector2 = new Vector2(0, 0);
    public innerPosition: Vector2 = new Vector2(0, 0);
    public scale: Vector2 = new Vector2(1, 1);
    public rotation: number = 0;

    private parentTransform: Transform = null;

    start(): void {
        this.update();
    }

    update(): void {
        if (this.parentTransform === null && this.gameObject.parent !== null) {
            this.parentTransform = this.gameObject.parent.transform;
        }

        if (this.parentTransform !== null && this.gameObject.parent === null) {
            this.parentTransform = null;
        }

        if (this.parentTransform !== null) {
            this.position.x = this.parentTransform.position.x + this.innerPosition.x;
            this.position.y = this.parentTransform.position.y + this.innerPosition.y;
            this.translateFromParent();
        } else {
            this.innerPosition.x = this.position.x;
            this.innerPosition.y = this.position.y;
        }
    }

    private translateFromParent(): void {
        const angle: number = (this.parentTransform.rotation * Math.PI) / 180.0;
        const radius: number = Math.hypot(
            this.position.x - this.parentTransform.position.x,
            this.position.y - this.parentTransform.position.y
        );

        (this.position.x = this.parentTransform.position.x + radius * Math.cos(angle)),
            (this.position.y = this.parentTransform.position.y - radius * Math.sin(angle));
        this.rotation = this.parentTransform.rotation;
    }
}
