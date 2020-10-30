"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vertexShader = void 0;
exports.vertexShader = "#version 300 es\nprecision mediump float;\n\nin vec2 positionCoords;\nin vec2 textureCoords;\n\nout vec2 texCoords;\n\nuniform mat4 projectionMatrix;\nuniform mat4 modelMatrix;\nuniform mat4 textureMatrix;\n\nvoid main()\n{\n    gl_Position = projectionMatrix * modelMatrix * vec4(positionCoords, 0, 1);\n    texCoords = (textureMatrix * vec4(textureCoords, 0, 1)).xy;\n}";
//# sourceMappingURL=vertexShader.js.map