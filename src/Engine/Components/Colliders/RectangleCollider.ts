import Component from "../../Component";
import { LAYER_DEFAULT } from "../../GameObject";
import GeometricRenderData, { GEOMETRIC_RECTANGLE } from "../../Core/Rendering/RenderData/GeometricRenderData";
import CollisionManager from "./../../Core/Collision/CollisionManager";
import RenderManager from "./../../Core/Rendering/RenderManager";
import { container } from "./../../Game";
import CoreRectangleCollider from "../../Core/Collision/Collider/RectangleCollider";
import Vector2 from "../../Helper/Vector2";

interface Config {
    width: number;
    height: number;
    offsetX: number;
    offsetY: number;
}

export default class RectangleCollider extends Component {
    private collisionManager: CollisionManager = container.getSingleton<CollisionManager>("CollisionManager");
    private renderManager: RenderManager = container.getSingleton<RenderManager>("RenderManager");

    private width: number;
    private height: number;
    private offsetX: number;
    private offsetY: number;
    private debug: boolean = false;

    private collider: CoreRectangleCollider;
    private renderData: GeometricRenderData = new GeometricRenderData();

    constructor({ width, height, offsetX = 0, offsetY = 0 }: Config) {
        super();

        this.width = width;
        this.height = height;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
    }

    protected start(): void {
        this.collider = new CoreRectangleCollider(
            new Vector2(
                this.gameObject.transform.position.x - Math.floor(this.width / 2) - this.offsetX,
                this.gameObject.transform.position.y + Math.floor(this.height / 2) - this.offsetY
            ),
            this.width,
            this.height,
            this.gameObject.layer
        );
        console.log("player");
        console.log(this.collider.topLeftPoint);
        console.log(this.collider.topRightPoint);
        console.log(this.collider.bottomLeftPoint);
        console.log(this.collider.bottomRightPoint);

        this.collisionManager.addCollider(this.collider);
    }

    protected update(): void {
        this.updateCoordinates();

        if (this.debug) {
            this.updateRenderData();
            this.renderManager.addToRenderStack(this.renderData);
        }
    }

    public collidesWithLayer(layer: string): boolean {
        this.updateCoordinates();
        const collisions = this.collisionManager.getCollisionsForCollider(this.collider);
        for (const collider of collisions) {
            if (collider.layer === layer) {
                return true;
            }
        }

        return false;
    }

    public enableDebug(): void {
        this.debug = true;
    }

    public disableDebug(): void {
        this.debug = false;
    }

    private updateCoordinates() {
        this.collider.coordinates = new Vector2(
            this.gameObject.transform.position.x - Math.floor(this.width / 2) - this.offsetX,
            this.gameObject.transform.position.y + Math.floor(this.height / 2) - this.offsetY
        );
    }

    private updateRenderData(): void {
        this.renderData.position = this.collider.coordinates;
        this.renderData.layer = LAYER_DEFAULT;
        this.renderData.geometric = this.collider;
        this.renderData.geometricType = GEOMETRIC_RECTANGLE;
        this.renderData.color = "#00FF00";
    }
}
