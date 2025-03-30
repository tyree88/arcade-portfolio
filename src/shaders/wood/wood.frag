// Fragment Shader Placeholder for Custom Wood Grain

uniform sampler2D woodTexture; // Base wood color/pattern texture
uniform sampler2D normalMap;   // Normal map for grain detail
uniform float time;            // For potential subtle animation/variation
uniform vec3 lightDirection;   // Example light direction

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewPosition;

// Basic noise function (example)
float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    // Sample textures
    vec4 woodColor = texture2D(woodTexture, vUv);
    vec3 normalSample = texture2D(normalMap, vUv).rgb * 2.0 - 1.0; // Unpack normal map

    // TODO: Implement more complex wood grain generation or manipulation
    // Example: Add subtle procedural variation based on UVs or noise
    // float grainVariation = noise(vUv * 20.0) * 0.05;
    // woodColor.rgb += grainVariation;

    // Basic Lambertian lighting (example - replace with PBR calculations)
    vec3 N = normalize(vNormal); // Use interpolated normal for now
    // Or use normal map: N = normalize(TBN * normalSample); // Requires TBN matrix calculation in vertex shader
    vec3 L = normalize(lightDirection);
    float diffuse = max(dot(N, L), 0.0);

    vec3 finalColor = woodColor.rgb * diffuse * vec3(1.0, 0.95, 0.85); // Example warm light tint

    gl_FragColor = vec4(finalColor, 1.0);
}