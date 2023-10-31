[angry-pixel](../README.md) / [Exports](../modules.md) / Vector2

# Class: Vector2

## Table of contents

### Constructors

- [constructor](Vector2.md#constructor)

### Accessors

- [magnitude](Vector2.md#magnitude)
- [x](Vector2.md#x)
- [y](Vector2.md#y)

### Methods

- [clone](Vector2.md#clone)
- [copy](Vector2.md#copy)
- [distance](Vector2.md#distance)
- [equals](Vector2.md#equals)
- [set](Vector2.md#set)
- [add](Vector2.md#add)
- [cross](Vector2.md#cross)
- [dot](Vector2.md#dot)
- [normal](Vector2.md#normal)
- [round](Vector2.md#round)
- [scale](Vector2.md#scale)
- [subtract](Vector2.md#subtract)
- [unit](Vector2.md#unit)

## Constructors

### constructor

• **new Vector2**(`x?`, `y?`): [`Vector2`](Vector2.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x?` | `number` |
| `y?` | `number` |

#### Returns

[`Vector2`](Vector2.md)

#### Defined in

node_modules/angry-pixel-math/lib/Vector2.d.ts:4

## Accessors

### magnitude

• `get` **magnitude**(): `number`

Get the magnitude of the vector

#### Returns

`number`

The magnitude of the vector

#### Defined in

node_modules/angry-pixel-math/lib/Vector2.d.ts:14

___

### x

• `get` **x**(): `number`

#### Returns

`number`

#### Defined in

node_modules/angry-pixel-math/lib/Vector2.d.ts:5

• `set` **x**(`x`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |

#### Returns

`void`

#### Defined in

node_modules/angry-pixel-math/lib/Vector2.d.ts:6

___

### y

• `get` **y**(): `number`

#### Returns

`number`

#### Defined in

node_modules/angry-pixel-math/lib/Vector2.d.ts:7

• `set` **y**(`y`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `y` | `number` |

#### Returns

`void`

#### Defined in

node_modules/angry-pixel-math/lib/Vector2.d.ts:8

## Methods

### clone

▸ **clone**(): [`Vector2`](Vector2.md)

Colne a vector into a new instace

#### Returns

[`Vector2`](Vector2.md)

The cloned vector

#### Defined in

node_modules/angry-pixel-math/lib/Vector2.d.ts:40

___

### copy

▸ **copy**(`vector`): `void`

Copy the target vector properties

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vector` | [`Vector2`](Vector2.md) | The vector to copy from |

#### Returns

`void`

#### Defined in

node_modules/angry-pixel-math/lib/Vector2.d.ts:27

___

### distance

▸ **distance**(`vector`): `number`

Get the distance with another vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vector` | [`Vector2`](Vector2.md) | The vector to compare |

#### Returns

`number`

The magnitude of the distance

#### Defined in

node_modules/angry-pixel-math/lib/Vector2.d.ts:47

___

### equals

▸ **equals**(`vector`): `boolean`

Compare if two vector are equals

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vector` | [`Vector2`](Vector2.md) | The vector to compare |

#### Returns

`boolean`

True if the vectors are equals, false if not

#### Defined in

node_modules/angry-pixel-math/lib/Vector2.d.ts:34

___

### set

▸ **set**(`x`, `y`): `void`

Set the vector

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

#### Returns

`void`

#### Defined in

node_modules/angry-pixel-math/lib/Vector2.d.ts:21

___

### add

▸ **add**(`out`, `a`, `b`): [`Vector2`](Vector2.md)

Calculates a + b

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `out` | [`Vector2`](Vector2.md) | The output vector |
| `a` | [`Vector2`](Vector2.md) | The first operand |
| `b` | [`Vector2`](Vector2.md) | The second operand |

#### Returns

[`Vector2`](Vector2.md)

The output vector

#### Defined in

node_modules/angry-pixel-math/lib/Vector2.d.ts:56

___

### cross

▸ **cross**(`a`, `b`): `number`

Calculates the cross product of two vectors and returns a scalar value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | [`Vector2`](Vector2.md) | The first operand |
| `b` | [`Vector2`](Vector2.md) | The second operand |

#### Returns

`number`

The cross produc result

#### Defined in

node_modules/angry-pixel-math/lib/Vector2.d.ts:106

___

### dot

▸ **dot**(`a`, `b`): `number`

Calculates the dot product of two vectors and returns a scalar value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | [`Vector2`](Vector2.md) | The first operand |
| `b` | [`Vector2`](Vector2.md) | The second operand |

#### Returns

`number`

The dot product result

#### Defined in

node_modules/angry-pixel-math/lib/Vector2.d.ts:98

___

### normal

▸ **normal**(`out`, `a`): [`Vector2`](Vector2.md)

Normalize a vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `out` | [`Vector2`](Vector2.md) | The output vector |
| `a` | [`Vector2`](Vector2.md) | The vector to normalize |

#### Returns

[`Vector2`](Vector2.md)

The output vector

#### Defined in

node_modules/angry-pixel-math/lib/Vector2.d.ts:81

___

### round

▸ **round**(`out`, `a`): [`Vector2`](Vector2.md)

Rounds a vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `out` | [`Vector2`](Vector2.md) | - |
| `a` | [`Vector2`](Vector2.md) | The vector to round |

#### Returns

[`Vector2`](Vector2.md)

The output vector

#### Defined in

node_modules/angry-pixel-math/lib/Vector2.d.ts:113

___

### scale

▸ **scale**(`out`, `a`, `scalar`): [`Vector2`](Vector2.md)

Scale a vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `out` | [`Vector2`](Vector2.md) | The output vector |
| `a` | [`Vector2`](Vector2.md) | The vector to scale |
| `scalar` | `number` | The scalar value |

#### Returns

[`Vector2`](Vector2.md)

The output vector

#### Defined in

node_modules/angry-pixel-math/lib/Vector2.d.ts:90

___

### subtract

▸ **subtract**(`out`, `a`, `b`): [`Vector2`](Vector2.md)

Calculates a - b

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `out` | [`Vector2`](Vector2.md) | The output vector |
| `a` | [`Vector2`](Vector2.md) | The first operand |
| `b` | [`Vector2`](Vector2.md) | The second operand |

#### Returns

[`Vector2`](Vector2.md)

The output vector

#### Defined in

node_modules/angry-pixel-math/lib/Vector2.d.ts:65

___

### unit

▸ **unit**(`out`, `a`): [`Vector2`](Vector2.md)

Returns the unit vector

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `out` | [`Vector2`](Vector2.md) | The output vector |
| `a` | [`Vector2`](Vector2.md) | The vector to get the unit |

#### Returns

[`Vector2`](Vector2.md)

The output vector

#### Defined in

node_modules/angry-pixel-math/lib/Vector2.d.ts:73
