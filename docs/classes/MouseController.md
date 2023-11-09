[angry-pixel](../README.md) / [Exports](../modules.md) / MouseController

# Class: MouseController

Manages mouse interaction

## Table of contents

### Constructors

- [constructor](MouseController.md#constructor)

### Accessors

- [hasMoved](MouseController.md#hasmoved)
- [leftButtonPressed](MouseController.md#leftbuttonpressed)
- [positionInViewport](MouseController.md#positioninviewport)
- [rightButtonPressed](MouseController.md#rightbuttonpressed)
- [scrollButtonPressed](MouseController.md#scrollbuttonpressed)

## Constructors

### constructor

• **new MouseController**(`canvas`): [`MouseController`](MouseController.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `canvas` | `HTMLCanvasElement` |

#### Returns

[`MouseController`](MouseController.md)

#### Defined in

[src/input/MouseController.ts:17](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/input/MouseController.ts#L17)

## Accessors

### hasMoved

• `get` **hasMoved**(): `boolean`

TRUE if the mouse moved during the last frame

#### Returns

`boolean`

#### Defined in

[src/input/MouseController.ts:59](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/input/MouseController.ts#L59)

___

### leftButtonPressed

• `get` **leftButtonPressed**(): `boolean`

TRUE if the left button is being pressed

#### Returns

`boolean`

#### Defined in

[src/input/MouseController.ts:27](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/input/MouseController.ts#L27)

___

### positionInViewport

• `get` **positionInViewport**(): [`Vector2`](Vector2.md)

The position of the pointer in the screen view port

#### Returns

[`Vector2`](Vector2.md)

#### Defined in

[src/input/MouseController.ts:51](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/input/MouseController.ts#L51)

___

### rightButtonPressed

• `get` **rightButtonPressed**(): `boolean`

TRUE if the right button is beign pressed

#### Returns

`boolean`

#### Defined in

[src/input/MouseController.ts:43](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/input/MouseController.ts#L43)

___

### scrollButtonPressed

• `get` **scrollButtonPressed**(): `boolean`

TRUE if the scroll button is being pressed

#### Returns

`boolean`

#### Defined in

[src/input/MouseController.ts:35](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/input/MouseController.ts#L35)
