precision highp float;

#define GLSLIFY 1
#pragma glslify: noise = require("glsl-noise/simplex/2d")

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec2 resolution;
uniform vec3 planetPosition;
uniform float planetSize;
uniform vec3 sunPosition;


void main(void) {
  vec2 uv = vTextureCoord / vec2(planetSize / 800.0, planetSize / 600.0);
  float centerDistance = distance(uv, vec2(0.5, 0.5));
  float borderSize = 0.005;

  vec4 transparent = vec4(0, 0, 0, 0);
  vec4 planetColor = vec4(0.4, 0.4, 0.4, 1.0) * (1.0 - 0.2 * abs(noise(uv * 24.0)));

  vec3 sunVector = normalize(sunPosition - planetPosition);
  float sunDistance = distance(sunPosition, planetPosition);

  vec3 normal = -normalize(vec3(vec2(0.5) - uv, (1.0 - 2.0 * centerDistance)) * 0.75);
  planetColor = vec4(clamp(1.0 - sunDistance / 400.0, 0.5, 1.5) * clamp(dot(sunVector, normal), 0.2, 1.0) * vec3(planetColor), 1.0);

  if (centerDistance < 0.5 - borderSize) {
    gl_FragColor = planetColor;
    return;
  }
  else if (centerDistance < 0.5) {
    float interpolateFactor = (0.5 - centerDistance) / borderSize;
    gl_FragColor = planetColor * interpolateFactor + transparent * (1.0 - interpolateFactor);
    return;
  }

//  float n = abs(pNoise(uv, 50));
//  gl_FragColor = vec4(vec3(n), 1.0);
}
