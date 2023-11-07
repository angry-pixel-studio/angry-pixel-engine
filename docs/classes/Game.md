[angry-pixel](../README.md) / [Exports](../modules.md) / Game

# Class: Game

Game is the main class that contains all the managers, scenes, objects and components. It allows to start and stop the execution of the game.

**`Example`**

```js
const game = new Game({
  containerNode: document.getElementById("app"),
  gameWidth: 1920,
  gameHeight: 1080,
});
game.addScene(GameScene, "GameScene");
game.run();
```

**`Example`**

```js
const game = new Game({
  containerNode: document.getElementById("app"),
  gameWidth: 1920,
  gameHeight: 1080,
  debugEnabled: false,
  canvasColor: "#000000",
  physicsFramerate: 180,
  headless: false,
  spriteDefaultScale: new Vector2(1, 1),
  collisions: {
    collisionMatrix: [
      ["layer1", "layer2"],
      ["layer1", "layer3"],
    ],
    collisionMethod: CollisionMethods.SAT,
    collisionBroadPhaseMethod: BroadPhaseMethods.SpartialGrid,
    collisionArea: new Rectangle(-960, -540, 1920, 1080),
  }
});
game.addScene(GameScene, "GameScene");
game.run();
```

## Table of contents

### Accessors

- [config](Game.md#config)
- [running](Game.md#running)

### Methods

- [addScene](Game.md#addscene)
- [pause](Game.md#pause)
- [resume](Game.md#resume)
- [run](Game.md#run)
- [stop](Game.md#stop)

## Accessors

### config

• `get` **config**(): [`GameConfig`](../interfaces/GameConfig.md)

The game configuration

#### Returns

[`GameConfig`](../interfaces/GameConfig.md)

#### Defined in

[src/core/Game.ts:103](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/2e7a4eb/src/core/Game.ts#L103)

___

### running

• `get` **running**(): `boolean`

TRUE if the game is running

#### Returns

`boolean`

#### Defined in

[src/core/Game.ts:110](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/2e7a4eb/src/core/Game.ts#L110)

## Methods

### addScene

▸ **addScene**(`sceneClass`, `name`, `options?`, `openingScene?`): `void`

Add a scene to the game

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `sceneClass` | [`SceneClass`](../modules.md#sceneclass) | `undefined` | the class of the scene |
| `name` | `string` | `undefined` | The name of the scene |
| `options?` | [`InitOptions`](../interfaces/InitOptions.md) | `undefined` | [optional] This options will be passed to the init method |
| `openingScene` | `boolean` | `false` | [default FALSE] If this is the opening scene, set TRUE, FALSE instead |

#### Returns

`void`

#### Defined in

[src/core/Game.ts:122](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/2e7a4eb/src/core/Game.ts#L122)

___

### pause

▸ **pause**(): `void`

Pauses the game

#### Returns

`void`

#### Defined in

[src/core/Game.ts:143](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/2e7a4eb/src/core/Game.ts#L143)

___

### resume

▸ **resume**(): `void`

Resumes the paused game

#### Returns

`void`

#### Defined in

[src/core/Game.ts:150](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/2e7a4eb/src/core/Game.ts#L150)

___

### run

▸ **run**(): `void`

Run the game

#### Returns

`void`

#### Defined in

[src/core/Game.ts:129](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/2e7a4eb/src/core/Game.ts#L129)

___

### stop

▸ **stop**(): `void`

Stop the game

#### Returns

`void`

#### Defined in

[src/core/Game.ts:136](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/2e7a4eb/src/core/Game.ts#L136)
