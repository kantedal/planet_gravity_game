precision highp float;

#define GLSLIFY 1
#pragma glslify: noise = require("glsl-noise/simplex/3d")
#pragma glslify: noise2d = require("glsl-noise/simplex/2d")

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec2 cameraPosition;
uniform vec2 screenSize;
uniform float scale;
uniform vec2 offset;
uniform float time;

void main(void) {
  vec2 cameraPositionTexCoord = vec2(cameraPosition.x, -cameraPosition.y) / screenSize;

  float noise1 = noise(vec3(scale * 5.0 * (vTextureCoord + cameraPositionTexCoord + offset + vec2(0.0)), -10.0 * time));
  float noise2 = noise(vec3(scale * 10.0 * (vTextureCoord + cameraPositionTexCoord + offset + vec2(0.0)), 0.5));
  float noise3 = noise(vec3(scale * 1.0 * (vTextureCoord + cameraPositionTexCoord + offset + vec2(0.0)), 1.4));
  float noise4 = noise(vec3(scale * 0.5 * (vTextureCoord + cameraPositionTexCoord + offset + vec2(0.0)), 10.4));
  vec3 cloud = (noise1 + noise2 + noise3 + noise4) * vec3(1.0, 1.0, 1.0) * 0.0075;
  gl_FragColor = vec4(cloud, 0.0);

  gl_FragColor += mix(-0.5/255.0, 0.5/255.0, noise2d(vTextureCoord * 400.0));
}
