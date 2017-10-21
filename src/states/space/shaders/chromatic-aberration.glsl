precision highp float;

#define GLSLIFY 1

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec2 screenSize;
uniform float time;

void main(void) {
  float ChromaticAberration = 3.0 + 0.5 * sin(time * 30.0) * sin(time * 10.0);
  vec2 uv = vTextureCoord;

  vec2 texel = 1.0 / screenSize.xy;

  vec2 coords = (uv - 0.5) * 2.0;
  float coordDot = dot(coords, coords);

  vec2 precompute = ChromaticAberration * coordDot * coords;
  vec2 uvR = uv - texel.xy * precompute;
  vec2 uvB = uv + texel.xy * precompute;

  vec4 color;
  color.r = texture2D(uSampler, uvR).r;
  color.g = texture2D(uSampler, uv).g;
  color.b = texture2D(uSampler, uvB).b;

  gl_FragColor = color;
}
