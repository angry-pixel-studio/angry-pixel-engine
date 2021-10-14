export const imageFragmentShader = `#version 300 es
precision mediump float;

out vec4 fragColor;

in vec2 texCoords;

uniform sampler2D u_texImage;
uniform int u_renderTexture;
uniform int u_colorType;
uniform vec4 u_tintColor;
uniform vec4 u_maskColor;
uniform float u_maskColorMix;
uniform float u_alpha;

void main()
{
    if (u_renderTexture == 1) {
        vec4 texColor = texture(u_texImage, texCoords);

        if(texColor.a < 0.0001) {
            discard;
        }
        
        if (u_colorType == 2) {
            fragColor = mix(vec4(texColor.rgb, u_alpha), u_maskColor, clamp(u_maskColorMix, 0.0, 1.0));
        } else if (u_colorType == 3) {
            fragColor = u_tintColor * vec4(texColor.rgb, u_alpha);
        } else {
            fragColor = texColor;
        }
    } else {
        fragColor = u_maskColor;
    }
}`;
