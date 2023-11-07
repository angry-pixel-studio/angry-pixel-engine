[angry-pixel](../README.md) / [Exports](../modules.md) / KeyboardController

# Class: KeyboardController

## Table of contents

### Constructors

- [constructor](KeyboardController.md#constructor)

### Properties

- [pressedKeys](KeyboardController.md#pressedkeys)

### Methods

- [andPressed](KeyboardController.md#andpressed)
- [andPressedReturn](KeyboardController.md#andpressedreturn)
- [isPressed](KeyboardController.md#ispressed)
- [isPressedReturn](KeyboardController.md#ispressedreturn)
- [orPressed](KeyboardController.md#orpressed)
- [orPressedReturn](KeyboardController.md#orpressedreturn)

## Constructors

### constructor

• **new KeyboardController**(`canvas`): [`KeyboardController`](KeyboardController.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `canvas` | `HTMLCanvasElement` |

#### Returns

[`KeyboardController`](KeyboardController.md)

#### Defined in

[src/input/KeyboardController.ts:6](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/2e7a4eb/src/input/KeyboardController.ts#L6)

## Properties

### pressedKeys

• **pressedKeys**: `string`[] = `[]`

#### Defined in

[src/input/KeyboardController.ts:2](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/2e7a4eb/src/input/KeyboardController.ts#L2)

## Methods

### andPressed

▸ **andPressed**(`keyCodes`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyCodes` | `string`[] |

#### Returns

`boolean`

#### Defined in

[src/input/KeyboardController.ts:33](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/2e7a4eb/src/input/KeyboardController.ts#L33)

___

### andPressedReturn

▸ **andPressedReturn**<`T`\>(`keyCodes`, `returnTrue`, `returnFalse`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyCodes` | `string`[] |
| `returnTrue` | `T` |
| `returnFalse` | `T` |

#### Returns

`T`

#### Defined in

[src/input/KeyboardController.ts:47](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/2e7a4eb/src/input/KeyboardController.ts#L47)

___

### isPressed

▸ **isPressed**(`keyCode`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyCode` | `string` |

#### Returns

`boolean`

#### Defined in

[src/input/KeyboardController.ts:25](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/2e7a4eb/src/input/KeyboardController.ts#L25)

___

### isPressedReturn

▸ **isPressedReturn**<`T`\>(`keyCode`, `returnTrue`, `returnFalse`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyCode` | `string` |
| `returnTrue` | `T` |
| `returnFalse` | `T` |

#### Returns

`T`

#### Defined in

[src/input/KeyboardController.ts:37](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/2e7a4eb/src/input/KeyboardController.ts#L37)

___

### orPressed

▸ **orPressed**(`keyCodes`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyCodes` | `string`[] |

#### Returns

`boolean`

#### Defined in

[src/input/KeyboardController.ts:29](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/2e7a4eb/src/input/KeyboardController.ts#L29)

___

### orPressedReturn

▸ **orPressedReturn**<`T`\>(`keyCodes`, `returnTrue`, `returnFalse`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyCodes` | `string`[] |
| `returnTrue` | `T` |
| `returnFalse` | `T` |

#### Returns

`T`

#### Defined in

[src/input/KeyboardController.ts:41](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/2e7a4eb/src/input/KeyboardController.ts#L41)
