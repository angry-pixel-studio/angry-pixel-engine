export const fragmentShader = `#version 300 es
precision mediump float;

out vec4 fragColor;

in vec2 texCoords;

uniform sampler2D texImage;
uniform float alpha;

void main()
{
    vec4 texColor = texture(texImage, texCoords);
    if(texColor.a < 0.0001)
        discard;
    fragColor = vec4(texColor.rgb, alpha);
}`;
