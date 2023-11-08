[angry-pixel](../README.md) / [Exports](../modules.md) / EdgeColliderOptions

# Interface: EdgeColliderOptions

EdgeCollider configuration options

## Hierarchy

- [`InitOptions`](InitOptions.md)

  ↳ **`EdgeColliderOptions`**

## Table of contents

### Properties

- [debug](EdgeColliderOptions.md#debug)
- [layer](EdgeColliderOptions.md#layer)
- [offsetX](EdgeColliderOptions.md#offsetx)
- [offsetY](EdgeColliderOptions.md#offsety)
- [physics](EdgeColliderOptions.md#physics)
- [rotation](EdgeColliderOptions.md#rotation)
- [vertexModel](EdgeColliderOptions.md#vertexmodel)

## Properties

### debug

• `Optional` **debug**: `boolean`

If debug mode is enabled, the collider shape is rendered using the object's render layer

#### Defined in

[src/component/collider/EdgeCollider.ts:27](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/component/collider/EdgeCollider.ts#L27)

___

### layer

• `Optional` **layer**: `string`

Collision layer, if it's not setted, it uses the game object layer

#### Defined in

[src/component/collider/EdgeCollider.ts:23](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/component/collider/EdgeCollider.ts#L23)

___

### offsetX

• `Optional` **offsetX**: `number`

x-axis offset

#### Defined in

[src/component/collider/EdgeCollider.ts:17](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/component/collider/EdgeCollider.ts#L17)

___

### offsetY

• `Optional` **offsetY**: `number`

y-axis offset

#### Defined in

[src/component/collider/EdgeCollider.ts:19](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/component/collider/EdgeCollider.ts#L19)

___

### physics

• `Optional` **physics**: `boolean`

TRUE if this collider interact with rigid bodies

#### Defined in

[src/component/collider/EdgeCollider.ts:25](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/component/collider/EdgeCollider.ts#L25)

___

### rotation

• `Optional` **rotation**: [`Rotation`](../classes/Rotation.md)

Edges rotation (degrees or radians)

#### Defined in

[src/component/collider/EdgeCollider.ts:21](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/component/collider/EdgeCollider.ts#L21)

___

### vertexModel

• **vertexModel**: [`Vector2`](../classes/Vector2.md)[]

Collection of 2d vectors representing the vertices of the collider

#### Defined in

[src/component/collider/EdgeCollider.ts:15](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/component/collider/EdgeCollider.ts#L15)
