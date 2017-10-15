precision highp float;

#define GLSLIFY 1
#pragma glslify: noise = require("glsl-noise/simplex/2d")

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec3 sunPosition;
uniform vec2 cameraPosition;
uniform vec2 screenSize;

void main(void) {
  vec2 center = vec2(sunPosition.x / screenSize.x, sunPosition.y / screenSize.y);
  vec2 cameraPositionTexCoord = vec2(cameraPosition.x, -cameraPosition.y) / screenSize;
  float distanceToCenter = pow(distance(center, vTextureCoord), 2.0);

  vec3 stars = pow(noise((vTextureCoord + cameraPositionTexCoord) * 100.0), 40.0) * vec3(1.1, 1.1, 1.0);

  vec3 color = 0.06 * vec3(1.0 - distanceToCenter) + 0.05 + stars;
  gl_FragColor = vec4(color, 1.0);

  gl_FragColor += mix(-0.5/255.0, 0.5/255.0, noise(vTextureCoord * 400.0));
}
