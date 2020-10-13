import Component from "../Component";
import RenderManager from "../Core/Rendering/RenderManager";
import { container, gameCanvas } from "../Game";
import { LAYER_DEFAULT } from "../GameObject";
import Rectangle from "../Helper/Rectangle";

const DEFAULT_LAYERS: string[] = [LAYER_DEFAULT];

export default class Camera extends Component {
    private _vpHalfWidth: number = 0;
    private _vpHalfHeight: number = 0;

    private _viewportRect: Rectangle = new Rectangle(0, 0, 0, 0);
    private _worldSpaceRect: Rectangle = new Rectangle(0, 0, 0, 0);
    private _renderLayers: string[] = DEFAULT_LAYERS;

    private renderManager: RenderManager = container.getSingleton<RenderManager>("RenderManager");

    start(): void {
        this.setupViewportRect();
    }

    private setupViewportRect(): void {
        this._viewportRect.setPosition(-(gameCanvas.clientWidth / 2), gameCanvas.clientHeight / 2);
        this._viewportRect.width = gameCanvas.clientWidth;
        this._viewportRect.height = gameCanvas.clientHeight;

        this._vpHalfWidth = this._viewportRect.width / 2;
        this._vpHalfHeight = this._viewportRect.height / 2;
    }

    update(): void {
        this.updateWorldSpaceRect();

        this.renderManager.renderLayers = this._renderLayers;
        this.renderManager.viewportRect = this._viewportRect;
        this.renderManager.worldSpaceViewRect = this._worldSpaceRect;
    }

    private updateWorldSpaceRect(): void {
        const position = this.gameObject.transform.position;

        this._worldSpaceRect.x = position.x - this._vpHalfWidth;
        this._worldSpaceRect.y = position.y + this._vpHalfHeight;
        this._worldSpaceRect.width = this._viewportRect.width;
        this._worldSpaceRect.height = this._viewportRect.height;
    }

    public addLayerToRender(layer: string): void {
        this._renderLayers.push(layer);
    }

    public set renderLayers(renderLayers: string[]) {
        this._renderLayers = [...DEFAULT_LAYERS, ...renderLayers];
    }

    public get renderLayers(): string[] {
        return this._renderLayers;
    }

    public get worldSpaceRect(): Rectangle {
        return this._worldSpaceRect;
    }

    public get viewportRect(): Rectangle {
        return this._viewportRect;
    }
}
