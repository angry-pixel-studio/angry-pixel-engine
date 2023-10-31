[angry-pixel](../README.md) / [Exports](../modules.md) / IRenderManager

# Interface: IRenderManager

## Table of contents

### Methods

- [addCameraData](IRenderManager.md#addcameradata)
- [addRenderData](IRenderManager.md#addrenderdata)
- [clearData](IRenderManager.md#cleardata)
- [clearScreen](IRenderManager.md#clearscreen)
- [preloadTexture](IRenderManager.md#preloadtexture)
- [render](IRenderManager.md#render)

## Methods

### addCameraData

▸ **addCameraData**(`data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `ICameraData` |

#### Returns

`void`

#### Defined in

node_modules/angry-pixel-2d-renderer/lib/RenderManager.d.ts:7

___

### addRenderData

▸ **addRenderData**<`T`\>(`data`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `IRenderData` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `T` |

#### Returns

`void`

#### Defined in

node_modules/angry-pixel-2d-renderer/lib/RenderManager.d.ts:6

___

### clearData

▸ **clearData**(): `void`

#### Returns

`void`

#### Defined in

node_modules/angry-pixel-2d-renderer/lib/RenderManager.d.ts:9

___

### clearScreen

▸ **clearScreen**(`hexColor`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hexColor` | `string` |

#### Returns

`void`

#### Defined in

node_modules/angry-pixel-2d-renderer/lib/RenderManager.d.ts:10

___

### preloadTexture

▸ **preloadTexture**(`image`, `smooth?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `image` | `HTMLImageElement` |
| `smooth?` | `boolean` |

#### Returns

`void`

#### Defined in

node_modules/angry-pixel-2d-renderer/lib/RenderManager.d.ts:11

___

### render

▸ **render**(): `void`

#### Returns

`void`

#### Defined in

node_modules/angry-pixel-2d-renderer/lib/RenderManager.d.ts:8
