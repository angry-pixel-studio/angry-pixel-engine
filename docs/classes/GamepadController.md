[angry-pixel](../README.md) / [Exports](../modules.md) / GamepadController

# Class: GamepadController

Manages the connected gamepads

## Table of contents

### Constructors

- [constructor](GamepadController.md#constructor)

### Methods

- [getGamepad](GamepadController.md#getgamepad)
- [getGamepads](GamepadController.md#getgamepads)

## Constructors

### constructor

• **new GamepadController**(): [`GamepadController`](GamepadController.md)

#### Returns

[`GamepadController`](GamepadController.md)

#### Defined in

[src/input/GamepadController.ts:10](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/input/GamepadController.ts#L10)

## Methods

### getGamepad

▸ **getGamepad**(`index`): [`GamepadData`](GamepadData.md)

Returns a gamepad by its numerical index, or null if it does not exist.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The gamepad index to find |

#### Returns

[`GamepadData`](GamepadData.md)

The found gamepad or NULL

#### Defined in

[src/input/GamepadController.ts:22](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/input/GamepadController.ts#L22)

___

### getGamepads

▸ **getGamepads**(): [`GamepadData`](GamepadData.md)[]

Retruns all connected gamepads.

#### Returns

[`GamepadData`](GamepadData.md)[]

An array of gamepads

#### Defined in

[src/input/GamepadController.ts:30](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/input/GamepadController.ts#L30)
