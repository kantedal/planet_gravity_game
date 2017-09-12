precision highp float;

#define GLSLIFY 1

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec2 screenSize;
uniform vec2 shuttlePosition;

void main(void) {
  vec4 trail = texture2D(uSampler, vTextureCoord);
  vec4 texColor = trail * 0.8;

  if (trail.z < 0.025) {
    texColor = vec4(0.0);
  }

  float trailSize = 4.0;
  float distanceToShuttle = distance(shuttlePosition, vTextureCoord * screenSize);

  if (distanceToShuttle < trailSize) {
    float interpolation = (trailSize - distanceToShuttle) / trailSize;
    texColor += vec4(vec3(0.5, 0.5, 0.5) * interpolation, 1.0);
  }

  gl_FragColor = texColor;
  //gl_FragColor = vec4(vTextureCoord, 0.0, 1.0);
}
