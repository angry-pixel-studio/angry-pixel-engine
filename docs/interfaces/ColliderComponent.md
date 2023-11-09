[angry-pixel](../README.md) / [Exports](../modules.md) / ColliderComponent

# Interface: ColliderComponent

Every collider component implements this interface.

## Table of contents

### Methods

- [collidesWithLayer](ColliderComponent.md#collideswithlayer)
- [getCollisionWithLayer](ColliderComponent.md#getcollisionwithlayer)
- [getCollisionsWithLayer](ColliderComponent.md#getcollisionswithlayer)

## Methods

### collidesWithLayer

▸ **collidesWithLayer**(`layer`): `boolean`

Check if the collider is in contact with any collider of the given layer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `layer` | `string` | The layer to check |

#### Returns

`boolean`

TRUE if is colliding, FALSE instead

#### Defined in

[src/component/collider/Collider.ts:32](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/component/collider/Collider.ts#L32)

___

### getCollisionWithLayer

▸ **getCollisionWithLayer**(`layer`): [`CollisionData`](CollisionData.md)

If there is a collision with the given layer, it returns information about it, or null if there is none.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `layer` | `string` | The layer to check |

#### Returns

[`CollisionData`](CollisionData.md)

The collision data object, or NULL instead

#### Defined in

[src/component/collider/Collider.ts:38](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/component/collider/Collider.ts#L38)

___

### getCollisionsWithLayer

▸ **getCollisionsWithLayer**(`layer`): [`CollisionData`](CollisionData.md)[]

If there are collisions with the given layer, it returns information about every collision.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `layer` | `string` | The layer to check |

#### Returns

[`CollisionData`](CollisionData.md)[]

The collection of collision data

#### Defined in

[src/component/collider/Collider.ts:44](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/component/collider/Collider.ts#L44)
