[angry-pixel](../README.md) / [Exports](../modules.md) / KeyboardController

# Class: KeyboardController

Manages keyboard interaction. It uses the **code** property of the **js keyboard event**.

**`See`**

[KeyboardEvent: code property](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)

## Table of contents

### Properties

- [pressedKeys](KeyboardController.md#pressedkeys)

### Methods

- [andPressed](KeyboardController.md#andpressed)
- [andPressedReturn](KeyboardController.md#andpressedreturn)
- [isPressed](KeyboardController.md#ispressed)
- [isPressedReturn](KeyboardController.md#ispressedreturn)
- [orPressed](KeyboardController.md#orpressed)
- [orPressedReturn](KeyboardController.md#orpressedreturn)

## Properties

### pressedKeys

• `Readonly` **pressedKeys**: `string`[] = `[]`

The current pressed keys

#### Defined in

[src/input/KeyboardController.ts:11](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/input/KeyboardController.ts#L11)

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

[src/input/KeyboardController.ts:61](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/input/KeyboardController.ts#L61)

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

[src/input/KeyboardController.ts:99](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/input/KeyboardController.ts#L99)

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

[src/input/KeyboardController.ts:41](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/input/KeyboardController.ts#L41)

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

[src/input/KeyboardController.ts:73](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/input/KeyboardController.ts#L73)

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

[src/input/KeyboardController.ts:51](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/input/KeyboardController.ts#L51)

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

[src/input/KeyboardController.ts:85](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/input/KeyboardController.ts#L85)
