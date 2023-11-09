[angry-pixel](README.md) / Exports

# angry-pixel

## Table of contents

### Enumerations

- [BroadPhaseMethods](enums/BroadPhaseMethods.md)
- [ButtonType](enums/ButtonType.md)
- [CollisionMethods](enums/CollisionMethods.md)
- [RigidBodyType](enums/RigidBodyType.md)
- [TextOrientation](enums/TextOrientation.md)
- [TilemapOrientation](enums/TilemapOrientation.md)

### Classes

- [Animator](classes/Animator.md)
- [AudioPlayer](classes/AudioPlayer.md)
- [BallCollider](classes/BallCollider.md)
- [BoxCollider](classes/BoxCollider.md)
- [Button](classes/Button.md)
- [Camera](classes/Camera.md)
- [Component](classes/Component.md)
- [EdgeCollider](classes/EdgeCollider.md)
- [Game](classes/Game.md)
- [GameCamera](classes/GameCamera.md)
- [GameObject](classes/GameObject.md)
- [GamepadController](classes/GamepadController.md)
- [GamepadData](classes/GamepadData.md)
- [KeyboardController](classes/KeyboardController.md)
- [MaskRenderer](classes/MaskRenderer.md)
- [MouseController](classes/MouseController.md)
- [PhysicsComponent](classes/PhysicsComponent.md)
- [PolygonCollider](classes/PolygonCollider.md)
- [PreRenderComponent](classes/PreRenderComponent.md)
- [Rectangle](classes/Rectangle.md)
- [RigidBody](classes/RigidBody.md)
- [Rotation](classes/Rotation.md)
- [Scene](classes/Scene.md)
- [SpacePointer](classes/SpacePointer.md)
- [Sprite](classes/Sprite.md)
- [SpriteRenderer](classes/SpriteRenderer.md)
- [TextRenderer](classes/TextRenderer.md)
- [TiledTilemapRenderer](classes/TiledTilemapRenderer.md)
- [TilemapCollider](classes/TilemapCollider.md)
- [TilemapRenderer](classes/TilemapRenderer.md)
- [TouchController](classes/TouchController.md)
- [Transform](classes/Transform.md)
- [Vector2](classes/Vector2.md)
- [VideoRenderer](classes/VideoRenderer.md)

### Interfaces

- [AnimationConfig](interfaces/AnimationConfig.md)
- [AnimatorOptions](interfaces/AnimatorOptions.md)
- [AudioPlayerOptions](interfaces/AudioPlayerOptions.md)
- [BallColliderOptions](interfaces/BallColliderOptions.md)
- [BoxColliderOptions](interfaces/BoxColliderOptions.md)
- [ButtonOptions](interfaces/ButtonOptions.md)
- [ColliderComponent](interfaces/ColliderComponent.md)
- [CollisionData](interfaces/CollisionData.md)
- [EdgeColliderOptions](interfaces/EdgeColliderOptions.md)
- [GameConfig](interfaces/GameConfig.md)
- [IAssetManager](interfaces/IAssetManager.md)
- [ICollider](interfaces/ICollider.md)
- [ICollision](interfaces/ICollision.md)
- [ICollisionResolution](interfaces/ICollisionResolution.md)
- [IDomManager](interfaces/IDomManager.md)
- [IGameObjectManager](interfaces/IGameObjectManager.md)
- [IInputManager](interfaces/IInputManager.md)
- [IPhysicsManager](interfaces/IPhysicsManager.md)
- [IRenderManager](interfaces/IRenderManager.md)
- [ISceneManager](interfaces/ISceneManager.md)
- [ITimeManager](interfaces/ITimeManager.md)
- [InitOptions](interfaces/InitOptions.md)
- [MaskRendererOptions](interfaces/MaskRendererOptions.md)
- [PolygonColliderOptions](interfaces/PolygonColliderOptions.md)
- [RigidBodyOptions](interfaces/RigidBodyOptions.md)
- [Slice](interfaces/Slice.md)
- [SpriteConfig](interfaces/SpriteConfig.md)
- [SpriteRendererOptions](interfaces/SpriteRendererOptions.md)
- [TextRendererOptions](interfaces/TextRendererOptions.md)
- [TiledChunk](interfaces/TiledChunk.md)
- [TiledLayer](interfaces/TiledLayer.md)
- [TiledTilemap](interfaces/TiledTilemap.md)
- [TiledTilemapRendererOptions](interfaces/TiledTilemapRendererOptions.md)
- [TilemapColliderOptions](interfaces/TilemapColliderOptions.md)
- [TilemapRendererOptions](interfaces/TilemapRendererOptions.md)
- [Tileset](interfaces/Tileset.md)
- [TouchInteraction](interfaces/TouchInteraction.md)
- [VideoRendererOptions](interfaces/VideoRendererOptions.md)

