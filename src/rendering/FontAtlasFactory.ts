export class FontAtlasFactory {
    private bitmapSize: number = 64;
    private chars: string[];
    private fontAtlas: Map<symbol, FontAtlas> = new Map<symbol, FontAtlas>();
    private loading: Map<symbol, boolean> = new Map<symbol, boolean>();

    public hasFontAtlas(fontFamily: string): boolean {
        return this.fontAtlas.has(Symbol.for(fontFamily));
    }

    public loadingFontAtlas(fontFamily: string): boolean {
        return this.loading.get(Symbol.for(fontFamily)) ?? false;
    }

    public getFontAtlas(fontFamily: string): FontAtlas {
        return this.fontAtlas.get(Symbol.for(fontFamily));
    }

    public asyncCreate(
        charRanges: number[],
        fontFamily: string,
        fontUrl: string = null,
        bitmapSize: number = null
    ): void {
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
            ? this.loadFont(fontFamily, fontUrl).then(() => this.renderAtlas(fontAtlas, fontFamily))
            : this.renderAtlas(fontAtlas, fontFamily);
    }

    private async loadFont(family: string, url: string): Promise<void> {
        this.loading.set(Symbol.for(family), true);

        const font: FontFace = new FontFace(family, `url(${url})`);
        await font.load();
        // @ts-ignore
        document.fonts.add(font);

        this.loading.set(Symbol.for(family), false);
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

        this.fontAtlas.set(Symbol.for(fontFamily), fontAtlas);
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
