export const fragmentShader = (maxLights: number): string => `#version 300 es
precision highp float;

in vec2 texCoords;

// texture, mask and darkness
uniform int u_renderTexture;
uniform sampler2D u_texImage;
uniform vec4 u_solidColor;
uniform int u_useTintColor;
uniform vec4 u_tintColor;
uniform int u_useMaskColor;
uniform vec4 u_maskColor;
uniform float u_maskColorMix;
uniform float u_alpha;

// light, packed in vec4 so each light takes exactly two uniform vectors
uniform int u_renderLight;
// xy: position, z: radius, w: steps (0 means a continuous fade, 1 means a hard edge)
uniform vec4 u_lightGeometry[${maxLights}];
// rgb: glow color, a: intensity
uniform vec4 u_lightColor[${maxLights}];
uniform int u_numLights;
// screen pixels per light pixel
uniform float u_lightPixelSize;
// screen position of the world origin
uniform vec2 u_lightGridOrigin;

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
        vec3 glow = vec3(0.0);

        // every fragment in a light pixel uses the center of that pixel
        fragCoord = (floor((fragCoord - u_lightGridOrigin) / u_lightPixelSize) + 0.5) * u_lightPixelSize + u_lightGridOrigin;

        for (int i = 0; i < u_numLights; i++) {
            vec4 geometry = u_lightGeometry[i];
            vec4 color = u_lightColor[i];
            float dist = distance(fragCoord, geometry.xy);

            if (dist < geometry.z) {
                float falloff = 1.0 - smoothstep(0.0, geometry.z, dist);
                // the outer ring is kept even if the falloff rounds to 0 near the edge
                if (geometry.w > 0.0) falloff = max(ceil(falloff * geometry.w), 1.0) / geometry.w;

                alpha -= falloff * color.a;
                glow += color.rgb * falloff * color.a;
            }
        }

        alpha = clamp(alpha, 0.0, u_alpha);

        // premultiplied alpha output, see the blend function in the DarknessRenderer
        fragColor = vec4(u_solidColor.rgb * alpha + glow, alpha);
    } else {
        fragColor = vec4(u_solidColor.rgb, u_alpha);
    }
}`;
