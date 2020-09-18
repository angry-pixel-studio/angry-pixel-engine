import Component from "../../Component";
import ICollider from "../../Core/Collision/ICollider";
import GameObject from "../../GameObject";
import Rectangle from "../../Helper/Rectangle";

export default class RectangleCollider extends Component {
    private rectangle: Rectangle;
    private object: GameObject;

    constructor(object: GameObject) {
        super();
        this.object = object;
        this.rectangle = new Rectangle(0, 0, 10, 10);
    }

    start(event: { [key: string]: any }): void {
        event.collisionManager.addCollider(this);
    }

    update(event: { [key: string]: any }): void {
        this.rectangle.x = this.object.transform.position.x;
        this.rectangle.y = this.object.transform.position.y;
    }

    public collidesWith(other: ICollider): boolean {
        return true;
    }

    public getRectangle(): Rectangle {
        return this.rectangle;
    }
}
