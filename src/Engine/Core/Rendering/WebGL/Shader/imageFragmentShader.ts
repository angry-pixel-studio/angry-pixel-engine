export const imageFragmentShader = `#version 300 es
precision mediump float;

out vec4 fragColor;

in vec2 texCoords;

uniform sampler2D u_texImage;
uniform float u_alpha;
uniform vec4 u_color;
uniform float u_colorMix;

void main()
{
    vec4 texColor = texture(u_texImage, texCoords);
    
    if(texColor.a < 0.0001)
        discard;
    
    fragColor = mix(vec4(texColor.rgb, u_alpha), u_color, clamp(u_colorMix, 0.0, 1.0));
}`;
