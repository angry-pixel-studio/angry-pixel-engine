export class FontAtlasFactory {
    private readonly fontSize: number = 70;
    private readonly deltaHeight: number = 1.0;
    private readonly step: number[] = [this.fontSize, this.fontSize * this.deltaHeight];

    // cache
    private chars: string[];

    public async create(charRanges: number[][], fontFamily: string, fontUrl: string = null): Promise<FontAtlas> {
        const fontAtlas: FontAtlas = new FontAtlas(fontFamily);

        this.chars = [];
        charRanges.forEach((range: number[]) => {
            for (let i = range[0]; i <= range[1]; i++) {
                this.chars.push(String.fromCharCode(i));
            }
        });

        fontAtlas.canvas.width = Math.round(Math.sqrt(this.chars.length)) * this.fontSize;
        fontAtlas.canvas.height = fontAtlas.canvas.width * this.deltaHeight;

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
        ctx.font = `${this.fontSize}px ${fontFamily}`;

        let x: number = 0;
        let y: number = 0;

        for (let i = 0; i < this.chars.length; i++) {
            ctx.fillText(this.chars[i], x, y);

            fontAtlas.glyphsData.set(this.chars[i], {
                x: x,
                y: y,
                width: this.fontSize,
                height: this.fontSize * this.deltaHeight,
            });

            if ((x += this.step[0]) > fontAtlas.canvas.width - this.step[0]) {
                x = 0;
                y += this.step[1];
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
