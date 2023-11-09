[angry-pixel](../README.md) / [Exports](../modules.md) / RigidBodyOptions

# Interface: RigidBodyOptions

RigidBody configuration options

## Hierarchy

- [`InitOptions`](InitOptions.md)

  ↳ **`RigidBodyOptions`**

## Table of contents

### Properties

- [gravity](RigidBodyOptions.md#gravity)
- [rigidBodyType](RigidBodyOptions.md#rigidbodytype)

## Properties

### gravity

• `Optional` **gravity**: `number`

Gravity expressed in pixels per second squared. Only applies fot Dynamic bodies

#### Defined in

[src/component/RigidBody.ts:20](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/component/RigidBody.ts#L20)

___

### rigidBodyType

• **rigidBodyType**: [`RigidBodyType`](../enums/RigidBodyType.md)

The type determines how it will respond to physics and collisions.
  - Dynamic = This type of body is affected by gravity, can be velocity-applied and collides with all types of bodies.
  - Kinematic = This body type is not affected by gravity but can have velocity applied to it. Dynamic bodies can collide with it.
  - Static = This type of body is immovable, no velocity can be applied to it and it is not affected by gravity. It is the body type that consumes the least processing resources.

#### Defined in

[src/component/RigidBody.ts:18](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/component/RigidBody.ts#L18)
