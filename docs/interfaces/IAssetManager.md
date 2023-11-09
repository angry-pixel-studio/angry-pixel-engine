[angry-pixel](../README.md) / [Exports](../modules.md) / IAssetManager

# Interface: IAssetManager

Manages the asset loading (images, fonts, audios, videos).

## Table of contents

### Methods

- [getAssetsLoaded](IAssetManager.md#getassetsloaded)
- [getAudio](IAssetManager.md#getaudio)
- [getFont](IAssetManager.md#getfont)
- [getImage](IAssetManager.md#getimage)
- [getVideo](IAssetManager.md#getvideo)
- [loadAudio](IAssetManager.md#loadaudio)
- [loadFont](IAssetManager.md#loadfont)
- [loadImage](IAssetManager.md#loadimage)
- [loadVideo](IAssetManager.md#loadvideo)

## Methods

### getAssetsLoaded

▸ **getAssetsLoaded**(): `boolean`

Returns TRUE if the assets are loaded

#### Returns

`boolean`

TRUE or FALSE

#### Defined in

[src/core/managers/AssetManager.ts:29](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/managers/AssetManager.ts#L29)

___

### getAudio

▸ **getAudio**(`url`): `HTMLAudioElement`

Retrieves an audio asset

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The asset URL |

#### Returns

`HTMLAudioElement`

The HTML Audio element

#### Defined in

[src/core/managers/AssetManager.ts:67](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/managers/AssetManager.ts#L67)

___

### getFont

▸ **getFont**(`family`): `FontFace`

Retrieves a font asset

#### Parameters

| Name | Type |
| :------ | :------ |
| `family` | `string` |

#### Returns

`FontFace`

The Font element

#### Defined in

[src/core/managers/AssetManager.ts:73](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/managers/AssetManager.ts#L73)

___

### getImage

▸ **getImage**(`url`): `HTMLImageElement`

Retrieves an image asset

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The asset URL |

#### Returns

`HTMLImageElement`

The HTML Image element

#### Defined in

[src/core/managers/AssetManager.ts:61](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/managers/AssetManager.ts#L61)

___

### getVideo

▸ **getVideo**(`url`): `HTMLVideoElement`

Retrieves a video asset

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The asset URL |

#### Returns

`HTMLVideoElement`

The HTML Video element

#### Defined in

[src/core/managers/AssetManager.ts:79](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/managers/AssetManager.ts#L79)

___

### loadAudio

▸ **loadAudio**(`url`): `HTMLAudioElement`

Loads an audio asset

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The asset URL |

#### Returns

`HTMLAudioElement`

The HTML Audio element created

#### Defined in

[src/core/managers/AssetManager.ts:42](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/managers/AssetManager.ts#L42)

___

### loadFont

▸ **loadFont**(`family`, `url`): `FontFace`

Loads a font asset

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `family` | `string` | The font family name |
| `url` | `string` | The asset URL |

#### Returns

`FontFace`

The FontFace object created

#### Defined in

[src/core/managers/AssetManager.ts:49](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/managers/AssetManager.ts#L49)

___

### loadImage

▸ **loadImage**(`url`, `preloadTexture?`): `HTMLImageElement`

Loads an image asset

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The asset URL |
| `preloadTexture?` | `boolean` | Creates the texture to be rendered at load time [optional] |

#### Returns

`HTMLImageElement`

The HTML Image element created

#### Defined in

[src/core/managers/AssetManager.ts:36](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/managers/AssetManager.ts#L36)

___

### loadVideo

▸ **loadVideo**(`url`): `HTMLVideoElement`

Loads an video asset

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The asset URL |

#### Returns

`HTMLVideoElement`

The HTML Video element created

#### Defined in

[src/core/managers/AssetManager.ts:55](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/managers/AssetManager.ts#L55)
