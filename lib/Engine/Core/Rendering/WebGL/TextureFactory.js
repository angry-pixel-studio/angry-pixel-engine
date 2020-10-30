"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextureFactory = void 0;
var TextureFactory = /** @class */ (function () {
    function TextureFactory() {
    }
    TextureFactory.prototype.createFromImage = function (gl, image, smooth) {
        var _this = this;
        if (smooth === void 0) { smooth = true; }
        var texture = gl.createTexture();
        if (image.naturalWidth) {
            this.create(gl, image, texture, smooth);
        }
        else {
            image.addEventListener("load", function () { return _this.create(gl, image, texture, smooth); });
        }
        return texture;
    };
    TextureFactory.prototype.create = function (gl, image, texture, smooth) {
        if (smooth === void 0) { smooth = true; }
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        // NEAREST = crisp pixels, LINEAR = smooth pixels
        if (smooth === false) {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        }
        else {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        }
    };
    return TextureFactory;
}());
exports.TextureFactory = TextureFactory;
//# sourceMappingURL=TextureFactory.js.map