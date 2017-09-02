precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

void main(void) {
    float centerDistance = distance(vec2(0.1, 0.1), vTextureCoord);
    gl_FragColor = vec4(step(0.01, centerDistance), step(0.01, centerDistance), step(0.01, centerDistance), 1.0);
    // gl_FragColor = texture2D(uSampler, vTextureCoord);
    //gl_FragColor = vec4(vTextureCoord.x * 10.0, 0.0, 0.0, 1.0);
}
