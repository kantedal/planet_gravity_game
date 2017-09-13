precision highp float;

#define GLSLIFY 1
#pragma glslify: grain = require("glsl-film-grain")
#pragma glslify: blend = require("glsl-blend-soft-light")
#pragma glslify: luma = require("glsl-luma")

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec2 screenSize;
uniform float time;
uniform vec2 grainRand;

void main(void) {
  vec3 backgroundColor = texture2D(uSampler, vec2(1.0) - vTextureCoord).xyz * vec3(1.0, 1.0, 1.0);

  float grainSize = 1.5;
  vec3 g = vec3(grain(vTextureCoord + grainRand, vec2(800.0, 600.0) / grainSize));

  vec3 color = blend(backgroundColor, g);

  //get the luminance of the background
  float luminance = luma(backgroundColor);

  //reduce the noise based on some
  //threshold of the background luminance
  float response = smoothstep(0.05, 0.8, luminance);
  //color = mix(color, backgroundColor, );//pow(response, 2.0));
  color = mix(backgroundColor, g, 0.075);

  gl_FragColor = vec4(color, 1.0);
  // gl_FragColor = vec4(vTextureCoord.x, vTextureCoord.y, 0.0, 0.0);

}
