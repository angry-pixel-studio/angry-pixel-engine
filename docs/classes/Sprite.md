[angry-pixel](../README.md) / [Exports](../modules.md) / Sprite

# Class: Sprite

The Sprite is an object that is composed of the Image element and allow to slice it and smooth its pixels.

**`Example`**

```js
const sprite = new Sprite({image: this.assetManager.getImage("image.png")});
```

**`Example`**

```js
const sprite = new Sprite({
  image: this.assetManager.getImage("image.png"),
  slice: {x: 0, y:0, width: 16, height: 16},
  smooth: false
});
```

## Table of contents

### Constructors

- [constructor](Sprite.md#constructor)

### Properties

- [image](Sprite.md#image)
- [slice](Sprite.md#slice)
- [smooth](Sprite.md#smooth)

### Accessors

- [height](Sprite.md#height)
- [loaded](Sprite.md#loaded)
- [width](Sprite.md#width)

## Constructors

### constructor

• **new Sprite**(`config`): [`Sprite`](Sprite.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`SpriteConfig`](../interfaces/SpriteConfig.md) |

#### Returns

[`Sprite`](Sprite.md)

#### Defined in

[src/component/rendering/Sprite.ts:48](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/Sprite.ts#L48)

## Properties

### image

• `Readonly` **image**: `HTMLImageElement`

The image element to render

#### Defined in

[src/component/rendering/Sprite.ts:38](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/Sprite.ts#L38)

___

### slice

• `Readonly` **slice**: [`Slice`](../interfaces/Slice.md)

Cut the image based on straight coordinates starting from the top left downward

#### Defined in

[src/component/rendering/Sprite.ts:40](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/Sprite.ts#L40)

___

### smooth

• `Readonly` **smooth**: `boolean`

Smoothing pixels (not recommended for pixel art)

#### Defined in

[src/component/rendering/Sprite.ts:42](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/Sprite.ts#L42)

## Accessors

### height

• `get` **height**(): `number`

The image height

#### Returns

`number`

#### Defined in

[src/component/rendering/Sprite.ts:78](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/Sprite.ts#L78)

___

### loaded

• `get` **loaded**(): `boolean`

TRUE if the image is loaded

#### Returns

`boolean`

#### Defined in

[src/component/rendering/Sprite.ts:83](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/Sprite.ts#L83)

___

### width

• `get` **width**(): `number`

The image width

#### Returns

`number`

#### Defined in

[src/component/rendering/Sprite.ts:73](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/rendering/Sprite.ts#L73)
