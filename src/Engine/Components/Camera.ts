import Component from "../Component";
import { LAYER_DEFAULT } from "../GameObject";
import Rectangle from "../Helper/Rectangle";

const DEFAULT_LAYERS: string[] = [
    LAYER_DEFAULT
]

export default class Camera extends Component {
    private _viewportWidth: number = 0;
    private _viewportHeight: number = 0;
    private _vpHalfWidth: number = 0;
    private _vpHalfHeight: number = 0;

    private _worldSpaceRect: Rectangle = null;
    private _renderLayers: string[] = DEFAULT_LAYERS;

    start(event: {[key:string]: any}): void {
        this._worldSpaceRect = new Rectangle(0, 0, 0, 0);
        this.setupViewportRect(event.canvas);
    }

    private setupViewportRect(canvas: HTMLCanvasElement): void {
        this._viewportWidth = canvas.clientWidth;
        this._viewportHeight = canvas.clientHeight;
        this._vpHalfWidth = this._viewportWidth / 2;
        this._vpHalfHeight = this._viewportHeight / 2;
    }

    update(event: {[key:string]: any}): void {
        this.updateWorldSpaceRect();
        event.renderManager.render(this._renderLayers, this._worldSpaceRect);
    }
    
    private updateWorldSpaceRect(): void  {
        const position = this.gameObject.transform.position;

        this._worldSpaceRect.x = position.x - this._vpHalfWidth;
        this._worldSpaceRect.y = position.y + this._vpHalfHeight;
        this._worldSpaceRect.width = this._viewportWidth;
        this._worldSpaceRect.height = this._viewportHeight;
    }

    public addLayerToRender(layer: string): void {
        this._renderLayers.push(layer);
    }

    public set renderLayers(renderLayers: string[]){
        this._renderLayers = [...DEFAULT_LAYERS, ...renderLayers];
    }
 
    public get renderLayer(): string[] {
        return this._renderLayers;
    }

    public get worldSpaceRect(): Rectangle {
        return this._worldSpaceRect;
    }
}
