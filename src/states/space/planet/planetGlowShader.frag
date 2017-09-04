precision highp float;

#define GLSLIFY 1

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec2 resolution;
uniform vec3 planetPosition;
uniform float planetSize;
uniform vec3 sunPosition;


void main(void) {
  vec2 uv = vTextureCoord / vec2(planetSize / 800.0, planetSize / 600.0);
  float centerDistance = distance(uv, vec2(0.5, 0.5));
  float glowSize = 0.1;


  vec3 sunVector = normalize(sunPosition - planetPosition);
  float sunDistance = distance(sunPosition, planetPosition);
  float sunDistanceFactor =  clamp(1.0 - sunDistance / 800.0, 0.2, 2.0);

  vec3 normal = -normalize(vec3(vec2(0.5) - uv, -(1.0 - 2.0 * centerDistance)) * 0.75);

  vec4 transparent = vec4(0, 0, 0, 0);
  vec4 glowColor = vec4(0.1, 0.1, 0.1, 0.5) * 2.0 * clamp(dot(normal, sunVector), 0.2, 1.0) * sunDistanceFactor;

  // Draw planet
  if (centerDistance < 0.5 - glowSize) {
    gl_FragColor = transparent;
    return;
  }
  // Interpolate planet border
  else if (centerDistance < 0.5) {
    float interpolateFactor = (0.5 - centerDistance) / glowSize;
    gl_FragColor = glowColor * interpolateFactor + transparent * (1.0 - interpolateFactor);
    return;
  }
//  // Draw glow
//  else if (centerDistance < 0.5) {
//    vec4 glowColor = vec4(0.1, 0.1, 0.1, 0.0);
//    float interpolateFactor = (0.5 - centerDistance) / glowSize;
//    gl_FragColor = glowColor * interpolateFactor + transparent * (1.0 - interpolateFactor);
//
//    if (centerDistance < 0.5 - glowSize + borderSize && centerDistance > 0.5 - glowSize) {
//       float interpolateFactor2 = (0.5 - centerDistance - glowSize + borderSize) / borderSize;
//       gl_FragColor = glowColor * (1.0 - interpolateFactor) + transparent * interpolateFactor;
//    }
//
//    return;
//  }
}
