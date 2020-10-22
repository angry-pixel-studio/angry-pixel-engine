import Component from "../../Component";
import { LAYER_DEFAULT } from "../../GameObject";
import GeometricRenderData, { GEOMETRIC_POLYGON } from "../../Core/Rendering/RenderData/GeometricRenderData";
import Vector2 from "./../../Helper/Vector2";
import CollisionManager from "./../../Core/Collision/CollisionManager";
import IColliderData, { GeometricShape } from "./../../Core/Collision/IColliderData";
import RenderManager from "./../../Core/Rendering/RenderManager";
import Game, { container } from "./../../Game";

interface Config {
    x: number;
    y: number;
    width: number;
    height: number;
    offsetX: number;
    offsetY: number;
    layer: string | null;
}

export default class TrapezoidCollider extends Component {
    private collisionManager: CollisionManager = container.getSingleton<CollisionManager>("CollisionManager");
    private renderManager: RenderManager = container.getSingleton<RenderManager>("RenderManager");

    private coordinates: Vector2;
    private width: number;
    private height: number;
    private offsetX: number;
    private offsetY: number;
    private layer: string;
    private debug: boolean = false;

    private colliderData: IColliderData;
    private renderData: GeometricRenderData;

    constructor({ x = 0, y = 0, width, height, offsetX = 0, offsetY = 0, layer }: Config) {
        super();

        this.coordinates = new Vector2(x, y);
        this.width = width;
        this.height = height;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.layer = layer;

        this.setColliderData(x + offsetX, y + offsetY, width, height);
    }

    protected start(): void {
        this.collisionManager.addCollider(this, this.colliderData);

        this.setupRenderData();
        this.updateCoordinates();

        if (this.layer === null && this.gameObject !== null) {
            this.layer = this.gameObject.layer;
        }
    }

    protected update(): void {
        this.updateCoordinates();

        if (this.debug) {
            this.renderManager.addToRenderStack(this.renderData);
        }
    }

    public collidesWithLayer(layer: string): boolean {
        this.updateCoordinates();
        const collisions = this.collisionManager.getCollisionsForCollider(this);
        for (const c of collisions) {
            if (c.getLayer() === layer) {
                return true;
            }
        }

        return false;
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

    public enableDebug(): void {
        this.debug = true;
    }

    public disableDebug(): void {
        this.debug = false;
    }

    private updateCoordinates() {
        if (this.gameObject === null) {
            return;
        }

        this.coordinates.x = this.gameObject.transform.position.x - this.width / 2 - this.offsetX;
        this.coordinates.y = this.gameObject.transform.position.y - this.height / 2 - this.offsetY;
        this.setColliderData(this.coordinates.x, this.coordinates.y, this.width, this.height);
        this.setupRenderData();
    }

    private setColliderData(x: number, y: number, width: number, height: number): void {
        this.colliderData = {
            points: [
                new Vector2(x, y),
                new Vector2(x + width, y),
                new Vector2(x, y + height),
                new Vector2(x + width, y + height),
            ],
            type: GeometricShape.polygon,
        };
    }

    private setupRenderData(): void {
        this.renderData = new GeometricRenderData();
        this.renderData.position = this.coordinates;
        this.renderData.layer = LAYER_DEFAULT;
        this.renderData.geometric = this.colliderData.points;
        this.renderData.geometricType = GEOMETRIC_POLYGON;
        this.renderData.color = "#00FF00";
    }
}
