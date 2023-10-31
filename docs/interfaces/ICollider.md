[angry-pixel](../README.md) / [Exports](../modules.md) / ICollider

# Interface: ICollider

## Table of contents

### Properties

- [active](ICollider.md#active)
- [group](ICollider.md#group)
- [id](ICollider.md#id)
- [layer](ICollider.md#layer)
- [onCollision](ICollider.md#oncollision)
- [physics](ICollider.md#physics)
- [position](ICollider.md#position)
- [rotation](ICollider.md#rotation)
- [shape](ICollider.md#shape)
- [updateCollisions](ICollider.md#updatecollisions)

## Properties

### active

• **active**: `boolean`

#### Defined in

node_modules/angry-pixel-2d-physics/lib/collision/ICollider.d.ts:6

___

### group

• `Optional` **group**: `string`

#### Defined in

node_modules/angry-pixel-2d-physics/lib/collision/ICollider.d.ts:13

___

### id

• **id**: `number`

#### Defined in

node_modules/angry-pixel-2d-physics/lib/collision/ICollider.d.ts:5

___

### layer

• **layer**: `string`

#### Defined in

node_modules/angry-pixel-2d-physics/lib/collision/ICollider.d.ts:10

___

### onCollision

• `Optional` **onCollision**: (`resolution`: [`ICollisionResolution`](ICollisionResolution.md)) => `void`

#### Type declaration

▸ (`resolution`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `resolution` | [`ICollisionResolution`](ICollisionResolution.md) |

##### Returns

`void`

#### Defined in

node_modules/angry-pixel-2d-physics/lib/collision/ICollider.d.ts:14

___

### physics

• **physics**: `boolean`

#### Defined in

node_modules/angry-pixel-2d-physics/lib/collision/ICollider.d.ts:12

___

### position

• **position**: [`Vector2`](../classes/Vector2.md)

#### Defined in

node_modules/angry-pixel-2d-physics/lib/collision/ICollider.d.ts:8

___

### rotation

• **rotation**: `number`

#### Defined in

node_modules/angry-pixel-2d-physics/lib/collision/ICollider.d.ts:9

___

### shape

• **shape**: `IShape`

#### Defined in

node_modules/angry-pixel-2d-physics/lib/collision/ICollider.d.ts:7

___

### updateCollisions

• **updateCollisions**: `boolean`

#### Defined in

node_modules/angry-pixel-2d-physics/lib/collision/ICollider.d.ts:11
