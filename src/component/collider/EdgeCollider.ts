import { GameConfig } from "../../core/GameConfig";
import { Collider } from "./Collider";
import { RenderComponent } from "../../core/Component";
import { Exception } from "../../utils/Exception";
import { InitOptions } from "../../core/GameActor";
import { RigidBody } from "../RigidBody";
import {
    IRenderManager,
    IGeometricRenderData,
    GeometricShape,
    RenderLocation,
    RenderDataType,
} from "angry-pixel-2d-renderer";
import { Vector2, Rotation } from "angry-pixel-math";
import { CollisionMethods, ICollider, Line } from "angry-pixel-2d-physics";

export interface EdgeColliderOptions extends InitOptions {
    vertexModel: Vector2[];
    offsetX?: number;
    offsetY?: number;
    rotation?: Rotation;
    layer?: string;
    physics?: boolean;
    debug?: boolean;
}

export class EdgeCollider extends Collider {
    public debug: boolean = false;
    public vertexModel: Vector2[];
    public offsetX: number = 0;
    public offsetY: number = 0;
    public rotation: Rotation;

    private scaledVertexModel: Vector2[] = [];
    private scaledOffset: Vector2 = new Vector2();
    private scaledPosition: Vector2 = new Vector2();
    private finalRotation: number = 0;
    private innerPosition: Vector2 = new Vector2();

    protected init(config: EdgeColliderOptions): void {
        if (this.container.getConstant<GameConfig>("GameConfig").collisions.collisionMethod !== CollisionMethods.SAT) {
            throw new Exception("Edge Colliders need SAT collision method.");
        }

        if (config.vertexModel.length < 2) {
            throw new Exception("Edge Collider needs at least 2 vertices.");
        }

        this.debug = (config.debug ?? this.debug) && this.container.getConstant<GameConfig>("GameConfig").debugEnabled;
        this.vertexModel = config.vertexModel;
        this.offsetX = config.offsetX ?? this.offsetX;
        this.offsetY = config.offsetY ?? this.offsetY;
        this.physics = config.physics ?? this.physics;
        this.rotation = config.rotation ?? new Rotation();
        this.layer = config.layer;

        for (let i = 0; i < this.vertexModel.length; i++) {
            this.scaledVertexModel.push(new Vector2());
        }

        for (let i = 0; i < this.scaledVertexModel.length - 1; i++) {
            this.colliders.push(
                this.physicsManager.addCollider({
                    layer: this.layer ?? this.gameObject.layer,
                    position: new Vector2(),
                    rotation: this.rotation.radians,
                    shape: new Line([this.scaledVertexModel[i], this.scaledVertexModel[i + 1]]),
                    updateCollisions: true,
                    physics: this.physics,
                    group: this.gameObject.id,
                })
            );
        }

        if (this.debug) {
            this.renderer = this.gameObject.addComponent(EdgeColliderRenderer, { colliders: this.colliders });
        }
    }

    protected update(): void {
        this.updateSize();
        this.updatePosition();
        this.updateColliders();
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
            this.colliders[i].position = this.scaledPosition;
            this.colliders[i].rotation = this.finalRotation;
            (this.colliders[i].shape as Line).vertexModel = [this.scaledVertexModel[i], this.scaledVertexModel[i + 1]];
        }
    }
}

class EdgeColliderRenderer extends RenderComponent {
    private renderManager: IRenderManager = this.container.getSingleton<IRenderManager>("RenderManager");
    private renderData: IGeometricRenderData[] = [];
    private colliders: ICollider[] = [];

    protected init({ colliders }: { colliders: ICollider[] }): void {
        this.colliders = colliders;

        this.colliders.forEach((collider: ICollider, index: number) => {
            this.renderData[index] = {
                type: RenderDataType.Geometric,
                layer: this.gameObject.layer,
                location: RenderLocation.WorldSpace,
                position: new Vector2(),
                shape: GeometricShape.Line,
                color: "#00FF00",
            };
        });
    }

    protected update(): void {
        this.colliders.forEach((collider: ICollider, index: number) => {
            this.renderData[index].layer = this.gameObject.layer;
            this.renderData[index].position = collider.position;
            this.renderData[index].rotation = collider.rotation;
            this.renderData[index].vertexModel = (collider.shape as Line).vertexModel;

            this.renderManager.addRenderData(this.renderData[index]);
        });
    }
}
