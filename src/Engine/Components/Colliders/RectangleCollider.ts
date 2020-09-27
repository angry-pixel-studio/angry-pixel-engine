import Component from "./../../Component";
import { LAYER_DEFAULT } from "../../GameObject";
import RenderData, { GEOMETRIC_RECTANGLE } from "../../Core/Rendering/RenderData";
import Rectangle from "./../../Helper/Rectangle";
import Vector2 from "./../../Helper/Vector2";
import CollisionManager from "../../Core/Collision/CollisionManager";
import IColliderData, { GeometricShape } from "../../Core/Collision/IColliderData";

interface Config {
    x: number;
    y: number;
    width: number;
    height: number;
    offsetX: number;
    offsetY: number;
    layer: string | null;
}

export default class RectangleCollider extends Component {
    private rectangle: Rectangle;
    private renderData: RenderData;
    private colliderData: IColliderData;

    private offsetX: number;
    private offsetY: number;

    private layer: string;

    private collisionManager: CollisionManager;

    constructor({ x = 0, y = 0, width, height, offsetX = 0, offsetY = 0, layer }: Config) {
        super();

        this.setColliderData(x + offsetX, y + offsetY, width, height);

        this.rectangle = new Rectangle(x, y, width, height);
        this.renderData = new RenderData();
        this.renderData.position = new Vector2(0, 0);

        this.offsetX = offsetX;
        this.offsetY = offsetY;

        this.layer = layer;
    }

    protected start(event: { [key: string]: any }): void {
        this.collisionManager = event.collisionManager;
        this.collisionManager.addCollider(this, this.colliderData);

        this.setupRenderData();
        this.updateRectangleCoordinates();
        this.updateRenderDataPosition();

        if (this.layer === null && this.gameObject !== null) {
            this.layer = this.gameObject.layer;
        }
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

    public getBottomLeftPoint(): Vector2 {
        return this.colliderData.points[0];
    }

    public getBottomRightPoint(): Vector2 {
        return this.colliderData.points[1];
    }

    public getTopLeftPoint(): Vector2 {
        return this.colliderData.points[2];
    }

    public getTopRightPoint(): Vector2 {
        return this.colliderData.points[3];
    }

    private updateRenderDataPosition() {
        this.renderData.position.x = this.rectangle.x;
        this.renderData.position.y = this.rectangle.y;
    }

    private updateRectangleCoordinates() {
        if (this.gameObject === null) {
            return;
        }

        this.rectangle.x = this.gameObject.transform.position.x - this.rectangle.width / 2 - this.offsetX;
        this.rectangle.y = this.gameObject.transform.position.y - this.rectangle.height / 2 - this.offsetY;
        this.setColliderData(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
    }

    private setColliderData(x: number, y: number, width: number, height: number): void {
        this.colliderData = {
            points: [
                new Vector2(x, y),
                new Vector2(x + width, y),
                new Vector2(x, y + height),
                new Vector2(x + width, y + height),
            ],
            type: GeometricShape.parallelogram,
        };
    }

    // TODO: find a nicer way to setup the render data
    private setupRenderData(): void {
        this.renderData.layer = LAYER_DEFAULT;
        this.renderData.geometric = this.rectangle;
        this.renderData.geometricType = GEOMETRIC_RECTANGLE;
        this.renderData.color = "#00FF00";
    }
}
