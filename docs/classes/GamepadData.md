[angry-pixel](../README.md) / [Exports](../modules.md) / GamepadData

# Class: GamepadData

Represents a connected gamepad and has the information of all its buttons and axes.

## Table of contents

### Constructors

- [constructor](GamepadData.md#constructor)

### Accessors

- [anyButtonPressed](GamepadData.md#anybuttonpressed)
- [back](GamepadData.md#back)
- [bottomFace](GamepadData.md#bottomface)
- [connected](GamepadData.md#connected)
- [dpadAxes](GamepadData.md#dpadaxes)
- [dpadDown](GamepadData.md#dpaddown)
- [dpadLeft](GamepadData.md#dpadleft)
- [dpadRight](GamepadData.md#dpadright)
- [dpadUp](GamepadData.md#dpadup)
- [id](GamepadData.md#id)
- [leftFace](GamepadData.md#leftface)
- [leftShoulder](GamepadData.md#leftshoulder)
- [leftStickAxes](GamepadData.md#leftstickaxes)
- [leftStickButton](GamepadData.md#leftstickbutton)
- [leftStickHorizontal](GamepadData.md#leftstickhorizontal)
- [leftStickVertical](GamepadData.md#leftstickvertical)
- [leftTrigger](GamepadData.md#lefttrigger)
- [rightFace](GamepadData.md#rightface)
- [rightShoulder](GamepadData.md#rightshoulder)
- [rightStickAxes](GamepadData.md#rightstickaxes)
- [rightStickButton](GamepadData.md#rightstickbutton)
- [rightStickHorizontal](GamepadData.md#rightstickhorizontal)
- [rightStickVertical](GamepadData.md#rightstickvertical)
- [rightTrigger](GamepadData.md#righttrigger)
- [start](GamepadData.md#start)
- [topFace](GamepadData.md#topface)
- [vibrating](GamepadData.md#vibrating)

### Methods

- [getAxis](GamepadData.md#getaxis)
- [getButtonPressed](GamepadData.md#getbuttonpressed)
- [vibrate](GamepadData.md#vibrate)

## Constructors

### constructor

• **new GamepadData**(): [`GamepadData`](GamepadData.md)

#### Returns

[`GamepadData`](GamepadData.md)

## Accessors

### anyButtonPressed

• `get` **anyButtonPressed**(): `boolean`

TRUE if any button is pressed

#### Returns

`boolean`

#### Defined in

[src/input/GamepadController.ts:331](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/input/GamepadController.ts#L331)

___

### back

• `get` **back**(): `boolean`

TRUE if back button is pressed (a.k.a. select button)

#### Returns

`boolean`

#### Defined in

[src/input/GamepadController.ts:267](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/input/GamepadController.ts#L267)

___

### bottomFace

• `get` **bottomFace**(): `boolean`

TRUE if bottom face button is pressed (Dual Shock: X. Xbox: A. Nintendo: B)

#### Returns

`boolean`

#### Defined in

[src/input/GamepadController.ts:203](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/input/GamepadController.ts#L203)

___

### connected

• `get` **connected**(): `boolean`

TRUE if the gamepad is connected

#### Returns

`boolean`

#### Defined in

[src/input/GamepadController.ts:112](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/input/GamepadController.ts#L112)

___

### dpadAxes

• `get` **dpadAxes**(): [`Vector2`](Vector2.md)

The values of the d-pad axes represented as a xy vector

#### Returns

[`Vector2`](Vector2.md)

#### Defined in

[src/input/GamepadController.ts:144](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/input/GamepadController.ts#L144)

___

### dpadDown

• `get` **dpadDown**(): `boolean`

TRUE if d-pad down is pressed

#### Returns

`boolean`

#### Defined in

[src/input/GamepadController.ts:179](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/input/GamepadController.ts#L179)

___

### dpadLeft

• `get` **dpadLeft**(): `boolean`

TRUE if d-pad left is pressed

#### Returns

`boolean`

#### Defined in

[src/input/GamepadController.ts:187](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/input/GamepadController.ts#L187)

___

### dpadRight

• `get` **dpadRight**(): `boolean`

TRUE if d-pad right is pressed

#### Returns

`boolean`

#### Defined in

[src/input/GamepadController.ts:195](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/input/GamepadController.ts#L195)

___

### dpadUp

• `get` **dpadUp**(): `boolean`

TRUE if d-pad up is pressed

#### Returns

`boolean`

#### Defined in

[src/input/GamepadController.ts:171](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/input/GamepadController.ts#L171)

___

### id

• `get` **id**(): `string`

The gamepad id

#### Returns

`string`

#### Defined in

[src/input/GamepadController.ts:104](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/input/GamepadController.ts#L104)

___

### leftFace

• `get` **leftFace**(): `boolean`

TRUE if left face button is pressed (Dual Shock: Circle. Xbox: B. Nintendo: A)

#### Returns

`boolean`

#### Defined in

[src/input/GamepadController.ts:219](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/input/GamepadController.ts#L219)

___

### leftShoulder

• `get` **leftShoulder**(): `boolean`

TRUE if left shoulder button is pressed (Dual Shock: L1. Xbox: LB. Nintendo: L)

#### Returns

`boolean`

#### Defined in

[src/input/GamepadController.ts:235](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/input/GamepadController.ts#L235)

___

### leftStickAxes

• `get` **leftStickAxes**(): [`Vector2`](Vector2.md)

The values of the left stick axes represented as a xy vector

#### Returns

[`Vector2`](Vector2.md)

#### Defined in

[src/input/GamepadController.ts:153](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/input/GamepadController.ts#L153)

___

### leftStickButton

• `get` **leftStickButton**(): `boolean`

TRUE if left stick button is pressed

#### Returns

`boolean`

#### Defined in

[src/input/GamepadController.ts:283](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/input/GamepadController.ts#L283)

___

### leftStickHorizontal

• `get` **leftStickHorizontal**(): `number`

Left stick horizontal axes value

#### Returns

`number`

#### Defined in

[src/input/GamepadController.ts:299](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/input/GamepadController.ts#L299)

___

### leftStickVertical

• `get` **leftStickVertical**(): `number`

Left stick vertical axes value

#### Returns

`number`

#### Defined in

[src/input/GamepadController.ts:307](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/input/GamepadController.ts#L307)

___

### leftTrigger

• `get` **leftTrigger**(): `boolean`

TRUE if left trigger button is pressed (Dual Shock: L2. Xbox: LT. Nintendo: ZL)

#### Returns

`boolean`

#### Defined in

[src/input/GamepadController.ts:251](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/input/GamepadController.ts#L251)

___

### rightFace

• `get` **rightFace**(): `boolean`

TRUE if right face button is pressed (Dual Shock: Square. Xbox: X. Nintendo: Y)

#### Returns

`boolean`

#### Defined in

[src/input/GamepadController.ts:211](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/input/GamepadController.ts#L211)

___

### rightShoulder

• `get` **rightShoulder**(): `boolean`

TRUE if right shoulder button is pressed (Dual Shock: R1. Xbox: RB. Nintendo: R)

#### Returns

`boolean`

#### Defined in

[src/input/GamepadController.ts:243](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/input/GamepadController.ts#L243)

___

### rightStickAxes

• `get` **rightStickAxes**(): [`Vector2`](Vector2.md)

The values of the right stick axes represented as a xy vector

#### Returns

[`Vector2`](Vector2.md)

#### Defined in

[src/input/GamepadController.ts:162](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/input/GamepadController.ts#L162)

___

### rightStickButton

• `get` **rightStickButton**(): `boolean`

TRUE if right stick button is pressed

#### Returns

`boolean`

#### Defined in

[src/input/GamepadController.ts:291](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/input/GamepadController.ts#L291)

___

### rightStickHorizontal

• `get` **rightStickHorizontal**(): `number`

Right stick horizontal axes value

#### Returns

`number`

#### Defined in

[src/input/GamepadController.ts:315](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/input/GamepadController.ts#L315)

___

### rightStickVertical

• `get` **rightStickVertical**(): `number`

Right stick vertical axes value

#### Returns

`number`

#### Defined in

[src/input/GamepadController.ts:323](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/input/GamepadController.ts#L323)

___

### rightTrigger

• `get` **rightTrigger**(): `boolean`

TRUE if right trigger button is pressed (Dual Shock: R2. Xbox: RT. Nintendo: ZR)

#### Returns

`boolean`

#### Defined in

[src/input/GamepadController.ts:259](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/input/GamepadController.ts#L259)

___

### start

• `get` **start**(): `boolean`

TRUE if start button is pressed (a.k.a. options button)

#### Returns

`boolean`

#### Defined in

[src/input/GamepadController.ts:275](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/input/GamepadController.ts#L275)

___

### topFace

• `get` **topFace**(): `boolean`

TRUE if top face button is pressed (Dual Shock: Triangle. Xbox: Y. Nintendo: X)

#### Returns

`boolean`

#### Defined in

[src/input/GamepadController.ts:227](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/input/GamepadController.ts#L227)

___

### vibrating

• `get` **vibrating**(): `boolean`

TRUE if the vibration is on

#### Returns

`boolean`

#### Defined in

[src/input/GamepadController.ts:339](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/input/GamepadController.ts#L339)

## Methods

### getAxis

▸ **getAxis**(`index`): `number`

Returns the value of an axis by its index

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The axis index: - 0: Left stick horizontal axix - 1: Left stick vertical axix - 2: Right stick horizontal axix - 3: Right stick vertical axix |

#### Returns

`number`

The axis value

**`See`**

[Gamepad: axes property](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad/axes)

#### Defined in

[src/input/GamepadController.ts:136](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/input/GamepadController.ts#L136)

___

### getButtonPressed

▸ **getButtonPressed**(`index`): `boolean`

Checks if a button is being pressed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | the button index |

#### Returns

`boolean`

TRUE if the button is pressed, FALSE instead

**`See`**

[Gamepad: buttons property](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad/buttons)

#### Defined in

[src/input/GamepadController.ts:122](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/input/GamepadController.ts#L122)

___

### vibrate

▸ **vibrate**(`duration?`, `weakMagnitude?`, `strongMagnitude?`, `startDelay?`): `void`

Turns on the gamepad vibration

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `duration` | `number` | `200` | The duration of the effect in milliseconds |
| `weakMagnitude` | `number` | `0.2` | Rumble intensity of the high-frequency (weak) rumble motors, normalized to the range between 0.0 and 1.0 |
| `strongMagnitude` | `number` | `0.2` | Rumble intensity of the low-frequency (strong) rumble motors, normalized to the range between 0.0 and 1.0 |
| `startDelay` | `number` | `0` | The delay in milliseconds before the effect is started |

#### Returns

`void`

#### Defined in

[src/input/GamepadController.ts:350](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/input/GamepadController.ts#L350)
