#define GLSLIFY 1

precision mediump float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec2 resolution;
uniform vec3 planetPosition;
uniform float planetSize;
uniform vec3 sunPosition;

float rand(vec2 c){
	return fract(sin(dot(c.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

float noise(vec2 p, float freq ){
	float unit = 800.0/freq;
	vec2 ij = floor(p/unit);
	vec2 xy = mod(p,unit)/unit;
	//xy = 3.*xy*xy-2.*xy*xy*xy;
	xy = .5*(1.-cos(3.14*xy));
	float a = rand((ij+vec2(0.,0.)));
	float b = rand((ij+vec2(1.,0.)));
	float c = rand((ij+vec2(0.,1.)));
	float d = rand((ij+vec2(1.,1.)));
	float x1 = mix(a, b, xy.x);
	float x2 = mix(c, d, xy.x);
	return mix(x1, x2, xy.y);
}

float pNoise(vec2 p, int res){
	float persistance = .5;
	float n = 0.;
	float normK = 0.;
	float f = 4.;
	float amp = 1.;
	int iCount = 0;
	for (int i = 0; i<50; i++){
		n+=amp*noise(p, f);
		f*=2.;
		normK+=amp;
		amp*=persistance;
		if (iCount == res) break;
		iCount++;
	}
	float nf = n/normK;
	return nf*nf*nf*nf;
}

void main(void) {
  vec2 uv = vTextureCoord / vec2(planetSize / 800.0, planetSize / 600.0);
  float centerDistance = distance(uv, vec2(0.5, 0.5));
  float borderSize = 0.005;

  vec4 transparent = vec4(0, 0, 0, 0);
  vec4 planetColor = vec4(0.4, 0.4, 0.4, 1.0);

  vec3 sunVector = normalize(sunPosition - planetPosition);

  vec3 normal = normalize(vec3(vec2(0.5) - uv, (1.0 - 2.0 * centerDistance)) * 0.75);
  planetColor = vec4( clamp(dot(sunVector, normal), 0.2, 1.0) * vec3(planetColor), 1.0);

  if (centerDistance < 0.5 - borderSize) {
    gl_FragColor = planetColor;
    return;
  }
  else if (centerDistance < 0.5) {
    float interpolateFactor = (0.5 - centerDistance) / borderSize;
    gl_FragColor = planetColor * interpolateFactor + transparent * (1.0 - interpolateFactor);
    return;
  }

//  float n = abs(pNoise(uv, 50));
//  gl_FragColor = vec4(vec3(n), 1.0);
}
