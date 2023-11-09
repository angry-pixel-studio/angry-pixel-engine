[angry-pixel](../README.md) / [Exports](../modules.md) / KeyboardController

# Class: KeyboardController

Manages keyboard interaction. It uses the **code** property of the **js keyboard event**.

**`See`**

[KeyboardEvent: code property](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)

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

[src/input/KeyboardController.ts:15](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/input/KeyboardController.ts#L15)

## Properties

### pressedKeys

• `Readonly` **pressedKeys**: `string`[] = `[]`

The current pressed keys

#### Defined in

[src/input/KeyboardController.ts:11](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/input/KeyboardController.ts#L11)

## Methods

### andPressed

▸ **andPressed**(`keyCodes`): `boolean`

Returns TRUE if all the given keys are being pressed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keyCodes` | `string`[] | The codes of the keys to check |

#### Returns

`boolean`

TRUE for pressed, FALSE instead

**`See`**

[KeyboardEvent: code property](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)

#### Defined in

[src/input/KeyboardController.ts:60](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/input/KeyboardController.ts#L60)

___

### andPressedReturn

▸ **andPressedReturn**<`T`\>(`keyCodes`, `returnTrue`, `returnFalse`): `T`

This method accepts two parameters that will be returned depending on whether all the given keys are being pressed.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keyCodes` | `string`[] | The codes of the keys to check |
| `returnTrue` | `T` | The value to return if the key is pressed |
| `returnFalse` | `T` | The value to return if the key is not pressed |

#### Returns

`T`

The returnTrue for pressed or the returnFalse instead

**`See`**

[KeyboardEvent: code property](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)

#### Defined in

[src/input/KeyboardController.ts:98](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/input/KeyboardController.ts#L98)

___

### isPressed

▸ **isPressed**(`keyCode`): `boolean`

Returns TRUE if the given key is being pressed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keyCode` | `string` | The code of the key to check |

#### Returns

`boolean`

TRUE true for pressed, FALSE instead

**`See`**

[KeyboardEvent: code property](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)

#### Defined in

[src/input/KeyboardController.ts:40](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/input/KeyboardController.ts#L40)

___

### isPressedReturn

▸ **isPressedReturn**<`T`\>(`keyCode`, `returnTrue`, `returnFalse`): `T`

This method accepts two parameters that will be returned depending on whether the key is pressed or not.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keyCode` | `string` | The code of the key to check |
| `returnTrue` | `T` | The value to return if the key is pressed |
| `returnFalse` | `T` | The value to return if the key is not pressed |

#### Returns

`T`

The returnTrue for pressed or the returnFalse instead

**`See`**

[KeyboardEvent: code property](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)

#### Defined in

[src/input/KeyboardController.ts:72](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/input/KeyboardController.ts#L72)

___

### orPressed

▸ **orPressed**(`keyCodes`): `boolean`

Returns TRUE if one of the given keys is being pressed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keyCodes` | `string`[] | The codes of the keys to check |

#### Returns

`boolean`

TRUE for pressed, FALSE instead

**`See`**

[KeyboardEvent: code property](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)

#### Defined in

[src/input/KeyboardController.ts:50](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/input/KeyboardController.ts#L50)

___

### orPressedReturn

▸ **orPressedReturn**<`T`\>(`keyCodes`, `returnTrue`, `returnFalse`): `T`

This method accepts two parameters that will be returned depending on whether one of the given keys is being pressed.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keyCodes` | `string`[] | The codes of the keys to check |
| `returnTrue` | `T` | The value to return if the key is pressed |
| `returnFalse` | `T` | The value to return if the key is not pressed |

#### Returns

`T`

The returnTrue for pressed or the returnFalse instead

**`See`**

[KeyboardEvent: code property](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)

#### Defined in

[src/input/KeyboardController.ts:84](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/input/KeyboardController.ts#L84)
