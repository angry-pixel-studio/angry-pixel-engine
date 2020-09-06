import Vector2 from "../../Helper/Vector2";

/**
 * @property {boolean} ui
 * @property {string} layer
 * @property {Image} image
 * @property {number} width
 * @property {number} height
 * @property {Rectangle} ui
 * @property {string} pivot
 * @property {Vctor2} position
 * @property {number} offsetX
 * @property {flaot} offsetY
 * @property {boolean} flipHorizontal
 * @property {boolean} flipVertical
 */
export default class RenderData {
    // general
    ui = false;
    layer = null;
    position = new Vector2(0, 0);
    pivot = null;

    // for images
    image = null;
    width = 0;
    height = 0;
    slice = null;
    offsetX = 0;
    offsetY = 0;
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