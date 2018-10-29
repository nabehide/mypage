<template>
  <div id="container">
    <canvas id="canvas"/>
  </div>
</template>

<script>
import * as THREE from 'three'

import KeyEventListener from '~/assets/js/keyEventListener'

const DEFAULT_VERTEX_SHADER = `
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`
const DEFAULT_FRAGMENT_SHADER = `
uniform vec2 resolution;
uniform float time;
void main() {
  vec2 pos = gl_FragCoord.xy / resolution.xy;
  float d = distance(pos, vec2(0.5)) + sin(time) * 0.1;
  float c = 1.0 - smoothstep(0.5, 0.501, d);
  gl_FragColor = vec4(0.0, c, c, 1.0);

  // vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  // gl_FragColor = vec4(sin(time), cos(time), -sin(time), 1.0);
}
`

export default {
  computed: {
  },
  data () {
    this.parameters = this.$store.getters["parameters/state"]
    // this.parameters = this.$store.getters["parameters/parameters"]
    const scene  = new THREE.Scene()

    const width = window.innerWidth
    const height = window.innerHeight
    const aspect = width / height

    const camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.1, 10)
    camera.position.set(0, 0, 1)
    camera.lookAt(scene.position)

    let uniforms = {}
    const DEFAULT_UNIFORMS = {
      time: {type: 'f', value: 0.0},
      resolution: {type: 'v2', value: new THREE.Vector2(width, height)},
    }
    uniforms = Object.assign(DEFAULT_UNIFORMS, uniforms)
    uniforms = Object.assign({
      isColorInverted: {type: 'i', value: this.parameters.invertColor.isColorInverted},

      isGlitched: {type: 'i', value: this.parameters.glitch.isGlitched},
      glitch: {type: 'i', value: this.parameters.glitch.glitch},

    }, uniforms)

    const fragmentShader = require('@/assets/glsl/' + 'curves' + '/source.frag')

    const material = new THREE.ShaderMaterial({
      vertexShader: DEFAULT_VERTEX_SHADER,
      fragmentShader: fragmentShader || DEFAULT_FRAGMENT_SHADER,
      uniforms: uniforms,
    })
    const geometry = new THREE.PlaneGeometry(2 * aspect, 2)
    const plane = new THREE.Mesh(geometry, material)
    return {
      scene: scene,
      camera: camera,
      plane: plane,
      uniforms: uniforms,
      width: width,
      height: height,
      aspect: aspect,
    }
  },
  created () {
  },
  mounted () {
    const kel = new KeyEventListener(this.$store)
    // kel.setup()

    const canvas = document.getElementById("canvas")
    canvas.width = this.width
    canvas.height = this.height

    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      width: this.width,
      height: this.height,
    })

    this.scene.add(this.camera)
    this.scene.add(this.plane)

    this.fps = 1000.0 / 30.0
    this.past = this.getTime()
    this.animate()
  },
  methods: {
    animate () {
      requestAnimationFrame(this.animate)

      const now = this.getTime()
      if (this.fps < now - this.past) {
        this.past = now

        this.updateUniforms()

        this.renderer.render(this.scene, this.camera)
      }
    },
    updateUniforms () {
      this.uniforms.time.value = (this.getTime() % (1000*60*60)) * 0.001;

      for (let p in this.parameters) {
        for (let name in this.parameters[p]) {
          this.uniforms[name].value = this.parameters[p][name]
        }
      }
    },

    getTime () {
      const now = window.performance && ( performance.now )
      return (now && now.call( performance )) && ( new Date().getTime() )
    },
  },
  updated () {
  },
}
</script>

<style scoped lang="scss">
.container {
  position: relative;
  width: 100%;
  height: 100%;
}
canvas {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>