import Component from "../../Component";
import ICollider from "../../Core/Collision/ICollider";
import Rectangle from "../../Helper/Rectangle";

export default class RectangleCollider extends Component {
    private rectangle: Rectangle;

    start(event: { [key: string]: any }): void {
        this.rectangle = new Rectangle(0, 0, 10, 10);
        event.collisionManager.addCollider(this);
    }

    update(event: { [key: string]: any }): void {
        this.rectangle.x = this.gameObject.transform.position.x;
        this.rectangle.y = this.gameObject.transform.position.y;
    }

    public collidesWith(other: ICollider): boolean {
        return true;
    }

    public getRectangle(): Rectangle {
        return this.rectangle;
    }
}
