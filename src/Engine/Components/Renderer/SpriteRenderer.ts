import { RenderComponent } from "../../Component";
import { MiniEngineException } from "../../Core/Exception/MiniEngineException";
import { ImageRenderData } from "../../Core/Rendering/RenderData/ImageRenderData";
import { RenderManager } from "../../Core/Rendering/RenderManager";
import { container } from "../../Game";
import { Vector2 } from "../../Math/Vector2";
import { Sprite } from "../../Sprite";

export interface SpriteRendererConfig {
    sprite: Sprite;
    offset?: Vector2;
    smooth?: boolean;
    rotation?: number;
    flipHorizontal?: boolean;
    flipVertical?: boolean;
    opacity?: number;
    tiled?: Vector2;
    maskColor?: string;
    maskColorMix?: number;
}

export const TYPE_SPRITE_RENDERER: string = "SpriteRenderer";

export class SpriteRenderer extends RenderComponent {
    private renderManager: RenderManager = container.getSingleton<RenderManager>("RenderManager");

    public sprite: Sprite = null;
    public offset: Vector2 = new Vector2();
    public flipHorizontal: boolean = false;
    public flipVertical: boolean = false;
    public rotation: number = 0;
    public smooth: boolean = false;
    public opacity: number = 1;
    private _tiled: Vector2 = new Vector2(1, 1);
    public maskColor: string = "#ffffff";
    public maskColorMix: number = 0;

    private renderData: ImageRenderData[] = [];

    private goPosition: Vector2 = null;
    private cachePosition: Vector2 = new Vector2();
    private cacheRenderPosition: Vector2 = new Vector2();

    constructor(config: SpriteRendererConfig = { sprite: null }) {
        super();

        this.type = TYPE_SPRITE_RENDERER;

        this.sprite = config.sprite;
        this.offset = config.offset ?? this.offset;
        this.smooth = config.smooth ?? this.smooth;
        this.rotation = config.rotation ?? this.rotation;
        this.flipHorizontal = config.flipHorizontal ?? this.flipHorizontal;
        this.flipVertical = config.flipVertical ?? this.flipVertical;
        this.opacity = config.opacity ?? this.opacity;
        this.tiled = config.tiled ?? this._tiled;
        this.maskColor = config.maskColor ?? this.maskColor;
        this.maskColorMix = config.maskColorMix ?? this.maskColorMix;
    }

    public get tiled(): Vector2 {
        return this._tiled;
    }

    public set tiled(tiled: Vector2) {
        if (tiled.x % 1 !== 0 || tiled.y % 1 !== 0) {
            throw new MiniEngineException("SpriteRenderer.tiled: Vector2 components must be integer");
        }

        this._tiled.set(tiled.x, tiled.y);
    }

    protected start(): void {
        this.goPosition = this.gameObject.transform.position;
    }

    protected update(): void {
        if (this.sprite && this.sprite.loaded === true) {
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
            for (let i = 0; i <= this._tiled.x * this._tiled.y; i++) {
                this.renderData[i] = new ImageRenderData();
            }
        }
    }

    private updateRenderData(index: number, tileX: number, tileY: number): void {
        this.renderData[index].ui = this.gameObject.ui;
        this.renderData[index].layer = this.gameObject.layer;
        this.renderData[index].image = this.sprite.image;
        this.renderData[index].width = this.sprite.width * Math.abs(this.gameObject.transform.scale.x);
        this.renderData[index].height = this.sprite.height * Math.abs(this.gameObject.transform.scale.y);
        this.renderData[index].slice = this.sprite.slice;
        this.renderData[index].flipHorizontal = this.flipHorizontal !== this.gameObject.transform.scale.x < 0;
        this.renderData[index].flipVertical = this.flipVertical !== this.gameObject.transform.scale.y < 0;
        this.renderData[index].rotation = this.gameObject.transform.rotation + this.rotation;
        this.renderData[index].smooth = this.sprite.smooth;
        this.renderData[index].alpha = this.opacity;
        this.renderData[index].maskColor = this.maskColor;
        this.renderData[index].maskColorMix = this.maskColorMix;

        this.calculateRenderPosition(index, tileX, tileY);
        this.renderManager.addToRenderStack(this.renderData[index]);
    }

    private calculateRenderPosition(index: number, tileX: number, tileY: number): void {
        Vector2.add(this.cachePosition, this.gameObject.transform.position, this.offset);

        this.cacheRenderPosition.set(
            (this.renderData[index].width / 2) * (this.tiled.x - 1),
            (this.renderData[index].height / 2) * (this.tiled.y - 1)
        );
        Vector2.subtract(this.cachePosition, this.cachePosition, this.cacheRenderPosition);

        this.cacheRenderPosition.set(tileX * this.renderData[index].width, tileY * this.renderData[index].height);
        Vector2.add(this.cachePosition, this.cachePosition, this.cacheRenderPosition);

        this.renderData[index].position = this.cachePosition;

        if (this.gameObject.transform.rotation !== 0) {
            this.translateRenderPosition(index);
        }
    }

    private translateRenderPosition(index: number): void {
        const goRad: number = (this.gameObject.transform.rotation * Math.PI) / 180.0;
        const thisRad: number = Math.atan2(
            this.renderData[index].position.x - this.goPosition.x,
            this.renderData[index].position.y - this.goPosition.y
        );
        const radius: number = Math.hypot(
            this.renderData[index].position.x - this.goPosition.x,
            this.renderData[index].position.y - this.goPosition.y
        );

        this.renderData[index].position.set(
            this.goPosition.x + radius * Math.sin(thisRad - goRad),
            this.goPosition.y + radius * Math.cos(thisRad - goRad)
        );
    }
}
