export const fragmentShader = `#version 300 es
precision highp float;

in vec2 texCoords;

// texture, mask and shadow
uniform int u_renderTexture;
uniform sampler2D u_texImage;
uniform vec4 u_solidColor;
uniform int u_useTintColor;
uniform vec4 u_tintColor;
uniform int u_useMaskColor;
uniform vec4 u_maskColor;
uniform float u_maskColorMix;
uniform float u_alpha;

// light
struct Light {
    vec2 position;
    float radius;
    float smoothMode;
    float intensity;
};

uniform int u_renderLight;
uniform Light u_lights[64];
uniform int u_numLights;

out vec4 fragColor;

void main()
{
    if (u_renderTexture == 1) {
        vec4 texColor = texture(u_texImage, texCoords);

        if (texColor.a < 0.0001) {
            discard;
        }

        if (u_useTintColor == 1) {
            texColor = u_tintColor * texColor;
        }

        if (u_useMaskColor == 1) {
            texColor = mix(texColor, u_maskColor, clamp(u_maskColorMix, 0.0, 1.0));
        }

        fragColor = vec4(texColor.rgb, u_alpha * texColor.a);        
    } else if (u_renderLight == 1) {
        vec2 fragCoord = gl_FragCoord.xy;
        float alpha = u_alpha;

        for (int i = 0; i < u_numLights; i++) {
            Light light = u_lights[i];
            float dist = distance(fragCoord, light.position);
        
            if (dist < light.radius) {
                alpha -= (light.smoothMode > 0.0 ? smoothstep(light.radius, 0.0, dist) : 1.0) * light.intensity;
            }
        }

        alpha = clamp(alpha, 0.0, u_alpha);

        fragColor = vec4(u_solidColor.rgb, alpha);
    } else {
        fragColor = vec4(u_solidColor.rgb, u_alpha);
    }
}`;
