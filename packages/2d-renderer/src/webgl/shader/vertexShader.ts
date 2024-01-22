export const vertexShader = `#version 300 es

in vec4 positionCoords;
in vec2 textureCoords;

out vec2 texCoords;

uniform mat4 projectionMatrix;
uniform mat4 modelMatrix;
uniform mat4 textureMatrix;

void main()
{
    gl_Position = projectionMatrix * modelMatrix * positionCoords;
    texCoords = (textureMatrix * vec4(textureCoords, 0, 1)).xy;
}`;
