precision mediump float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(void) {
    vec2 center = vec2(0.2, 0.8);
    float distanceToCenter = distance(center, vTextureCoord);

    vec3 color = 0.1 * vec3(1.0 - distanceToCenter) + 0.1;
    gl_FragColor = vec4(color, 1.0);
}
