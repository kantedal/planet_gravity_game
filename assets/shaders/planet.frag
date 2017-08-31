precision mediump float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(void) {
    float centerDistance = distance(vec2(0.0, 0.1), vTextureCoord);
    gl_FragColor = vec4(0.0, step(0.01, centerDistance), 0.0, 1.0);
    //gl_FragColor = vec4(0.0, 0.0, 1.0, step(0.6, centerDistance));
}
