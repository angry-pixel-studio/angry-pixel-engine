[angry-pixel](../README.md) / [Exports](../modules.md) / IPhysicsManager

# Interface: IPhysicsManager

## Table of contents

### Methods

- [addCollider](IPhysicsManager.md#addcollider)
- [addRigidBody](IPhysicsManager.md#addrigidbody)
- [clear](IPhysicsManager.md#clear)
- [getCollisionsForCollider](IPhysicsManager.md#getcollisionsforcollider)
- [removeCollider](IPhysicsManager.md#removecollider)
- [removeRigidBody](IPhysicsManager.md#removerigidbody)
- [resolve](IPhysicsManager.md#resolve)

## Methods

### addCollider

▸ **addCollider**(`colliderDto`): [`ICollider`](ICollider.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `colliderDto` | `IColliderDto` |

#### Returns

[`ICollider`](ICollider.md)

#### Defined in

node_modules/angry-pixel-2d-physics/lib/PhysicsManager.d.ts:9

___

### addRigidBody

▸ **addRigidBody**(`rigidBodyDto`): `IRigidBody`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rigidBodyDto` | `IRigidBodyDto` |

#### Returns

`IRigidBody`

#### Defined in

node_modules/angry-pixel-2d-physics/lib/PhysicsManager.d.ts:12

___

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Defined in

node_modules/angry-pixel-2d-physics/lib/PhysicsManager.d.ts:15

___

### getCollisionsForCollider

▸ **getCollisionsForCollider**(`collider`): [`ICollision`](ICollision.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `collider` | [`ICollider`](ICollider.md) |

#### Returns

[`ICollision`](ICollision.md)[]

#### Defined in

node_modules/angry-pixel-2d-physics/lib/PhysicsManager.d.ts:11

___

### removeCollider

▸ **removeCollider**(`collider`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `collider` | [`ICollider`](ICollider.md) |

#### Returns

`void`

#### Defined in

node_modules/angry-pixel-2d-physics/lib/PhysicsManager.d.ts:10

___

### removeRigidBody

▸ **removeRigidBody**(`rigidBody`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rigidBody` | `IRigidBody` |

#### Returns

`void`

#### Defined in

node_modules/angry-pixel-2d-physics/lib/PhysicsManager.d.ts:13

___

### resolve

▸ **resolve**(`time`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `time` | `number` |

#### Returns

`void`

#### Defined in

node_modules/angry-pixel-2d-physics/lib/PhysicsManager.d.ts:14
