[angry-pixel](../README.md) / [Exports](../modules.md) / VideoRendererOptions

# Interface: VideoRendererOptions

VideoRenderer configuration options.

## Table of contents

### Properties

- [flipHorizontal](VideoRendererOptions.md#fliphorizontal)
- [flipVertical](VideoRendererOptions.md#flipvertical)
- [height](VideoRendererOptions.md#height)
- [layer](VideoRendererOptions.md#layer)
- [loop](VideoRendererOptions.md#loop)
- [maskColor](VideoRendererOptions.md#maskcolor)
- [maskColorMix](VideoRendererOptions.md#maskcolormix)
- [offset](VideoRendererOptions.md#offset)
- [opacity](VideoRendererOptions.md#opacity)
- [rotation](VideoRendererOptions.md#rotation)
- [slice](VideoRendererOptions.md#slice)
- [tintColor](VideoRendererOptions.md#tintcolor)
- [video](VideoRendererOptions.md#video)
- [volume](VideoRendererOptions.md#volume)
- [width](VideoRendererOptions.md#width)

## Properties

### flipHorizontal

• `Optional` **flipHorizontal**: `boolean`

Flip the video horizontally

#### Defined in

[src/component/rendering/VideoRenderer.ts:34](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/component/rendering/VideoRenderer.ts#L34)

___

### flipVertical

• `Optional` **flipVertical**: `boolean`

Flip the video vertically

#### Defined in

[src/component/rendering/VideoRenderer.ts:36](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/component/rendering/VideoRenderer.ts#L36)

___

### height

• `Optional` **height**: `number`

Overwrite the original video height

#### Defined in

[src/component/rendering/VideoRenderer.ts:28](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/component/rendering/VideoRenderer.ts#L28)

___

### layer

• `Optional` **layer**: `string`

The render layer

#### Defined in

[src/component/rendering/VideoRenderer.ts:46](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/component/rendering/VideoRenderer.ts#L46)

___

### loop

• `Optional` **loop**: `boolean`

TRUE if the video will play in loop

#### Defined in

[src/component/rendering/VideoRenderer.ts:52](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/component/rendering/VideoRenderer.ts#L52)

___

### maskColor

• `Optional` **maskColor**: `string`

Define a mask color for the video

#### Defined in

[src/component/rendering/VideoRenderer.ts:40](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/component/rendering/VideoRenderer.ts#L40)

___

### maskColorMix

• `Optional` **maskColorMix**: `number`

Define the opacity of the mask color between 1 and 0

#### Defined in

[src/component/rendering/VideoRenderer.ts:42](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/component/rendering/VideoRenderer.ts#L42)

___

### offset

• `Optional` **offset**: [`Vector2`](../classes/Vector2.md)

X-axis and Y-axis offset

#### Defined in

[src/component/rendering/VideoRenderer.ts:30](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/component/rendering/VideoRenderer.ts#L30)

___

### opacity

• `Optional` **opacity**: `number`

Change the opacity between 1 and 0

#### Defined in

[src/component/rendering/VideoRenderer.ts:38](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/component/rendering/VideoRenderer.ts#L38)

___

### rotation

• `Optional` **rotation**: [`Rotation`](../classes/Rotation.md)

Video rotation (degrees or radians)

#### Defined in

[src/component/rendering/VideoRenderer.ts:32](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/component/rendering/VideoRenderer.ts#L32)

___

### slice

• `Optional` **slice**: [`Slice`](Slice.md)

Cut the video based on straight coordinates starting from the top left downward

#### Defined in

[src/component/rendering/VideoRenderer.ts:48](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/component/rendering/VideoRenderer.ts#L48)

___

### tintColor

• `Optional` **tintColor**: `string`

Define a color for tinting the video

#### Defined in

[src/component/rendering/VideoRenderer.ts:44](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/component/rendering/VideoRenderer.ts#L44)

___

### video

• **video**: `HTMLVideoElement`

The video element to render

#### Defined in

[src/component/rendering/VideoRenderer.ts:24](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/component/rendering/VideoRenderer.ts#L24)

___

### volume

• `Optional` **volume**: `number`

The volume of the video. Values between 1 and 0

#### Defined in

[src/component/rendering/VideoRenderer.ts:50](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/component/rendering/VideoRenderer.ts#L50)

___

### width

• `Optional` **width**: `number`

Overwrite the original video width

#### Defined in

[src/component/rendering/VideoRenderer.ts:26](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/8704b49/src/component/rendering/VideoRenderer.ts#L26)
