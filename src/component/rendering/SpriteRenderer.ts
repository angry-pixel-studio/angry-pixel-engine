import { RenderComponent } from "../../core/Component";
import { Exception } from "../../utils/Exception";
import { Sprite } from "../Sprite";
import { Rotation, Vector2 } from "angry-pixel-math";
import { IRenderManager, ISpriteRenderData, RenderDataType, RenderLocation } from "angry-pixel-2d-renderer";
import { GameConfig } from "../../core/GameConfig";

export interface SpriteRendererOptions {
    sprite?: Sprite;
    offset?: Vector2;
    rotation?: Rotation;
    flipHorizontal?: boolean;
    flipVertical?: boolean;
    opacity?: number;
    tiled?: Vector2;
    maskColor?: string;
    maskColorMix?: number;
    tintColor?: string;
    layer?: string;
}

export class SpriteRenderer extends RenderComponent {
    private readonly renderManager: IRenderManager = this.container.getSingleton<IRenderManager>("RenderManager");
    private readonly spriteDefaultScale: Vector2 =
        this.container.getConstant<GameConfig>("GameConfig").spriteDefaultScale;

    public sprite: Sprite;
    public offset: Vector2;
    public flipHorizontal: boolean;
    public flipVertical: boolean;
    public rotation: Rotation;
    public opacity: number;
    private _tiled: Vector2;
    public maskColor: string;
    public maskColorMix: number;
    public tintColor: string;
    public layer: string;

    private renderData: ISpriteRenderData[] = [];

    private innerPosition: Vector2 = new Vector2();
    private cachePosition: Vector2 = new Vector2();
    private cacheRenderPosition: Vector2 = new Vector2();
    private scaledOffset: Vector2 = new Vector2();

    protected init(config: SpriteRendererOptions = {}): void {
        this.sprite = config.sprite;

        this.offset = config.offset ?? new Vector2();
        this.rotation = config.rotation ?? new Rotation();
        this.flipHorizontal = config.flipHorizontal ?? false;
        this.flipVertical = config.flipVertical ?? false;
        this.opacity = config.opacity ?? 1;
        this._tiled = config.tiled ?? new Vector2(1, 1);
        this.maskColor = config.maskColor;
        this.maskColorMix = config.maskColorMix ?? 0;
        this.tintColor = config.tintColor;
        this.layer = config.layer;
    }

    public get tiled(): Vector2 {
        return this._tiled;
    }

    public set tiled(tiled: Vector2) {
        if (tiled.x % 1 !== 0 || tiled.y % 1 !== 0) {
            throw new Exception("SpriteRenderer.tiled: Vector2 components must be integers");
        }

        this._tiled.set(tiled.x, tiled.y);
    }

    protected update(): void {
        if (this.sprite && this.sprite.loaded === true) {
            this.sprite.scale = this.sprite.scale ?? this.spriteDefaultScale;

            this.updateRenderDataArray();

            let index = 0;
            for (let tileX = 0; tileX < this._tiled.x; tileX++) {
                for (let tileY = 0; tileY < this._tiled.y; tileY++) {
                    this.updateRenderData(index, tileX, tileY);
                    index++;
                }
            }
        }
    }

    private updateRenderDataArray(): void {
        if (this.renderData.length !== this._tiled.x * this._tiled.y) {
            this.renderData = [];
            for (let i = 0; i < this._tiled.x * this._tiled.y; i++) {
                this.renderData[i] = {
                    type: RenderDataType.Sprite,
                    location: RenderLocation.WorldSpace,
                    layer: "",
                    position: new Vector2(),
                    image: this.sprite.image,
                    width: 0,
                    height: 0,
                };
            }
        }
    }

    private updateRenderData(index: number, tileX: number, tileY: number): void {
        this.renderData[index].location = this.gameObject.ui ? RenderLocation.ViewPort : RenderLocation.WorldSpace;
        this.renderData[index].layer = this.layer ?? this.gameObject.layer;
        this.renderData[index].image = this.sprite.image;
        this.renderData[index].width = this.sprite.width * Math.abs(this.gameObject.transform.scale.x);
        this.renderData[index].height = this.sprite.height * Math.abs(this.gameObject.transform.scale.y);
        this.renderData[index].slice = this.sprite.slice;
        this.renderData[index].flipHorizontal = this.flipHorizontal !== this.gameObject.transform.scale.x < 0;
        this.renderData[index].flipVertical = this.flipVertical !== this.gameObject.transform.scale.y < 0;
        this.renderData[index].rotation = this.gameObject.transform.rotation.radians + this.rotation.radians;
        this.renderData[index].smooth = this.sprite.smooth;
        this.renderData[index].alpha = this.opacity;
        this.renderData[index].maskColor = this.maskColor;
        this.renderData[index].maskColorMix = this.maskColorMix;
        this.renderData[index].tintColor = this.tintColor;

        this.calculateRenderPosition(index, tileX, tileY);
        this.renderManager.addRenderData(this.renderData[index]);
    }

    private calculateRenderPosition(index: number, tileX: number, tileY: number): void {
        this.scaledOffset.set(
            this.offset.x * this.gameObject.transform.scale.x,
            this.offset.y * this.gameObject.transform.scale.y
        );
        Vector2.add(this.cachePosition, this.gameObject.transform.position, this.scaledOffset);

        this.cacheRenderPosition.set(
            (this.renderData[index].width / 2) * (this._tiled.x - 1),
            (this.renderData[index].height / 2) * (this._tiled.y - 1)
        );
        Vector2.subtract(this.cachePosition, this.cachePosition, this.cacheRenderPosition);

        this.cacheRenderPosition.set(tileX * this.renderData[index].width, tileY * this.renderData[index].height);
        Vector2.add(this.renderData[index].position, this.cachePosition, this.cacheRenderPosition);

        if (this.gameObject.transform.rotation.radians !== 0) {
            this.translateRenderPosition(index);
        }
    }

    private translateRenderPosition(index: number): void {
        Vector2.subtract(this.innerPosition, this.renderData[index].position, this.gameObject.transform.position);
        const translatedAngle: number =
            Math.atan2(this.innerPosition.y, this.innerPosition.x) + this.gameObject.transform.rotation.radians;

        this.renderData[index].position.set(
            this.gameObject.transform.position.x + this.innerPosition.magnitude * Math.cos(translatedAngle),
            this.gameObject.transform.position.y + this.innerPosition.magnitude * Math.sin(translatedAngle)
        );
    }
}
