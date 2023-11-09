[angry-pixel](../README.md) / [Exports](../modules.md) / GamepadController

# Class: GamepadController

Manages the connected gamepads

## Table of contents

### Methods

- [getGamepad](GamepadController.md#getgamepad)
- [getGamepads](GamepadController.md#getgamepads)

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

[src/input/GamepadController.ts:23](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/input/GamepadController.ts#L23)

___

### getGamepads

▸ **getGamepads**(): [`GamepadData`](GamepadData.md)[]

Retruns all connected gamepads.

#### Returns

[`GamepadData`](GamepadData.md)[]

An array of gamepads

#### Defined in

[src/input/GamepadController.ts:31](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/input/GamepadController.ts#L31)
