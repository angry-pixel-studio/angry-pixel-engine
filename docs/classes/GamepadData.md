[angry-pixel](../README.md) / [Exports](../modules.md) / GamepadData

# Class: GamepadData

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
- [updateFromGamepad](GamepadData.md#updatefromgamepad)
- [vibrate](GamepadData.md#vibrate)

## Constructors

### constructor

• **new GamepadData**(): [`GamepadData`](GamepadData.md)

#### Returns

[`GamepadData`](GamepadData.md)

## Accessors

### anyButtonPressed

• `get` **anyButtonPressed**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/input/GamepadController.ts:187](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/input/GamepadController.ts#L187)

___

### back

• `get` **back**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/input/GamepadController.ts:155](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/input/GamepadController.ts#L155)

___

### bottomFace

• `get` **bottomFace**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/input/GamepadController.ts:123](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/input/GamepadController.ts#L123)

___

### connected

• `get` **connected**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/input/GamepadController.ts:80](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/input/GamepadController.ts#L80)

___

### dpadAxes

• `get` **dpadAxes**(): [`Vector2`](Vector2.md)

#### Returns

[`Vector2`](Vector2.md)

#### Defined in

[src/input/GamepadController.ts:92](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/input/GamepadController.ts#L92)

___

### dpadDown

• `get` **dpadDown**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/input/GamepadController.ts:111](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/input/GamepadController.ts#L111)

___

### dpadLeft

• `get` **dpadLeft**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/input/GamepadController.ts:115](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/input/GamepadController.ts#L115)

___

### dpadRight

• `get` **dpadRight**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/input/GamepadController.ts:119](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/input/GamepadController.ts#L119)

___

### dpadUp

• `get` **dpadUp**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/input/GamepadController.ts:107](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/input/GamepadController.ts#L107)

___

### id

• `get` **id**(): `string`

#### Returns

`string`

#### Defined in

[src/input/GamepadController.ts:76](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/input/GamepadController.ts#L76)

___

### leftFace

• `get` **leftFace**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/input/GamepadController.ts:131](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/input/GamepadController.ts#L131)

___

### leftShoulder

• `get` **leftShoulder**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/input/GamepadController.ts:139](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/input/GamepadController.ts#L139)

___

### leftStickAxes

• `get` **leftStickAxes**(): [`Vector2`](Vector2.md)

#### Returns

[`Vector2`](Vector2.md)

#### Defined in

[src/input/GamepadController.ts:97](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/input/GamepadController.ts#L97)

___

### leftStickButton

• `get` **leftStickButton**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/input/GamepadController.ts:163](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/input/GamepadController.ts#L163)

___

### leftStickHorizontal

• `get` **leftStickHorizontal**(): `number`

#### Returns

`number`

#### Defined in

[src/input/GamepadController.ts:171](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/input/GamepadController.ts#L171)

___

### leftStickVertical

• `get` **leftStickVertical**(): `number`

#### Returns

`number`

#### Defined in

[src/input/GamepadController.ts:175](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/input/GamepadController.ts#L175)

___

### leftTrigger

• `get` **leftTrigger**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/input/GamepadController.ts:147](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/input/GamepadController.ts#L147)

___

### rightFace

• `get` **rightFace**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/input/GamepadController.ts:127](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/input/GamepadController.ts#L127)

___

### rightShoulder

• `get` **rightShoulder**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/input/GamepadController.ts:143](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/input/GamepadController.ts#L143)

___

### rightStickAxes

• `get` **rightStickAxes**(): [`Vector2`](Vector2.md)

#### Returns

[`Vector2`](Vector2.md)

#### Defined in

[src/input/GamepadController.ts:102](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/input/GamepadController.ts#L102)

___

### rightStickButton

• `get` **rightStickButton**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/input/GamepadController.ts:167](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/input/GamepadController.ts#L167)

___

### rightStickHorizontal

• `get` **rightStickHorizontal**(): `number`

#### Returns

`number`

#### Defined in

[src/input/GamepadController.ts:179](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/input/GamepadController.ts#L179)

___

### rightStickVertical

• `get` **rightStickVertical**(): `number`

#### Returns

`number`

#### Defined in

[src/input/GamepadController.ts:183](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/input/GamepadController.ts#L183)

___

### rightTrigger

• `get` **rightTrigger**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/input/GamepadController.ts:151](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/input/GamepadController.ts#L151)

___

### start

• `get` **start**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/input/GamepadController.ts:159](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/input/GamepadController.ts#L159)

___

### topFace

• `get` **topFace**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/input/GamepadController.ts:135](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/input/GamepadController.ts#L135)

___

### vibrating

• `get` **vibrating**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/input/GamepadController.ts:191](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/input/GamepadController.ts#L191)

## Methods

### getAxis

▸ **getAxis**(`index`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`number`

#### Defined in

[src/input/GamepadController.ts:88](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/input/GamepadController.ts#L88)

___

### getButtonPressed

▸ **getButtonPressed**(`index`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`boolean`

#### Defined in

[src/input/GamepadController.ts:84](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/input/GamepadController.ts#L84)

___

### updateFromGamepad

▸ **updateFromGamepad**(`gamepad`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `gamepad` | `Gamepad` |

#### Returns

`void`

#### Defined in

[src/input/GamepadController.ts:70](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/input/GamepadController.ts#L70)

___

### vibrate

▸ **vibrate**(`duration?`, `weakMagnitude?`, `strongMagnitude?`, `startDelay?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `duration` | `number` | `200` |
| `weakMagnitude` | `number` | `0.2` |
| `strongMagnitude` | `number` | `0.2` |
| `startDelay` | `number` | `0` |

#### Returns

`void`

#### Defined in

[src/input/GamepadController.ts:195](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/input/GamepadController.ts#L195)
