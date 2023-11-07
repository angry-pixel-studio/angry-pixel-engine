[angry-pixel](../README.md) / [Exports](../modules.md) / CollisionData

# Interface: CollisionData

Information about the collision

## Table of contents

### Properties

- [collider](CollisionData.md#collider)
- [gameObject](CollisionData.md#gameobject)
- [getGameObject](CollisionData.md#getgameobject)
- [resolution](CollisionData.md#resolution)

## Properties

### collider

• **collider**: [`ICollider`](ICollider.md)

The collider on the other side of the collision.

#### Defined in

[src/component/collider/Collider.ts:13](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/2e7a4eb/src/component/collider/Collider.ts#L13)

___

### gameObject

• **gameObject**: [`GameObject`](../classes/GameObject.md)

The object on the other side of the collision.

#### Defined in

[src/component/collider/Collider.ts:15](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/2e7a4eb/src/component/collider/Collider.ts#L15)

___

### getGameObject

• **getGameObject**: <T\>() => `T`

#### Type declaration

▸ <`T`\>(): `T`

##### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`GameObject`](../classes/GameObject.md) |

##### Returns

`T`

The object on the other side of the collision.

#### Defined in

[src/component/collider/Collider.ts:19](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/2e7a4eb/src/component/collider/Collider.ts#L19)

___

### resolution

• **resolution**: [`ICollisionResolution`](ICollisionResolution.md)

Contains information about the penetration and direction of the collision.

#### Defined in

[src/component/collider/Collider.ts:11](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/2e7a4eb/src/component/collider/Collider.ts#L11)
