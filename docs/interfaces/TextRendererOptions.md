[angry-pixel](../README.md) / [Exports](../modules.md) / TextRendererOptions

# Interface: TextRendererOptions

TextRenderer configuration options.

## Table of contents

### Properties

- [bitmapMargin](TextRendererOptions.md#bitmapmargin)
- [bitmapSpacing](TextRendererOptions.md#bitmapspacing)
- [charRanges](TextRendererOptions.md#charranges)
- [color](TextRendererOptions.md#color)
- [font](TextRendererOptions.md#font)
- [fontSize](TextRendererOptions.md#fontsize)
- [height](TextRendererOptions.md#height)
- [letterSpacing](TextRendererOptions.md#letterspacing)
- [lineSeparation](TextRendererOptions.md#lineseparation)
- [offset](TextRendererOptions.md#offset)
- [opacity](TextRendererOptions.md#opacity)
- [orientation](TextRendererOptions.md#orientation)
- [rotation](TextRendererOptions.md#rotation)
- [smooth](TextRendererOptions.md#smooth)
- [text](TextRendererOptions.md#text)
- [width](TextRendererOptions.md#width)

## Properties

### bitmapMargin

• `Optional` **bitmapMargin**: [`Vector2`](../classes/Vector2.md)

Margin in pixels to correct badly sliced characters.

#### Defined in

[src/component/rendering/TextRenderer.ts:44](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/2e7a4eb/src/component/rendering/TextRenderer.ts#L44)

___

### bitmapSpacing

• `Optional` **bitmapSpacing**: [`Vector2`](../classes/Vector2.md)

Spacing in pixels to correct badly sliced characters.

#### Defined in

[src/component/rendering/TextRenderer.ts:46](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/2e7a4eb/src/component/rendering/TextRenderer.ts#L46)

___

### charRanges

• `Optional` **charRanges**: `number`[]

Range of characters covered by the component defined in number pairs.
The default value is [32, 126, 161, 255], this means that characters
from 32 to 126 and from 161 to 255 will be valid.

#### Defined in

[src/component/rendering/TextRenderer.ts:34](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/2e7a4eb/src/component/rendering/TextRenderer.ts#L34)

___

### color

• **color**: `string`

The text color

#### Defined in

[src/component/rendering/TextRenderer.ts:20](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/2e7a4eb/src/component/rendering/TextRenderer.ts#L20)

___

### font

• **font**: `string` \| `FontFace`

The font family to use

#### Defined in

[src/component/rendering/TextRenderer.ts:16](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/2e7a4eb/src/component/rendering/TextRenderer.ts#L16)

___

### fontSize

• **fontSize**: `number`

The size of the font in pixels

#### Defined in

[src/component/rendering/TextRenderer.ts:18](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/2e7a4eb/src/component/rendering/TextRenderer.ts#L18)

___

### height

• **height**: `number`

The height of the invisible box where the text is rendered

#### Defined in

[src/component/rendering/TextRenderer.ts:24](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/2e7a4eb/src/component/rendering/TextRenderer.ts#L24)

___

### letterSpacing

• `Optional` **letterSpacing**: `number`

The space between chars in pixels

#### Defined in

[src/component/rendering/TextRenderer.ts:28](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/2e7a4eb/src/component/rendering/TextRenderer.ts#L28)

___

### lineSeparation

• `Optional` **lineSeparation**: `number`

The separation between lines in pixels

#### Defined in

[src/component/rendering/TextRenderer.ts:26](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/2e7a4eb/src/component/rendering/TextRenderer.ts#L26)

___

### offset

• `Optional` **offset**: [`Vector2`](../classes/Vector2.md)

X-axis and Y-axis offset

#### Defined in

[src/component/rendering/TextRenderer.ts:30](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/2e7a4eb/src/component/rendering/TextRenderer.ts#L30)

___

### opacity

• `Optional` **opacity**: `number`

Change the opacity between 1 and 0

#### Defined in

[src/component/rendering/TextRenderer.ts:40](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/2e7a4eb/src/component/rendering/TextRenderer.ts#L40)

___

### orientation

• `Optional` **orientation**: [`TextOrientation`](../enums/TextOrientation.md)

Direction in which the text will be rendered.

#### Defined in

[src/component/rendering/TextRenderer.ts:42](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/2e7a4eb/src/component/rendering/TextRenderer.ts#L42)

___

### rotation

• `Optional` **rotation**: [`Rotation`](../classes/Rotation.md)

Text rotation (degrees or radians)

#### Defined in

[src/component/rendering/TextRenderer.ts:38](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/2e7a4eb/src/component/rendering/TextRenderer.ts#L38)

___

### smooth

• `Optional` **smooth**: `boolean`

Smoothing pixels (not recommended for pixel art)

#### Defined in

[src/component/rendering/TextRenderer.ts:36](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/2e7a4eb/src/component/rendering/TextRenderer.ts#L36)

___

### text

• **text**: `string`

The text to render

#### Defined in

[src/component/rendering/TextRenderer.ts:14](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/2e7a4eb/src/component/rendering/TextRenderer.ts#L14)

___

### width

• **width**: `number`

The width of the invisible box where the text is rendered

#### Defined in

[src/component/rendering/TextRenderer.ts:22](https://github.com/angry-pixel-studio/angry-pixel-engine/blob/2e7a4eb/src/component/rendering/TextRenderer.ts#L22)
