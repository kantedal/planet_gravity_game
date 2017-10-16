precision highp float;

#define GLSLIFY 1

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec2 screenSize;
uniform float time;

//void main(void) {
//  vec2 uv = vTextureCoord; // fragCoord.xy / iResolution.xy;
//
//  float amountX = 0.0;
//
//  amountX = (1.0 + sin(time * 6.0)) * 0.5;
//  amountX *= 1.0 + sin(time * 16.0) * 0.5;
//  amountX *= 1.0 + sin(time * 19.0) * 0.5;
//  amountX *= 1.0 + sin(time * 27.0) * 0.5;
//  amountX = pow(amountX, 3.0);
//
//  amountX *= 0.001;
//
//  float amountY = 0.0;
//
//  amountY = (1.0 + sin(time * 4.0)) * 0.5;
//  amountY *= 1.0 + sin(time * 10.0) * 0.5;
//  amountY *= 1.0 + sin(time * 15.0) * 0.5;
//  amountY *= 1.0 + sin(time * 20.0) * 0.5;
//  amountY = pow(amountY, 3.0);
//
//  amountY *= 0.001;
//
//  vec3 col;
//  col.r = texture2D( uSampler, vec2(uv.x + amountX, uv.y - amountY)).r;
//  col.g = texture2D( uSampler, uv ).g;
//  col.b = texture2D( uSampler, vec2(uv.x - amountX, uv.y + amountY)).b;
//
//  col *= (1.0 - amountX * 0.5);
//
//  gl_FragColor = vec4(col, 1.0);
//}

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