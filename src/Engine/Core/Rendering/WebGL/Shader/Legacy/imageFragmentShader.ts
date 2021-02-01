export const imageFragmentShader = `precision mediump float;

varying vec2 texCoords;

uniform sampler2D texImage;
uniform float alpha;

void main()
{
    vec4 texColor = texture2D(texImage, texCoords);
    if(texColor.a < 0.0001)
        discard;
    gl_FragColor = vec4(texColor.rgb, alpha);
}`;
