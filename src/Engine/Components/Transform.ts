import { Component } from "../Component";
import { Vector2 } from "../Helper/Vector2";

export const TYPE_TRANSFORM: string = "Transform";

export class Transform extends Component {
    public position: Vector2 = new Vector2(0, 0);
    public innerPosition: Vector2 = new Vector2(0, 0);
    public scale: Vector2 = new Vector2(1, 1);
    public rotation: number = 0;

    private parentTransform: Transform = null;

    constructor() {
        super();

        this.allowMultiple = false;
        this.type = TYPE_TRANSFORM;
    }

    protected start(): void {
        this.update();
    }

    protected update(): void {
        if (this.parentTransform === null && this.gameObject.parent !== null) {
            this.parentTransform = this.gameObject.parent.transform;
        }

        if (this.parentTransform !== null && this.gameObject.parent === null) {
            this.parentTransform = null;
        }

        if (this.parentTransform !== null) {
            this.translateFromParent();
        } else {
            this.innerPosition.x = this.position.x;
            this.innerPosition.y = this.position.y;
        }
    }

    private translateFromParent(): void {
        const parentRad: number = (this.parentTransform.rotation * Math.PI) / 180.0;
        const thisRad: number = Math.atan2(this.innerPosition.x, this.innerPosition.y);
        const radius: number = Math.hypot(this.innerPosition.x, this.innerPosition.y);

        this.position.x = this.parentTransform.position.x + radius * Math.sin(thisRad - parentRad);
        this.position.y = this.parentTransform.position.y + radius * Math.cos(thisRad - parentRad);
        this.rotation = this.parentTransform.rotation;
    }

    public forceUpdate(): void {
        this.update();
    }
}
