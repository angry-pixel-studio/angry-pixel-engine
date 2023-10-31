[angry-pixel](../README.md) / [Exports](../modules.md) / Rectangle

# Class: Rectangle

## Table of contents

### Constructors

- [constructor](Rectangle.md#constructor)

### Accessors

- [center](Rectangle.md#center)
- [height](Rectangle.md#height)
- [position](Rectangle.md#position)
- [width](Rectangle.md#width)
- [x](Rectangle.md#x)
- [x1](Rectangle.md#x1)
- [y](Rectangle.md#y)
- [y1](Rectangle.md#y1)

### Methods

- [contains](Rectangle.md#contains)
- [copy](Rectangle.md#copy)
- [equals](Rectangle.md#equals)
- [overlaps](Rectangle.md#overlaps)
- [set](Rectangle.md#set)

## Constructors

### constructor

• **new Rectangle**(`x`, `y`, `width`, `height`): [`Rectangle`](Rectangle.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `width` | `number` |
| `height` | `number` |

#### Returns

[`Rectangle`](Rectangle.md)

#### Defined in

node_modules/angry-pixel-math/lib/Rectangle.d.ts:7

## Accessors

### center

• `get` **center**(): [`Vector2`](Vector2.md)

#### Returns

[`Vector2`](Vector2.md)

#### Defined in

node_modules/angry-pixel-math/lib/Rectangle.d.ts:20

___

### height

• `get` **height**(): `number`

#### Returns

`number`

#### Defined in

node_modules/angry-pixel-math/lib/Rectangle.d.ts:18

• `set` **height**(`height`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `height` | `number` |

#### Returns

`void`

#### Defined in

node_modules/angry-pixel-math/lib/Rectangle.d.ts:19

___

### position

• `get` **position**(): [`Vector2`](Vector2.md)

#### Returns

[`Vector2`](Vector2.md)

#### Defined in

node_modules/angry-pixel-math/lib/Rectangle.d.ts:14

• `set` **position**(`position`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`Vector2`](Vector2.md) |

#### Returns

`void`

#### Defined in

node_modules/angry-pixel-math/lib/Rectangle.d.ts:15

___

### width

• `get` **width**(): `number`

#### Returns

`number`

#### Defined in

node_modules/angry-pixel-math/lib/Rectangle.d.ts:16

• `set` **width**(`width`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `width` | `number` |

#### Returns

`void`

#### Defined in

node_modules/angry-pixel-math/lib/Rectangle.d.ts:17

___

### x

• `get` **x**(): `number`

#### Returns

`number`

#### Defined in

node_modules/angry-pixel-math/lib/Rectangle.d.ts:8

• `set` **x**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Defined in

node_modules/angry-pixel-math/lib/Rectangle.d.ts:9

___

### x1

• `get` **x1**(): `number`

#### Returns

`number`

#### Defined in

node_modules/angry-pixel-math/lib/Rectangle.d.ts:12

___

### y

• `get` **y**(): `number`

#### Returns

`number`

#### Defined in

node_modules/angry-pixel-math/lib/Rectangle.d.ts:10

• `set` **y**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Defined in

node_modules/angry-pixel-math/lib/Rectangle.d.ts:11

___

### y1

• `get` **y1**(): `number`

#### Returns

`number`

#### Defined in

node_modules/angry-pixel-math/lib/Rectangle.d.ts:13

## Methods

### contains

▸ **contains**(`rect`): `boolean`

Check if the target rectangle is contained

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rect` | [`Rectangle`](Rectangle.md) | The target rectangle |

#### Returns

`boolean`

TRUE or FALSE

#### Defined in

node_modules/angry-pixel-math/lib/Rectangle.d.ts:56

▸ **contains**(`vector`): `boolean`

Check if the target vector is contained

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vector` | [`Vector2`](Vector2.md) | The target vector |

#### Returns

`boolean`

TRUE or FALSE

#### Defined in

node_modules/angry-pixel-math/lib/Rectangle.d.ts:63

___

### copy

▸ **copy**(`rect`): `void`

Copy the target rectangle properties

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rect` | [`Rectangle`](Rectangle.md) | The rectangle to copy from |

#### Returns

`void`

#### Defined in

node_modules/angry-pixel-math/lib/Rectangle.d.ts:42

___

### equals

▸ **equals**(`rectangle`): `boolean`

Compare if two rectangles are equals

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rectangle` | [`Rectangle`](Rectangle.md) | The rectangle to compare |

#### Returns

`boolean`

TRUE if the rectangles are equals, FALSE if not

#### Defined in

node_modules/angry-pixel-math/lib/Rectangle.d.ts:36

___

### overlaps

▸ **overlaps**(`rect`): `boolean`

Check if the target rectangle is overlapping

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rect` | [`Rectangle`](Rectangle.md) | The target rectangle |

#### Returns

`boolean`

TRUE or FALSE

#### Defined in

node_modules/angry-pixel-math/lib/Rectangle.d.ts:49

___

### set

▸ **set**(`x`, `y`, `width`, `height`): `void`

Set the rectangle

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `width` | `number` |
| `height` | `number` |

#### Returns

`void`

#### Defined in

node_modules/angry-pixel-math/lib/Rectangle.d.ts:29
