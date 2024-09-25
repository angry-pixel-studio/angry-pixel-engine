import { hexToRgba } from "./utils";

export class CanvasColorRenderer {
    constructor(private readonly gl: WebGL2RenderingContext) {}

    public render(hexColor: string): void {
        const rgb = hexToRgba(hexColor);
        this.gl.clearColor(rgb.r, rgb.g, rgb.b, rgb.a);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
}
