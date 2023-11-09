[angry-pixel](../README.md) / [Exports](../modules.md) / TilemapRendererOptions

# Interface: TilemapRendererOptions

TilemapRenderer configuration options

## Table of contents

### Properties

- [layer](TilemapRendererOptions.md#layer)
- [opacity](TilemapRendererOptions.md#opacity)
- [orientation](TilemapRendererOptions.md#orientation)
- [smooth](TilemapRendererOptions.md#smooth)
- [tileHeight](TilemapRendererOptions.md#tileheight)
- [tileWidth](TilemapRendererOptions.md#tilewidth)
- [tiles](TilemapRendererOptions.md#tiles)
- [tileset](TilemapRendererOptions.md#tileset)
- [tintColor](TilemapRendererOptions.md#tintcolor)
- [width](TilemapRendererOptions.md#width)

## Properties

### layer

• `Optional` **layer**: `string`

The render layer

#### Defined in

[src/component/rendering/TilemapRenderer.ts:43](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/TilemapRenderer.ts#L43)

___

### opacity

• `Optional` **opacity**: `number`

Change the opacity between 1 and 0

#### Defined in

[src/component/rendering/TilemapRenderer.ts:47](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/TilemapRenderer.ts#L47)

___

### orientation

• `Optional` **orientation**: [`TilemapOrientation`](../enums/TilemapOrientation.md)

Direction in which the tilemap will be rendered.

#### Defined in

[src/component/rendering/TilemapRenderer.ts:45](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/TilemapRenderer.ts#L45)

___

### smooth

• `Optional` **smooth**: `boolean`

Smoothing pixels (not recommended for pixel art)

#### Defined in

[src/component/rendering/TilemapRenderer.ts:51](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/TilemapRenderer.ts#L51)

___

### tileHeight

• **tileHeight**: `number`

#### Defined in

[src/component/rendering/TilemapRenderer.ts:41](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/TilemapRenderer.ts#L41)

___

### tileWidth

• **tileWidth**: `number`

#### Defined in

[src/component/rendering/TilemapRenderer.ts:39](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/TilemapRenderer.ts#L39)

___

### tiles

• **tiles**: `string`

Id of tiles separated by commas. The ids start at 1, and increment from left to right,
from top to bottom. ID 0 (zero) represents a space with no tile.

#### Defined in

[src/component/rendering/TilemapRenderer.ts:33](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/TilemapRenderer.ts#L33)

___

### tileset

• **tileset**: [`Tileset`](Tileset.md)

The Tileset instance

#### Defined in

[src/component/rendering/TilemapRenderer.ts:35](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/TilemapRenderer.ts#L35)

___

### tintColor

• `Optional` **tintColor**: `string`

Define a color for tinting the tiles

#### Defined in

[src/component/rendering/TilemapRenderer.ts:49](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/TilemapRenderer.ts#L49)

___

### width

• **width**: `number`

#### Defined in

[src/component/rendering/TilemapRenderer.ts:37](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/TilemapRenderer.ts#L37)
