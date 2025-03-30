// Basic Fragment Shader Placeholder for CRT Effect

uniform sampler2D tDiffuse; // Texture from the previous pass (the project content)
uniform float time;        // Time uniform for animations like flicker/scanlines
uniform vec2 resolution;   // Screen resolution for aspect ratio/curvature calculations

varying vec2 vUv;

// Basic scanline function (example)
float scanline(vec2 uv) {
    return sin(uv.y * resolution.y * 1.5 + time * 10.0) * 0.02 + 0.98;
}

// Basic vignette function (example)
float vignette(vec2 uv, float radius, float softness) {
    vec2 centerDist = uv - 0.5;
    float dist = length(centerDist);
    return smoothstep(radius, radius - softness, dist);
}

// Basic curvature function (example)
vec2 curve(vec2 uv, float amount) {
    uv = (uv - 0.5) * 2.0; // Remap to -1 to 1
    uv *= 1.0 + pow(abs(uv.yx), vec2(2.0)) * amount;
    uv = (uv / 2.0) + 0.5; // Remap back to 0 to 1
    return uv;
}


void main() {
    vec2 curvedUv = curve(vUv, 0.05); // Apply slight curvature

    vec4 color = vec4(0.0);

    // Only sample texture if UVs are within bounds after curving
    if (curvedUv.x >= 0.0 && curvedUv.x <= 1.0 && curvedUv.y >= 0.0 && curvedUv.y <= 1.0) {
       color = texture2D(tDiffuse, curvedUv);
    }

    // Apply effects
    float scan = scanline(curvedUv);
    float vig = vignette(curvedUv, 0.7, 0.4);

    // Combine effects (example)
    color.rgb *= scan * vig;

    // Add subtle noise/flicker (example)
    // float noise = (fract(sin(dot(curvedUv + time * 0.01, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.05;
    // color.rgb += noise;


    gl_FragColor = color;
}