// Vertex Shader Placeholder for Custom Wood Grain

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewPosition;
// varying mat3 vTBN; // Uncomment if calculating TBN for normal mapping

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal); // Transform normal to view space

  vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * worldPosition;
  vViewPosition = -viewPosition.xyz; // Vector from vertex to camera

  // TODO: Calculate Tangent and Bitangent if using normal maps in fragment shader
  // vec3 tangent = normalize(normalMatrix * tangent.xyz);
  // vec3 bitangent = cross(vNormal, tangent) * tangent.w; // tangent.w indicates handedness
  // vTBN = mat3(tangent, bitangent, vNormal);

  gl_Position = projectionMatrix * viewPosition;
}