### Type Aliases

- [CollisionMatrix](modules.md#collisionmatrix)
- [SceneClass](modules.md#sceneclass)

### Variables

- [LAYER\_DEFAULT](modules.md#layer_default)

### Functions

- [between](modules.md#between)
- [clamp](modules.md#clamp)
- [fixedRound](modules.md#fixedround)
- [randomFloat](modules.md#randomfloat)
- [randomInt](modules.md#randomint)
- [range](modules.md#range)

## Type Aliases

### CollisionMatrix

Ƭ **CollisionMatrix**: [`string`, `string`][]

#### Defined in

node_modules/angry-pixel-2d-physics/lib/collision/CollisionManager.d.ts:15

___

### SceneClass

Ƭ **SceneClass**: (`container`: `Container`, `name`: `string`, `game`: [`Game`](classes/Game.md)) => [`Scene`](classes/Scene.md)

#### Type declaration

• (`container`, `name`, `game`): [`Scene`](classes/Scene.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `container` | `Container` |
| `name` | `string` |
| `game` | [`Game`](classes/Game.md) |

##### Returns

[`Scene`](classes/Scene.md)

#### Defined in

[src/core/Scene.ts:6](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/Scene.ts#L6)

## Variables

### LAYER\_DEFAULT

• `Const` **LAYER\_DEFAULT**: ``"Default"``

#### Defined in

[src/core/GameObject.ts:10](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/9576100/src/core/GameObject.ts#L10)

## Functions

### between

▸ **between**(`value`, `min`, `max`): `boolean`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | number to compare |
| `min` | `number` | min value |
| `max` | `number` | max value |

#### Returns

`boolean`

true if the number is between the min and the max, false instead

#### Defined in

node_modules/angry-pixel-math/lib/Utils.d.ts:39

___

### clamp

▸ **clamp**(`value`, `min`, `max`): `number`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | number to clamp |
| `min` | `number` | min value |
| `max` | `number` | max value |

#### Returns

`number`

clamped value

#### Defined in

node_modules/angry-pixel-math/lib/Utils.d.ts:7

___

### fixedRound

▸ **fixedRound**(`value`, `decimals`): `number`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | the value to round |
| `decimals` | `number` | the number of decimals |

#### Returns

`number`

the rounded value

#### Defined in

node_modules/angry-pixel-math/lib/Utils.d.ts:25

___

### randomFloat

▸ **randomFloat**(`min`, `max`, `decimals?`): `number`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `min` | `number` | min value |
| `max` | `number` | max value |
| `decimals?` | `number` | - |

#### Returns

`number`

the random float value

#### Defined in

node_modules/angry-pixel-math/lib/Utils.d.ts:19

___

### randomInt

▸ **randomInt**(`min`, `max`): `number`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `min` | `number` | min value |
| `max` | `number` | max value |

#### Returns

`number`

the random int value

#### Defined in

node_modules/angry-pixel-math/lib/Utils.d.ts:13

___

### range

▸ **range**(`start`, `end`, `steps?`): `number`[]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `start` | `number` | the starting value |
| `end` | `number` | the end value |
| `steps?` | `number` | the steps to move |

#### Returns

`number`[]

number range

#### Defined in

node_modules/angry-pixel-math/lib/Utils.d.ts:32
