import { EntityManager } from "../../../ecs/EntityManager";
import { System } from "../../../ecs/SystemManager";
import { inject } from "../../../ioc/container";
import { Chunk, TilemapRenderer } from "../../component/renderer/TilemapRenderer";
import { TYPES } from "../../../config/types";

const chunkSize = 16;

export class TilemapPreProcessingSystem implements System {
    constructor(@inject(TYPES.EntityManager) private readonly entityManager: EntityManager) {}

    public onUpdate(): void {
        this.entityManager.search(TilemapRenderer).forEach(({ component: tilemapRenderer }) => {
            if (!tilemapRenderer._processed) {
                if (tilemapRenderer.chunks && tilemapRenderer.chunks.length > 0) this.chunksToData(tilemapRenderer);
                else if (tilemapRenderer.data && tilemapRenderer.data.length > 0) this.dataToChunks(tilemapRenderer);

                tilemapRenderer.tileWidth = tilemapRenderer.tileWidth ?? tilemapRenderer.tileset.tileWidth;
                tilemapRenderer.tileHeight = tilemapRenderer.tileHeight ?? tilemapRenderer.tileset.tileHeight;

                tilemapRenderer._processed = true;
            }
        });
    }

    private dataToChunks(tilemapRenderer: TilemapRenderer): void {
        tilemapRenderer.height = Math.ceil(tilemapRenderer.data.length / tilemapRenderer.width);

        const cx = Math.ceil(tilemapRenderer.width / chunkSize);
        const cy = Math.ceil(tilemapRenderer.height / chunkSize);

        for (let y = 0; y < cy; y++) {
            for (let x = 0; x < cx; x++) {
                const chunk: Chunk = {
                    x: x * chunkSize,
                    y: y * chunkSize,
                    width: chunkSize,
                    height: chunkSize,
                    data: [],
                };

                for (let i = 0; i < chunk.width * chunk.height; i++) {
                    const tix = chunk.x + (i % chunk.width);
                    const tiy = tilemapRenderer.width * (chunk.y + Math.floor(i / chunk.width));

                    chunk.data[i] =
                        tix < tilemapRenderer.width && tiy < tilemapRenderer.height * tilemapRenderer.width
                            ? tilemapRenderer.data[tiy + tix]
                            : 0;
                }

                tilemapRenderer.chunks.push(chunk);
            }
        }
    }

    private chunksToData(tilemapRenderer: TilemapRenderer): void {
        tilemapRenderer.data = [];
        tilemapRenderer.chunks.forEach((chunk) =>
            chunk.data.forEach((t, i) => {
                tilemapRenderer.data[
                    tilemapRenderer.width * (chunk.y + Math.floor(i / chunk.width)) + chunk.x + (i % chunk.width)
                ] = t;
            }),
        );

        tilemapRenderer.height = Math.ceil(tilemapRenderer.data.length / tilemapRenderer.width);
    }
}
