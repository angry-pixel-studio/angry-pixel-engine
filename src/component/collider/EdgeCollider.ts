import { CollisionMethodConfig, container, GameConfig } from "../../core/Game";
import { Collider } from "./Collider";
import { Vector2 } from "../../math/Vector2";
import { Rotation } from "../../math/Rotation";
import { ComponentTypes } from "../ComponentTypes";
import { ColliderData } from "../../physics/collision/ColliderData";
import { RenderComponent } from "../../core/Component";
import { RenderManager } from "../../rendering/RenderManager";
import { GeometricRenderData, GeometricShape } from "../../rendering/renderData/GeometricRenderData";
import { Exception } from "../../utils/Exception";
import { Line } from "../../physics/collision/shape/Line";

export interface EdgeColliderConfig {
    vertexModel: Vector2[];
    offsetX?: number;
    offsetY?: number;
    rotation?: Rotation;
    layer?: string;
    physics?: boolean;
    debug?: boolean;
}

export class EdgeCollider extends Collider {
    public readonly debug: boolean = false;
    public readonly vertexModel: Vector2[];
    public offsetX: number = 0;
    public offsetY: number = 0;
    public rotation: Rotation;

    private scaledVertexModel: Vector2[] = [];
    private scaledOffset: Vector2 = new Vector2();
    private scaledPosition: Vector2 = new Vector2();
    private finalRotation: number = 0;
    private innerPosition: Vector2 = new Vector2();

    constructor(config: EdgeColliderConfig) {
        super();

        if (container.getConstant<GameConfig>("GameConfig").collisions.method !== CollisionMethodConfig.SAT) {
            throw new Exception("Edge Colliders need SAT collision method.");
        }

        if (config.vertexModel.length < 2) {
            throw new Exception("Edge Collider needs at least 2 vertices.");
        }

        this.type = ComponentTypes.EdgeCollider;

        this.debug = (config.debug ?? this.debug) && container.getConstant<GameConfig>("GameConfig").debugEnabled;
        this.vertexModel = config.vertexModel;
        this.offsetX = config.offsetX ?? this.offsetX;
        this.offsetY = config.offsetY ?? this.offsetY;
        this.physics = config.physics ?? this.physics;
        this.rotation = config.rotation ?? new Rotation();
        this.layer = config.layer;

        for (let i = 0; i < this.vertexModel.length; i++) {
            this.scaledVertexModel.push(new Vector2());
        }
    }

    protected start(): void {
        for (let i = 0; i < this.scaledVertexModel.length - 1; i++) {
            this.colliders.push(
                new ColliderData(
                    new Line([this.scaledVertexModel[i], this.scaledVertexModel[i + 1]]),
                    this.layer ?? this.gameObject.layer,
                    this.gameObject.id,
                    true,
                    this.physics,
                    this.hasComponentOfType(ComponentTypes.RigidBody)
                )
            );
        }

        if (this.debug) {
            this.renderer = this.gameObject.addComponent(() => new EdgeColliderRenderer(this.colliders));
        }
    }

    protected update(): void {
        this.updateSize();
        this.updatePosition();
        this.updateColliders();

        super.update();
    }

    private updateSize(): void {
        this.vertexModel.forEach((vertex, index) =>
            this.scaledVertexModel[index].set(
                vertex.x * this.gameObject.transform.scale.x,
                vertex.y * this.gameObject.transform.scale.y
            )
        );

        this.scaledOffset.x = this.offsetX * this.gameObject.transform.scale.x;
        this.scaledOffset.y = this.offsetY * this.gameObject.transform.scale.y;
        this.finalRotation = this.gameObject.transform.rotation.radians + this.rotation.radians;
    }

    protected updatePosition(): void {
        Vector2.add(this.scaledPosition, this.gameObject.transform.position, this.scaledOffset);

        if (this.gameObject.transform.rotation.radians !== 0) {
            this.translate();
        }
    }

    private translate(): void {
        Vector2.subtract(this.innerPosition, this.scaledPosition, this.gameObject.transform.position);
        const translatedAngle: number =
            Math.atan2(this.innerPosition.y, this.innerPosition.x) + this.gameObject.transform.rotation.radians;

        this.scaledPosition.set(
            this.gameObject.transform.position.x + this.innerPosition.magnitude * Math.cos(translatedAngle),
            this.gameObject.transform.position.y + this.innerPosition.magnitude * Math.sin(translatedAngle)
        );
    }

    private updateColliders(): void {
        for (let i = 0; i < this.scaledVertexModel.length - 1; i++) {
            this.colliders[i].layer = this.layer ?? this.gameObject.layer;
            this.colliders[i].shape.position = this.scaledPosition;
            this.colliders[i].shape.angle = this.finalRotation;
            this.colliders[i].shape.vertexModel = [this.scaledVertexModel[i], this.scaledVertexModel[i + 1]];
            this.colliders[i].shape.update();
        }
    }
}

class EdgeColliderRenderer extends RenderComponent {
    private renderManager: RenderManager = container.getSingleton<RenderManager>("RenderManager");

    private renderData: GeometricRenderData[] = [];
    private colliders: ColliderData[] = [];

    constructor(colliders: ColliderData[]) {
        super();

        this.type = "EdgeColliderRenderer";

        this.colliders = colliders;

        this.colliders.forEach((collider: ColliderData, index: number) => {
            this.renderData[index] = new GeometricRenderData();
            this.renderData[index].debug = true;
            this.renderData[index].color = "#00FF00";
            this.renderData[index].shape = GeometricShape.Line;
        });
    }

    protected update(): void {
        this.colliders.forEach((collider: ColliderData, index: number) => {
            this.renderData[index].layer = this.gameObject.layer;
            this.renderData[index].position = collider.shape.position;
            this.renderData[index].angle = collider.shape.angle;
            this.renderData[index].boundingBox = collider.shape.boundingBox;
            this.renderData[index].vertexModel = collider.shape.vertexModel;

            this.renderManager.addRenderData(this.renderData[index]);
        });
    }
}
