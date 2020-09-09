import Vector2 from "../../Helper/Vector2";

/**
 * @property {boolean} ui
 * @property {string} layer
 * @property {Image} image
 * @property {number} width
 * @property {number} height
 * @property {Rectangle} ui
 * @property {Vctor2} position
 * @property {boolean} flipHorizontal
 * @property {boolean} flipVertical
 */
export default class RenderData {
    // general
    ui = false;
    layer = null;
    position = new Vector2(0, 0);

    // for images
    image = null;
    width = 0;
    height = 0;
    slice = null;
    flipHorizontal = false;
    flipVertical = false;

    // for text
    text = null;
    font = null;
    textSize = null;
    color = null;
    lineSeparation = null;
    bold = null;
    italic = null;
}