[angry-pixel](../README.md) / [Exports](../modules.md) / ISceneManager

# Interface: ISceneManager

Manges the loading of the scenes.

## Table of contents

### Methods

- [addScene](ISceneManager.md#addscene)
- [getCurrentScene](ISceneManager.md#getcurrentscene)
- [loadOpeningScene](ISceneManager.md#loadopeningscene)
- [loadScene](ISceneManager.md#loadscene)

## Methods

### addScene

▸ **addScene**(`sceneClass`, `name`, `options?`, `openingScene?`): `void`

Adds a new scene.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sceneClass` | [`SceneClass`](../modules.md#sceneclass) | The scene class . |
| `name` | `string` | The name to identify the scene. |
| `options?` | [`InitOptions`](InitOptions.md) | [optional] Options for the init method. |
| `openingScene?` | `boolean` | [optional] TRUE if it's the first scene to load. |

#### Returns

`void`

#### Defined in

[src/core/managers/SceneManager.ts:28](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/managers/SceneManager.ts#L28)

___

### getCurrentScene

▸ **getCurrentScene**<`T`\>(): `T`

Retrieves the current loaded scene.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Scene`](../classes/Scene.md) |

#### Returns

`T`

The scene instance.

#### Defined in

[src/core/managers/SceneManager.ts:20](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/managers/SceneManager.ts#L20)

___

### loadOpeningScene

▸ **loadOpeningScene**(): `void`

Loads the scene flagged as the opening scene.

#### Returns

`void`

#### Defined in

[src/core/managers/SceneManager.ts:30](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/managers/SceneManager.ts#L30)

___

### loadScene

▸ **loadScene**(`name`): `void`

Loads a Scene by the given name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the Scene. |

#### Returns

`void`

#### Defined in

[src/core/managers/SceneManager.ts:35](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/93d7d6a/src/core/managers/SceneManager.ts#L35)
