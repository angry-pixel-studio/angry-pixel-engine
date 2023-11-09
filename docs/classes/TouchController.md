[angry-pixel](../README.md) / [Exports](../modules.md) / TouchController

# Class: TouchController

Manages the touch screen interaction.

## Table of contents

### Constructors

- [constructor](TouchController.md#constructor)

### Accessors

- [interactions](TouchController.md#interactions)
- [touching](TouchController.md#touching)

## Constructors

### constructor

• **new TouchController**(`canvas`): [`TouchController`](TouchController.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `canvas` | `HTMLCanvasElement` |

#### Returns

[`TouchController`](TouchController.md)

#### Defined in

[src/input/TouchController.ts:23](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/input/TouchController.ts#L23)

## Accessors

### interactions

• `get` **interactions**(): [`TouchInteraction`](../interfaces/TouchInteraction.md)[]

The information about the interactions with the screen

#### Returns

[`TouchInteraction`](../interfaces/TouchInteraction.md)[]

#### Defined in

[src/input/TouchController.ts:44](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/input/TouchController.ts#L44)

___

### touching

• `get` **touching**(): `boolean`

TRUE if there is an interaction with the screen

#### Returns

`boolean`

#### Defined in

[src/input/TouchController.ts:36](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/input/TouchController.ts#L36)
