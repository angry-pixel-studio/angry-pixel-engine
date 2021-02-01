export const imageVertexShader = `precision mediump float;

attribute vec2 positionCoords;
attribute vec2 textureCoords;

varying vec2 texCoords;

uniform mat4 projectionMatrix;
uniform mat4 modelMatrix;
uniform mat4 textureMatrix;

void main()
{
    gl_Position = projectionMatrix * modelMatrix * vec4(positionCoords, 0, 1);
    texCoords = (textureMatrix * vec4(textureCoords, 0, 1)).xy;
}`;
