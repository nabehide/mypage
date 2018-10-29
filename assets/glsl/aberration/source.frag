#ifdef GL_ES
precision mediump float;
#define GLSLIFY 1
#endif
uniform float time;
uniform vec2  resolution;

uniform float a1;
uniform float a2;
uniform float a3;
uniform float a4;

uniform int   d1;
uniform int   d2;
uniform int   d3;

const float PI = 3.14159265;
const float period = 6.0;
const float offset = 0.0;

const int NCircle = 3;
const float MAX_MOVE = 0.05;
const float MAX_SCALE = 1.1;
const float MIN_SCALE = 0.9;
const float MAX_COLOR = 0.5;
const float MIN_COLOR = 0.0;

// const vec3 bg = vec3(0.0, 0.0, 0.0);

mat2 rot(float t){
  return mat2(cos(t),-sin(t),sin(t),cos(t));
}

float rand(vec2 co){
  return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

float noise(float s, float o, float period){
  float i = floor(s);
  float f = fract(s);
  float u = f * f * (3. - 2. * f);

  float s1 = rand(vec2(i/100.,i*o/100.));
  float s2;
  if(s < period-1.){
     s2 = rand(vec2((i+1.)/100.,(i+1.)*o/100.));
  }else{
     s2 = rand(vec2(0.,0.));
  }

  return mix(s1, s2, u);
}

float circle(vec2 p, float size, float a){
  // return size-pow(length(p),a);
  // return step(length(p), size);
  return smoothstep(size, size-0.01, length(p));
}

float line(vec2 p, float width){
  return (1.0 - step(width*0.5, abs(p.y)));
  // return (1.0 - step(width*0.5, abs(p.y))) * (1.0 - step(0.0, p.x));
}

void main(void){
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  float t = mod(time, period);

  // glich
  if(d2 == 1){
    // p.x += (rand(vec2(t))*2.-1.)*a4;
    for(int i=0; i<5; i++){
      float r1 = rand(vec2(t+0.0, float(i)))*2.-1.;
      float r2 = rand(vec2(t+0.1, float(i)))*2.-1.;
      float intensity = rand(vec2(t+0.2, float(i)))*a4/255.;
      if(min(r1, r2)<p.y && p.y<max(r1, r2)){
        p.x += intensity;
      }
    }
  }

  vec3 draw = vec3(0.0);

  float sr = 0.0;
  float sg = 0.0;
  float sb = 0.0;
  for(int i=0; i<NCircle; i++){
    float r1 = mod(time+rand(vec2(float(i),0.1))*period, period)/period*2.0;
    float r2 = mod(time+rand(vec2(float(i),0.2))*period, period)/period*2.0;
    float r3 = mod(time+rand(vec2(float(i),0.3))*period, period)/period*2.0;

    float n1 = noise(r1, 0.1+float(i), 2.0);
    float n2 = noise(r2, 0.2+float(i), 2.0);
    float n3 = noise(r3, 0.3+float(i), 2.0);

    sr += n1;
    sg += n2;
    sb += n3;

    /*
    sr += rand(vec2(float(i),0.1));
    sg += rand(vec2(float(i),0.2));
    sb += rand(vec2(float(i),0.3));
    */
  }

  vec3 color;
  for(int i=0; i<NCircle; i++){
    float r1 = mod(time+rand(vec2(float(i),0.1))*period, period)/period*2.0;
    float r2 = mod(time+rand(vec2(float(i),0.2))*period, period)/period*2.0;
    float r3 = mod(time+rand(vec2(float(i),0.3))*period, period)/period*2.0;
    // float r4 = mod(time+rand(vec2(float(i),0.4))*period, period)/period*2.0;
    // float r5 = mod(time+rand(vec2(float(i),0.5))*period, period)/period*2.0;
    // float r6 = mod(time+rand(vec2(float(i),0.6))*period, period)/period*2.0;
    // float r7 = mod(time+rand(vec2(float(i),0.7))*period, period)/period*2.0;

    float n1 = noise(r1, 0.1+float(i), 2.0);
    float n2 = noise(r2, 0.2+float(i), 2.0);
    float n3 = noise(r3, 0.3+float(i), 2.0);
    // float n4 = noise(r4, 0.4+float(i), 2.0);

    vec2 pos = vec2(n1*MAX_MOVE*2.0-MAX_MOVE, n2*MAX_MOVE*2.0-MAX_MOVE);

    float px = n2*(MAX_SCALE-MIN_SCALE)+MIN_SCALE;
    float py = n1*(MAX_SCALE-MIN_SCALE)+MIN_SCALE;

    color = vec3(n1/sr, n2/sg, n3/sb);
    /*
    color = vec3(
      rand(vec2(float(i),0.1))/sr,
      rand(vec2(float(i),0.2))/sg,
      rand(vec2(float(i),0.3))/sb
    );
    */

    // draw += circle(p-pos, 0.5, 1.0) * color;
    draw += circle(vec2(p.x*px,p.y*py)-pos, 0.5, 1.0) * color;
  }
  // draw += circle(p - vec2(0.0, 0.1), 0.5, 1.0) * color2;
  // draw += circle(p - vec2(0.05, 0.05), 0.5, 1.0) * color3;

  // invert color
  if(d1 == 0){
    draw = 1.0 - draw;
  }

  float alpha = 1.;
  // if(draw==vec3(0.)){
  //   alpha = 0.;
  // }

  gl_FragColor = vec4(draw,alpha);
}
