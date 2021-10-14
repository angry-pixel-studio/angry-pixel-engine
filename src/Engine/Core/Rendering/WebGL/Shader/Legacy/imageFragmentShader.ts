export const imageFragmentShader = `precision mediump float;

varying vec2 texCoords;

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
        vec4 texColor = texture2D(u_texImage, texCoords);

        if (texColor.a < 0.0001) {
            discard;
        }

        if (u_colorType == 2) {
            gl_FragColor = mix(vec4(texColor.rgb, u_alpha), u_maskColor, clamp(u_maskColorMix, 0.0, 1.0));
        } else if (u_colorType == 3) {
            gl_FragColor = u_tintColor * vec4(texColor.rgb, u_alpha);
        } else {
            gl_FragColor = vec4(texColor.rgb, u_alpha);;
        }
        
    } else {
        gl_FragColor = u_maskColor;
    }
    
}`;
