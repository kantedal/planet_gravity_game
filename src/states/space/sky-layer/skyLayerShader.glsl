precision highp float;

#define GLSLIFY 1
#pragma glslify: noise = require("glsl-noise/simplex/2d")

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec3 sunPosition;
uniform vec2 cameraPosition;
uniform vec2 screenSize;
uniform float starsScale;

void main(void) {
  vec2 uv = vTextureCoord / vec2(screenSize.x / screenSize.x, -screenSize.x / screenSize.y);
  vec2 cameraPositionTexCoord = vec2(cameraPosition.x, -cameraPosition.y) / screenSize;
  vec3 stars = pow(noise((vTextureCoord + cameraPositionTexCoord) * starsScale), 50.0) * vec3(1.1, 1.1, 1.0);

  gl_FragColor = vec4(stars, 0.0);
}
