export default `#version 300 es
precision mediump float;

in vec2 position;
in vec2 textureCoords;

out vec2 texCoords;

uniform mat4 projectionMatrix;
uniform mat4 modelMatrix;
uniform mat4 textureMatrix;

void main()
{
    gl_Position = projectionMatrix * modelMatrix * vec4(position, 0, 1);
    texCoords = (textureMatrix * vec4(textureCoords, 0, 1)).xy;
}`;
