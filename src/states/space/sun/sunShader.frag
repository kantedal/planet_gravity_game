precision highp float;

#define GLSLIFY 1

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec2 resolution;
uniform float sunSize;
uniform vec3 sunPosition;


void main(void) {
  vec2 uv = vTextureCoord / vec2(sunSize / 800.0, sunSize / 600.0);
  float centerDistance = distance(uv, vec2(0.5, 0.5));
  float borderSize = 0.2;

  vec4 transparent = vec4(0, 0, 0, 0);
  vec4 sunColor = vec4(1.0, 1.0, 0.96, 0.9);

  if (centerDistance < 0.5 - borderSize) {
    gl_FragColor = sunColor;
    return;
  }
  else if (centerDistance < 0.5) {
    float interpolateFactor = (0.5 - centerDistance) / borderSize;
    gl_FragColor = sunColor * interpolateFactor + transparent * (1.0 - interpolateFactor);
    return;
  }
  else {
    gl_FragColor = transparent;
  }
}
