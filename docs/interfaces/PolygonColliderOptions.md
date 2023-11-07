[angry-pixel](../README.md) / [Exports](../modules.md) / PolygonColliderOptions

# Interface: PolygonColliderOptions

PolygonCollider configuration options

## Hierarchy

- [`InitOptions`](InitOptions.md)

  ↳ **`PolygonColliderOptions`**

## Table of contents

### Properties

- [debug](PolygonColliderOptions.md#debug)
- [layer](PolygonColliderOptions.md#layer)
- [offsetX](PolygonColliderOptions.md#offsetx)
- [offsetY](PolygonColliderOptions.md#offsety)
- [physics](PolygonColliderOptions.md#physics)
- [rotation](PolygonColliderOptions.md#rotation)
- [vertexModel](PolygonColliderOptions.md#vertexmodel)

## Properties

### debug

• `Optional` **debug**: `boolean`

If debug mode is enabled, the collider shape is rendered using the object's render layer

#### Defined in

[src/component/collider/PolygonCollider.ts:27](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/2e7a4eb/src/component/collider/PolygonCollider.ts#L27)

___

### layer

• `Optional` **layer**: `string`

Collision layer, if it's not setted, it uses the game object layer

#### Defined in

[src/component/collider/PolygonCollider.ts:23](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/2e7a4eb/src/component/collider/PolygonCollider.ts#L23)

___

### offsetX

• `Optional` **offsetX**: `number`

x-axis offset

#### Defined in

[src/component/collider/PolygonCollider.ts:17](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/2e7a4eb/src/component/collider/PolygonCollider.ts#L17)

___

### offsetY

• `Optional` **offsetY**: `number`

y-axis offset

#### Defined in

[src/component/collider/PolygonCollider.ts:19](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/2e7a4eb/src/component/collider/PolygonCollider.ts#L19)

___

### physics

• `Optional` **physics**: `boolean`

TRUE if this collider interact with rigid bodies

#### Defined in

[src/component/collider/PolygonCollider.ts:25](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/2e7a4eb/src/component/collider/PolygonCollider.ts#L25)

___

### rotation

• `Optional` **rotation**: [`Rotation`](../classes/Rotation.md)

Edges rotation (degrees or radians)

#### Defined in

[src/component/collider/PolygonCollider.ts:21](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/2e7a4eb/src/component/collider/PolygonCollider.ts#L21)

___

### vertexModel

• **vertexModel**: [`Vector2`](../classes/Vector2.md)[]

Collection of 2d vectors representing the vertices of the collider

#### Defined in

[src/component/collider/PolygonCollider.ts:15](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/2e7a4eb/src/component/collider/PolygonCollider.ts#L15)
