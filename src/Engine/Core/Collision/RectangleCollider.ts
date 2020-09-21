import { LAYER_DEFAULT } from "../../GameObject";
import Rectangle from "../../Helper/Rectangle";
import Vector2 from "../../Helper/Vector2";
import RenderData, { GEOMETRIC_RECTANGLE } from "../Rendering/RenderData";
import ICollider from "./ICollider";

interface Config {
    x: number;
    y: number;
    width: number;
    height: number;
    layer: string;
}

// TODO: unify this with the other RectangleCollider
export default class RectangleCollider {
    private rectangle: Rectangle;
    private renderData: RenderData;
    private layer: string;

    // TODO: change any for a proper type
    private collisions: Array<any> = [];

    constructor({ x, y, width, height, layer }: Config) {
        this.rectangle = new Rectangle(x, y * -1, width, height);
        this.layer = layer;

        this.setupRenderData();
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

    public addCollision(collider: ICollider): void {
        this.collisions.push(collider);
    }

    public clearCollisions(): void {
        this.collisions = [];
    }

    // TODO: find a nicer way to setup the render data
    private setupRenderData(): void {
        this.renderData = new RenderData();
        this.renderData.position = new Vector2(this.rectangle.x, this.rectangle.y);
        this.renderData.layer = LAYER_DEFAULT;
        this.renderData.geometric = this.rectangle;
        this.renderData.geometricType = GEOMETRIC_RECTANGLE;
        this.renderData.color = '#00FF00';
    }
}
