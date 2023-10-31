[angry-pixel](../README.md) / [Exports](../modules.md) / GameConfig

# Interface: GameConfig

Game configuration options

## Table of contents

### Properties

- [canvasColor](GameConfig.md#canvascolor)
- [collisions](GameConfig.md#collisions)
- [containerNode](GameConfig.md#containernode)
- [debugEnabled](GameConfig.md#debugenabled)
- [gameHeight](GameConfig.md#gameheight)
- [gameWidth](GameConfig.md#gamewidth)
- [headless](GameConfig.md#headless)
- [physicsFramerate](GameConfig.md#physicsframerate)
- [spriteDefaultScale](GameConfig.md#spritedefaultscale)

## Properties

### canvasColor

• `Optional` **canvasColor**: `string`

Background color of canvas

#### Defined in

[src/core/GameConfig.ts:18](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameConfig.ts#L18)

___

### collisions

• `Optional` **collisions**: `Object`

Collision configuration options

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `collisionArea?` | [`Rectangle`](../classes/Rectangle.md) | Define a fixed area |
| `collisionBroadPhaseMethod?` | [`BroadPhaseMethods`](../enums/BroadPhaseMethods.md) | Collision broad phase method: BroadPhaseMethods.QuadTree or BroadPhaseMethods.SpartialGrid. Default values is BroadPhaseMethods.SpartialGrid |
| `collisionMatrix?` | [`CollisionMatrix`](../modules.md#collisionmatrix) | Define a fixed rectangular area for collision detection |
| `collisionMethod?` | [`CollisionMethods`](../enums/CollisionMethods.md) | Collision detection method: CollisionMethods.SAT or CollisionMethods.ABB. Default value is CollisionMethods.SAT |

#### Defined in

[src/core/GameConfig.ts:29](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameConfig.ts#L29)

___

### containerNode

• `Optional` **containerNode**: `HTMLElement`

HTML element where the game will be created

#### Defined in

[src/core/GameConfig.ts:10](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameConfig.ts#L10)

___

### debugEnabled

• `Optional` **debugEnabled**: `boolean`

Enables the debug mode

#### Defined in

[src/core/GameConfig.ts:16](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameConfig.ts#L16)

___

### gameHeight

• `Optional` **gameHeight**: `number`

Game height

#### Defined in

[src/core/GameConfig.ts:14](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameConfig.ts#L14)

___

### gameWidth

• `Optional` **gameWidth**: `number`

Game width

#### Defined in

[src/core/GameConfig.ts:12](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameConfig.ts#L12)

___

### headless

• `Optional` **headless**: `boolean`

Enable Headless mode. The input and rendering functions are turned off. Ideal for game server development

#### Defined in

[src/core/GameConfig.ts:27](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameConfig.ts#L27)

___

### physicsFramerate

• `Optional` **physicsFramerate**: `number`

Framerate for physics execution. The allowed values are 60, 120, 180, 240.
The higher the framerate, the more accurate the physics will be, but it will consume more processor resources.
Default value is 180.

#### Defined in

[src/core/GameConfig.ts:23](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameConfig.ts#L23)

___

### spriteDefaultScale

• `Optional` **spriteDefaultScale**: [`Vector2`](../classes/Vector2.md)

Define a general scaling for all sprites. It can be overwritten individually on each sprite

#### Defined in

[src/core/GameConfig.ts:25](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/88e4d4a/src/core/GameConfig.ts#L25)
