precision highp float;

#define GLSLIFY 1
#pragma glslify: noise = require("glsl-noise/simplex/2d")

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec2 resolution;
uniform vec3 planetPosition;
uniform float planetSize;
uniform vec3 sunPosition;
uniform vec3 cameraPosition;
uniform vec2 screenSize;

vec3 phong(vec3 ka, vec3 kd, vec3 ks, float alpha, vec3 normal, vec3 position) {
    vec3 n = normalize( normal );
    vec3 s = normalize( position - sunPosition );
    vec3 v = normalize( position - cameraPosition );
    vec3 r = reflect( s, n );

    vec3 ambient = ka;
    vec3 diffuse = max(0.0, dot(s, normal)) * kd;
    vec3 specular = pow(max(dot(r, v), 0.0), alpha) * ks;

    return ambient + diffuse;
}

void main(void) {
  vec2 cameraPosTexCoord = vec2(cameraPosition.x, -cameraPosition.y) / screenSize;
  vec2 planetPosTexCoord = (vec2(planetPosition.x, planetPosition.y) - vec2(planetSize / 2.0)) / screenSize;

  vec2 uv = (vTextureCoord + cameraPosTexCoord - planetPosTexCoord) / vec2(planetSize / screenSize.x, planetSize / screenSize.y);
  float centerDistance = distance(uv, vec2(0.5, 0.5));
  float borderSize = 0.005;
  float glowSize = 0.1;

  vec4 transparent = vec4(0, 0, 0, 0);
  vec3 planetColor = vec3(0.4, 0.4, 0.4) * (1.0 - 0.2 * abs(noise(uv * 24.0)));

  vec3 normal = normalize(vec3(vec2(0.5) - uv, -(1.0 - 2.0 * centerDistance)) * 0.75);
  vec3 position = planetPosition + vec3(uv.x * planetSize, uv.y * planetSize, planetSize * 0.5 * (1.0 - length(abs(normal.xy))));

  vec3 sunVector = normalize(sunPosition - planetPosition);
  float sunDistance = distance(vec3(sunPosition.xy, 2.0), planetPosition);


  vec3 ka = planetColor * 0.2;
  vec3 kd = planetColor * 1.0;
  vec3 ks = vec3(0.2);

  // planetColor = phong(ka, kd, ks, 5.0, normal, position);

  planetColor = clamp(1.0 - sunDistance / 400.0, 0.5, 1.5) * clamp(dot(sunVector, -normal), 0.3, 1.0) * planetColor;

  // Draw planet
  if (centerDistance < 0.5 - borderSize) {
    gl_FragColor = vec4(planetColor, 1.0);
    return;
  }
  // Interpolate planet border
  else if (centerDistance < 0.5) {
    float interpolateFactor = (0.5 - centerDistance) / borderSize;
    gl_FragColor = vec4(planetColor, 1.0) * interpolateFactor + transparent * (1.0 - interpolateFactor);
    return;
  }
}

//precision mediump float;
//
//varying vec2       vTextureCoord;
//varying vec4       vColor;
//uniform sampler2D  uSampler;
//
//void main(void) {
//    gl_FragColor = texture2D(uSampler, vTextureCoord);
//    gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.2126 * gl_FragColor.r + 0.7152 * gl_FragColor.g + 0.0722 * gl_FragColor.b), 1.0);
//}
