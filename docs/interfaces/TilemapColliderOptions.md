[angry-pixel](../README.md) / [Exports](../modules.md) / TilemapColliderOptions

# Interface: TilemapColliderOptions

TilemapCollider configuration options

## Hierarchy

- [`InitOptions`](InitOptions.md)

  ↳ **`TilemapColliderOptions`**

## Table of contents

### Properties

- [composite](TilemapColliderOptions.md#composite)
- [debug](TilemapColliderOptions.md#debug)
- [layer](TilemapColliderOptions.md#layer)
- [tilemapRenderer](TilemapColliderOptions.md#tilemaprenderer)

## Properties

### composite

• `Optional` **composite**: `boolean`

Generate colliders that represent the outer lines of the tile map

#### Defined in

[src/component/collider/TilemapCollider.ts:23](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/component/collider/TilemapCollider.ts#L23)

___

### debug

• `Optional` **debug**: `boolean`

If debug mode is enabled, the collider shape is rendered using the object's render layer

#### Defined in

[src/component/collider/TilemapCollider.ts:27](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/component/collider/TilemapCollider.ts#L27)

___

### layer

• `Optional` **layer**: `string`

Collision layer, if it's not setted, it uses the game object layer

#### Defined in

[src/component/collider/TilemapCollider.ts:25](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/component/collider/TilemapCollider.ts#L25)

___

### tilemapRenderer

• **tilemapRenderer**: [`ITilemapRenderer`](ITilemapRenderer.md)

TilemapRenderer from which the tiles information will be obtained to generate the colliders

#### Defined in

[src/component/collider/TilemapCollider.ts:21](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/component/collider/TilemapCollider.ts#L21)
