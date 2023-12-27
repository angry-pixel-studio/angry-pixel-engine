import { ICameraData } from "../CameraData";
import { IRenderData, RenderDataType } from "../renderData/RenderData";
import { hexToRgba } from "../utils/hexToRgba";
import { IProgramManager } from "./program/ProgramManager";
import { IRenderer } from "./renderer/IRenderer";
import { ITextureManager } from "./texture/TextureManager";

export interface IWebGLManager {
    render(renderData: IRenderData, cameraData: ICameraData): void;
    clearCanvas(hexColor: string): void;
    createTexture(image: HTMLImageElement, smooth?: boolean): void;
}

export class WebGLManager implements IWebGLManager {
    private lastRender: RenderDataType;

    constructor(
        public readonly gl: WebGL2RenderingContext,
        programManager: IProgramManager,
        private readonly textureManager: ITextureManager,
        private readonly renderers: Map<RenderDataType, IRenderer>
    ) {
        programManager.loadProgram();
    }

    public render(renderData: IRenderData, cameraData: ICameraData): void {
        try {
            this.renderers.get(renderData.type).render(renderData, cameraData, this.lastRender);
            this.lastRender = renderData.type;
        } catch (error: unknown) {
            return;
        }
    }

    public clearCanvas(hexColor: string): void {
        const rgb = hexToRgba(hexColor);

        this.gl.clearColor(rgb.r, rgb.g, rgb.b, rgb.a);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }

    public createTexture(image: HTMLImageElement, smooth: boolean = false): void {
        this.textureManager.createTextureFromImage(image, smooth);
    }
}
