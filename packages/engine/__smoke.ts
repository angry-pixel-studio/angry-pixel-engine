import { EntityManager } from "@angry-pixel/ecs";
import { TiledWrapperSystem } from "@system/gameLogic/TiledWrapperSystem";
import { TilemapPreProcessingSystem } from "@system/gameLogic/TilemapPreProcessingSystem";
import { TiledObjectSystem } from "@system/gameLogic/TiledObjectSystem";
import { TiledWrapper, TiledTilemap } from "@component/gameLogic/TiledWrapper";
import { Transform } from "@component/gameLogic/Transform";
import { TilemapRenderer } from "@component/render2d/TilemapRenderer";
import tilemap from "../../demos/dev/public/tilemap/tilemap.json";

class Marker { name: string = ""; constructor(o?: any) { Object.assign(this, o); } }

const entityManager = new EntityManager();
const systems = [
    new TiledWrapperSystem(entityManager, { getJson: () => tilemap as unknown as TiledTilemap } as any),
    new TilemapPreProcessingSystem(entityManager),
    new TiledObjectSystem(entityManager),
];

const classes = new Set<string>();
(function walk(layers: any[]) {
    layers.forEach((l) => {
        if (l.type === "group") walk(l.layers);
        if (l.type === "objectgroup") l.objects.forEach((o: any) => classes.add(o.type));
    });
})(tilemap.layers as any[]);

const entity = entityManager.createEntity([
    new Transform(),
    new TiledWrapper({
        tilemap: "map.json",
        layerToRender: "Foreground",
        objects: new Map([...classes].map((c) => [c, [new Marker({ name: c })]])),
    }),
    new TilemapRenderer({ tileset: { image: "tileset.png", tileWidth: 16, tileHeight: 16 } }),
]);

systems.forEach((s) => s.onUpdate());

const r = entityManager.getComponent(entity, TilemapRenderer);
console.log(`tile layer found inside the group: ${r.data.length > 0}`);
console.log(`renderer ${r.width}x${r.height} tile=${r.tileWidth}x${r.tileHeight} tiles=${r.data.length} chunks=${r.chunks.length} offset=(${r.offset.x}, ${r.offset.y})`);
console.log(`negative tile indexes: ${r.data.some((_, i) => i < 0)} | holes in data: ${r.data.length !== r.width * r.height}`);
console.log(`origin (tiles): (${entityManager.getComponent(entity, TiledWrapper)._origin.x}, ${entityManager.getComponent(entity, TiledWrapper)._origin.y})`);

console.log("entities from objects:");
entityManager.search(Marker).forEach(({ entity: e, component }) => {
    const t = entityManager.getComponent(e, Transform);
    console.log(`  ${(component as Marker).name.padEnd(16)} pos=(${t.position.x}, ${t.position.y}) rot=${t.rotation.toFixed(2)}`);
});
