import Component from "./../../Component";
import { LAYER_DEFAULT } from "../../GameObject";
import RenderData, { GEOMETRIC_RECTANGLE } from "../../Core/Rendering/RenderData";
import Rectangle from "./../../Helper/Rectangle";
import Vector2 from "./../../Helper/Vector2";
import CollisionManager from "../../Core/Collision/CollisionManager";

interface Config {
    width: number;
    height: number;
    offsetX: number;
    offsetY: number;
};

// TODO: unify this with the other RectangleCollider
export default class RectangleCollider extends Component {
    private rectangle: Rectangle;
    private renderData: RenderData;

    private offsetX: number;
    private offsetY: number;

    private layer: string;

    private collisionManager: CollisionManager;

    constructor({ width, height, offsetX = 0, offsetY = 0 }: Config) {
        super();

        this.rectangle = new Rectangle(0, 0, width, height);
        this.renderData = new RenderData();
        this.renderData.position = new Vector2(0, 0);

        this.offsetX = offsetX;
        this.offsetY = offsetY;
    }

    protected start(event: { [key: string]: any }): void {
        this.collisionManager = event.collisionManager;

        this.collisionManager.addCollider(this);

        this.setupRenderData();
        this.updateRectangleCoordinates();
        this.updateRenderDataPosition();

        this.layer = this.gameObject.layer;
    }

    protected update(event: { [key: string]: any }): void {
        this.updateRectangleCoordinates();
        this.updateRenderDataPosition();
    }

    public collidesWithLayer(layer: string): boolean {
        this.updateRectangleCoordinates();
        const collisions = this.collisionManager.getCollisionsForCollider(this);
        for (const c of collisions) {
            if (c.getLayer() === layer) {
                return true;
            }
        }

        return false;
    }

    public getRectangle(): Rectangle {
        return this.rectangle;
    }

    public getRenderData(): RenderData {
        return this.renderData;
    }

    public getLayer(): string {
        return this.layer;
    }

    private updateRenderDataPosition() {
        this.renderData.position.x = this.rectangle.x;
        this.renderData.position.y = this.rectangle.y;
    }
    private updateRectangleCoordinates() {
        this.rectangle.x = this.gameObject.transform.position.x - (this.rectangle.width / 2) - this.offsetX;
        this.rectangle.y = this.gameObject.transform.position.y + (this.rectangle.height / 2) + this.offsetY
    }

    private setupRenderData(): void {
        this.renderData.layer = LAYER_DEFAULT;
        this.renderData.geometric = this.rectangle;
        this.renderData.geometricType = GEOMETRIC_RECTANGLE;
        this.renderData.color = '#00FF00';
    }
}
