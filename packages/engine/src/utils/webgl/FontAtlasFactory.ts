export type FontTextureAtlasOptions = {
    font: FontFace | string;
    charRanges: number[];
    fontSize: number;
    spacing: number;
};

export class FontAtlasFactory {
    private readonly fontAtlas: Map<string, FontAtlas> = new Map<string, FontAtlas>();

    // cache
    private id: string;
    private chars: string[];
    private font: string;
    private fontSize: number;
    private spacing: number;

    public hasFontAtlas(options: FontTextureAtlasOptions): boolean {
        return this.fontAtlas.has(this.getId(options));
    }

    public getFontAtlas(options: FontTextureAtlasOptions): FontAtlas {
        return this.fontAtlas.get(this.getId(options));
    }

    public getOrCreate(options: FontTextureAtlasOptions): FontAtlas {
        return this.getFontAtlas(options) ?? this.create(options);
    }

    public create(options: FontTextureAtlasOptions): FontAtlas {
        const { font, charRanges, fontSize, spacing } = options;

        this.chars = [];
        for (let i = 0; i < charRanges.length; i = i + 2) {
            for (let j = charRanges[i]; j <= charRanges[i + 1]; j++) {
                this.chars.push(String.fromCharCode(j));
            }
        }

        this.font = font instanceof FontFace ? font.family : font;
        this.fontSize = fontSize;
        this.spacing = spacing;
        this.id = this.getId(options);

        const fontAtlas = this.renderAtlas();
        this.fontAtlas.set(this.id, fontAtlas);

        return fontAtlas;
    }

    private getId({ font, charRanges, fontSize, spacing }: FontTextureAtlasOptions): string {
        return JSON.stringify({
            font: font instanceof FontFace ? font.family : font,
            charRanges,
            fontSize,
            spacing,
        });
    }

    private renderAtlas(): FontAtlas {
        const fontAtlas: FontAtlas = new FontAtlas(
            this.id,
            this.fontSize,
            Math.ceil(Math.sqrt(this.chars.length)),
            this.spacing,
        );
        const ctx: CanvasRenderingContext2D = fontAtlas.canvas.getContext("2d");

        ctx.clearRect(0, 0, fontAtlas.canvas.width, fontAtlas.canvas.height);
        ctx.textBaseline = "top";
        ctx.fillStyle = "#FFFFFF";
        ctx.font = `${this.fontSize}px ${this.font}`;

        let x: number = 0;
        let y: number = 0;

        for (let i = 0; i < this.chars.length; i++) {
            ctx.fillText(this.chars[i], x, y);

            fontAtlas.glyphs.set(this.chars[i], {
                id: i,
                width: ctx.measureText(this.chars[i]).width,
            });

            if ((x += this.fontSize + this.spacing) > fontAtlas.canvas.width - this.fontSize) {
                x = 0;
                y += this.fontSize + this.spacing;
            }
        }

        return fontAtlas;
    }
}

export class FontAtlas {
    public readonly canvas: HTMLCanvasElement = document.createElement("canvas");
    public readonly glyphs: Map<string, Glyph> = new Map<string, Glyph>();

    constructor(
        public readonly id: string,
        public readonly fontSize: number,
        public readonly gridSize: number,
        public readonly spacing: number,
    ) {
        this.canvas.width = this.gridSize * (this.fontSize + this.spacing);
        this.canvas.height = this.canvas.width;
    }
}

export interface Glyph {
    id: number;
    width: number;
}
