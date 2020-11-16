import { ProgramFactory } from "./ProgramFactory";
import { TextureFactory } from "./TextureFactory";
import { Vector2 } from "../../../Helper/Vector2";
import { Rectangle } from "../../../Libs/Geometric/Shapes/Rectangle";
export declare class WebGLImageRenderer {
    private textureFactory;
    private gl;
    private program;
    private positionBuffer;
    private textureBuffer;
    private positionCoordsAttr;
    private texCoordsAttr;
    private modelMatrixUniform;
    private projectionMatrixUniform;
    private textureMatrixUniform;
    private textureUniform;
    private alphaUniform;
    private projectionMatrix;
    private modelMatrix;
    private textureMatrix;
    private texcache;
    constructor(canvas: HTMLCanvasElement, programFactory: ProgramFactory, textureFactory: TextureFactory);
    renderImage(image: HTMLImageElement, position: Vector2, width: number, height: number, slice?: Rectangle | null, rotation?: number, flipHorizontal?: boolean, flipVertical?: boolean, alpha?: number, smooth?: boolean): void;
}
