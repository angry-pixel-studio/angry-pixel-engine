export class FontAtlasFactory {
    private bitmapSize: number;
    private chars: string[];
    private fontAtlas: Map<symbol, FontAtlas> = new Map<symbol, FontAtlas>();

    public hasFontAtlas(fontFace: FontFace | string): boolean {
        return this.fontAtlas.has(this.symbol(fontFace));
    }

    public getFontAtlas(fontFace: FontFace | string): FontAtlas {
        return this.fontAtlas.get(this.symbol(fontFace));
    }

    public getOrCreate(charRanges: number[], fontFace: FontFace | string, bitmapSize: number): FontAtlas {
        return this.getFontAtlas(fontFace) ?? this.create(charRanges, fontFace, bitmapSize);
    }

    public create(charRanges: number[], fontFace: FontFace | string, bitmapSize: number): FontAtlas {
        this.bitmapSize = bitmapSize;

        this.chars = [];
        for (let i = 0; i < charRanges.length; i = i + 2) {
            for (let j = charRanges[i]; j <= charRanges[i + 1]; j++) {
                this.chars.push(String.fromCharCode(j));
            }
        }

        const fontAtlas = this.renderAtlas(fontFace instanceof FontFace ? fontFace.family : fontFace);
        this.fontAtlas.set(this.symbol(fontFace), fontAtlas);

        return fontAtlas;
    }

    private symbol(fontFace: FontFace | string): symbol {
        return Symbol.for(fontFace instanceof FontFace ? fontFace.family : fontFace);
    }

    private renderAtlas(fontFaceFamily: string): FontAtlas {
        const fontAtlas: FontAtlas = new FontAtlas(
            fontFaceFamily,
            this.bitmapSize,
            Math.ceil(Math.sqrt(this.chars.length)),
        );

        const ctx: CanvasRenderingContext2D = fontAtlas.canvas.getContext("2d");

        ctx.clearRect(0, 0, fontAtlas.canvas.width, fontAtlas.canvas.height);
        ctx.textBaseline = "top";
        ctx.fillStyle = "#000";
        ctx.font = `${this.bitmapSize}px ${fontFaceFamily}`;

        let x: number = 0;
        let y: number = 0;

        for (let i = 0; i < this.chars.length; i++) {
            ctx.fillText(this.chars[i], x, y);

            // TODO: improve the glyph data using the measureText data
            fontAtlas.glyphs.set(this.chars[i], {
                id: i,
                width: ctx.measureText(this.chars[i]).width,
            });

            if ((x += this.bitmapSize) > fontAtlas.canvas.width - this.bitmapSize) {
                x = 0;
                y += this.bitmapSize;
            }
        }

        return fontAtlas;
    }
}

export class FontAtlas {
    public readonly canvas: HTMLCanvasElement = document.createElement("canvas");
    public readonly glyphs: Map<string, Glyph> = new Map<string, Glyph>();

    constructor(
        public readonly fontFaceFamily: string,
        public readonly bitmapFontSize: number,
        public readonly gridSize: number,
    ) {
        this.canvas.width = this.gridSize * this.bitmapFontSize;
        this.canvas.height = this.canvas.width;
    }
}

export interface Glyph {
    id: number;
    width: number;
}
