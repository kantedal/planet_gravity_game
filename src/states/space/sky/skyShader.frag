precision highp float;

#define GLSLIFY 1
#pragma glslify: noise = require("glsl-noise/simplex/2d")

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec3 sunPosition;
uniform vec2 screenSize;

void main(void) {
  vec2 center = vec2(sunPosition.x/ 800.0, sunPosition.y / 600.0);
  float distanceToCenter = pow(distance(center, vTextureCoord), 1.0);

  vec3 stars = pow(noise(vTextureCoord * 100.0), 40.0) * vec3(1.1, 1.1, 1.0);

  vec3 color = 0.025 * vec3(1.0 - distanceToCenter) + 0.05 + stars;
  gl_FragColor = vec4(color, 1.0);

  // gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
