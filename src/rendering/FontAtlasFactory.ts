export class FontAtlasFactory {
    private bitmapSize: number = 64;
    private chars: string[];

    public async create(
        charRanges: number[],
        fontFamily: string,
        fontUrl: string = null,
        bitmapSize: number = null
    ): Promise<FontAtlas> {
        this.bitmapSize = bitmapSize ?? this.bitmapSize;
        const fontAtlas: FontAtlas = new FontAtlas(fontFamily);

        this.chars = [];
        for (let i = 0; i < charRanges.length; i = i + 2) {
            for (let j = charRanges[i]; j <= charRanges[i + 1]; j++) {
                this.chars.push(String.fromCharCode(j));
            }
        }

        fontAtlas.canvas.width = Math.round(Math.sqrt(this.chars.length)) * this.bitmapSize;
        fontAtlas.canvas.height = fontAtlas.canvas.width;

        fontUrl !== null
            ? await this.loadFont(fontAtlas, fontFamily, fontUrl)
            : this.renderAtlas(fontAtlas, fontFamily);

        return fontAtlas;
    }

    private async loadFont(fontAtlas: FontAtlas, family: string, url: string): Promise<void> {
        // @ts-ignore
        const font: FontFace = new FontFace(family, `url(${url})`);

        const loadedFontFace = await font.load();
        // @ts-ignore
        document.fonts.add(font);
        this.renderAtlas(fontAtlas, loadedFontFace.family);
    }

    private renderAtlas(fontAtlas: FontAtlas, fontFamily: string): void {
        const ctx: CanvasRenderingContext2D = fontAtlas.canvas.getContext("2d");

        ctx.clearRect(0, 0, fontAtlas.canvas.width, fontAtlas.canvas.height);
        ctx.textBaseline = "top";
        ctx.fillStyle = "#000";
        ctx.font = `${this.bitmapSize}px ${fontFamily}`;

        let x: number = 0;
        let y: number = 0;

        for (let i = 0; i < this.chars.length; i++) {
            ctx.fillText(this.chars[i], x, y);

            fontAtlas.glyphsData.set(this.chars[i], {
                x: x,
                y: y,
                width: this.bitmapSize,
                height: this.bitmapSize,
            });

            if ((x += this.bitmapSize) > fontAtlas.canvas.width - this.bitmapSize) {
                x = 0;
                y += this.bitmapSize;
            }
        }
    }
}

export class FontAtlas {
    public readonly name: string;
    public readonly canvas: HTMLCanvasElement = document.createElement("canvas");
    public readonly glyphsData: Map<string, GlyphData> = new Map<string, GlyphData>();

    constructor(name: string) {
        this.name = name;
    }
}

export interface GlyphData {
    x: number;
    y: number;
    width: number;
    height: number;
}
