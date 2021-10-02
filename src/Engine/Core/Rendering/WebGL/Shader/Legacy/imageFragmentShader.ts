export const imageFragmentShader = `precision mediump float;

varying vec2 texCoords;

uniform int u_renderTexture;
uniform sampler2D u_texImage;
uniform float u_alpha;
uniform vec4 u_color;
uniform float u_colorMix;

void main()
{
    if (u_renderTexture == 1) {
        vec4 texColor = texture2D(u_texImage, texCoords);

        if(texColor.a < 0.0001)
            discard;

        gl_FragColor = mix(vec4(texColor.rgb, u_alpha), vec4(u_color.rgb, u_alpha), clamp(u_colorMix, 0.0, 1.0));
        
    } else {
        gl_FragColor = u_color;
    }
    
}`;
