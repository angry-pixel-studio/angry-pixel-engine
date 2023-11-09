[angry-pixel](../README.md) / [Exports](../modules.md) / BoxColliderOptions

# Interface: BoxColliderOptions

BoxCollider configuration options

## Hierarchy

- [`InitOptions`](InitOptions.md)

  ↳ **`BoxColliderOptions`**

## Table of contents

### Properties

- [debug](BoxColliderOptions.md#debug)
- [height](BoxColliderOptions.md#height)
- [layer](BoxColliderOptions.md#layer)
- [offsetX](BoxColliderOptions.md#offsetx)
- [offsetY](BoxColliderOptions.md#offsety)
- [physics](BoxColliderOptions.md#physics)
- [rotation](BoxColliderOptions.md#rotation)
- [width](BoxColliderOptions.md#width)

## Properties

### debug

• `Optional` **debug**: `boolean`

If debug mode is enabled, the collider shape is rendered using the object's render layer

#### Defined in

[src/component/collider/BoxCollider.ts:27](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/collider/BoxCollider.ts#L27)

___

### height

• **height**: `number`

Height of the rectangle in pixels

#### Defined in

[src/component/collider/BoxCollider.ts:15](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/collider/BoxCollider.ts#L15)

___

### layer

• `Optional` **layer**: `string`

Collision layer, if it's not setted, it uses the game object layer

#### Defined in

[src/component/collider/BoxCollider.ts:23](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/collider/BoxCollider.ts#L23)

___

### offsetX

• `Optional` **offsetX**: `number`

x-axis offset

#### Defined in

[src/component/collider/BoxCollider.ts:17](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/collider/BoxCollider.ts#L17)

___

### offsetY

• `Optional` **offsetY**: `number`

y-axis offset

#### Defined in

[src/component/collider/BoxCollider.ts:19](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/collider/BoxCollider.ts#L19)

___

### physics

• `Optional` **physics**: `boolean`

TRUE if this collider interact with rigid bodies

#### Defined in

[src/component/collider/BoxCollider.ts:25](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/collider/BoxCollider.ts#L25)

___

### rotation

• `Optional` **rotation**: [`Rotation`](../classes/Rotation.md)

Rectangle rotation (degrees or radians)

#### Defined in

[src/component/collider/BoxCollider.ts:21](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/collider/BoxCollider.ts#L21)

___

### width

• **width**: `number`

Width of the rectangle in pixels

#### Defined in

[src/component/collider/BoxCollider.ts:13](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/component/collider/BoxCollider.ts#L13)
