#define GLSLIFY 1

precision mediump float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(void) {
    gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
}
