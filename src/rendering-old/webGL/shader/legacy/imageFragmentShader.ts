export const imageFragmentShader = `precision mediump float;

varying vec2 texCoords;

uniform int u_renderTexture;
uniform sampler2D u_texImage;
uniform vec4 u_solidColor;

uniform int u_useTintColor;
uniform vec4 u_tintColor;

uniform int u_useMaskColor;
uniform vec4 u_maskColor;
uniform float u_maskColorMix;

uniform float u_alpha;

void main()
{
    if (u_renderTexture == 1) {
        vec4 texColor = texture2D(u_texImage, texCoords);

        if (texColor.a < 0.0001) {
            discard;
        }

        if (u_useTintColor == 1) {
            texColor = u_tintColor * texColor;
        }

        if (u_useMaskColor == 1) {
            texColor = mix(texColor, u_maskColor, clamp(u_maskColorMix, 0.0, 1.0));
        }

        gl_FragColor = vec4(texColor.rgb, u_alpha * texColor.a);
    } else {
        gl_FragColor =  vec4(u_solidColor.rgb, u_alpha);
    }
}`;
