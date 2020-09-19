import Component from "./../../Component";
import ICollider from "./../../Core/Collision/ICollider";
import Rectangle from "./../../Helper/Rectangle";

interface Config {
    width: number;
    height: number;
};

export default class RectangleCollider extends Component {
    private rectangle: Rectangle;

    constructor({ width, height }: Config) {
        super();

        this.rectangle = new Rectangle(
            0,
            0,
            width,
            height
        );
    }

    start(event: { [key: string]: any }): void {
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
