#ifdef GL_ES
precision mediump float;
#define GLSLIFY 1
#endif
uniform float time;
uniform vec2  resolution;
uniform vec3  color;

const float PI = 3.14159265;
const float period = 5.;
const float offset = period/2.;

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

float line(vec2 p, float width){
  // return (1.0 - step(width*0.5, abs(p.y)));
  // return (1.0 - step(width*0.5, abs(p.y))) * (1.0 - step(0.0, p.x));
  return (1.0 - step(width*0.5, abs(p.y))) * (1.0 - step(-0.00, p.x) - step(p.x, -1.0));
}

void main(void){
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  float t = mod(time, period);

  vec3 draw = vec3(0.);

  float lines = 0.0;

  float a = 0.4;

  /*
  vec2 start = vec2(0.);
  // vec2 start = vec2(cos(t*PI*0.8), sin(t*PI*0.8));
  vec2 center = vec2(cos(t*PI*a), sin(t*PI*a));
  float r = sin(t*PI*a) * 2. + (-1.0);

  vec2 pos = (p-start) * rot(0.5*PI) * rot(r*length(p-center));
  lines += line(pos, 0.01) * (sin(-t*PI*a)+1.0)/2.0;

  vec2 pos2 = (p+start) * rot(0.5*PI) * rot(-r*length(p+center));
  lines += line(pos2, 0.01) * (sin(t*PI*a)+1.0)/2.0;
  */
  vec2 pos = p - vec2(0.0, 0.0);
  pos = vec2(pos.x*(sin(pos.y+t*PI*a+offset))/2., pos.y*(sin(pos.x+t*PI*a+offset))/2.);
  pos = vec2(pos.x*(sin(-t*PI*a+offset)+1.001)/2., pos.y*(cos(-t*PI*a+offset)+1.001)/2.);
  pos *= rot(t*PI*a*2.);
  // pos = vec2(pos.x*(cos(-t*PI*a+offset)+1.001)/2., pos.y*(sin(-t*PI*a+offset)+1.001)/2.);

  // lines += line(pos, 0.01);
  lines += line(pos * rot((sin(t*PI*a+offset)+1.0)/length(p)), 0.01);  // * (1.0-step(0.0, p.x));

  draw += lines * vec3(0.01, 1.0, 0.01);

  float alpha = 1.;
  // if(draw==vec3(0.)){
  //   alpha = 0.;
  // }

  gl_FragColor = vec4(draw,alpha);
}
