import Component from "../Component";
import { PIVOT_TOP_LEFT, PIVOT_CENTER } from "../Core/Rendering/RenderPivots";
import { LAYER_DEFAULT } from "../GameObject";
import Rectangle from "../Helper/Rectangle";
import Transform from "./Transform";

const RECT = { x1: 0, x2: 0, y1: 0, y2: 0 };

export default class Camera extends Component {
    private _viewportRect: Rectangle = null;
    private _worldSpaceRect: Rectangle = null;
    private _renderLayers = [LAYER_DEFAULT]

    start(event: {[key:string]: any}): void {
        this._worldSpaceRect = new Rectangle(0, 0, 0, 0);
        this.setupViewportRect(event.canvas);
    }

    private setupViewportRect(canvas: HTMLCanvasElement): void {
        this._viewportRect = new Rectangle(0, 0, canvas.width, canvas.height);
    }

    update(event: {[key:string]: any}): void {
        this.updateWorldSpaceRect();
        event.renderManager.renderInWorldSpace(this._renderLayers, this._worldSpaceRect);
    }
    
    private updateWorldSpaceRect(): void  {
        const vpHalfWidth = (this._viewportRect.width - this._viewportRect.x) / 2;
        const vpHalfHeight = (this._viewportRect.height - this._viewportRect.y) / 2;
        const position = this.gameObject.transform.position;

        this._worldSpaceRect.x = position.x - vpHalfWidth;
        this._worldSpaceRect.y = position.y + vpHalfHeight;
        this._worldSpaceRect.width = this._viewportRect.width;
        this._worldSpaceRect.height = this._viewportRect.height;
    }

    public addLayerToRender(layer: string): void {
        this._renderLayers.push(layer);
    }

    public get renderLayer(): string[] {
        return this._renderLayers;
    }

    public get viewportRect(): Rectangle {
        return this._viewportRect;
    }

    public get worldSpaceRect(): Rectangle {
        return this._worldSpaceRect;
    }
}
