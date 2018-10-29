<template>
  <div id="guiWrapper">
    <div id="guiContainer"></div>
  </div>
</template>

<script>
export default {
  data () {
    const dat = require("dat.gui")
    const gui = new dat.GUI({})
    gui.open()

    return {
      gui: gui,
    }
  },
  mounted () {
    const guiContainer = document.getElementById("guiContainer")
    guiContainer.appendChild(this.gui.domElement)

    this.params = this.$store.getters["parameters/state"]
    this.parameters = JSON.parse(JSON.stringify(this.params))

    /*
    this.params = this.$store.getters["parameters/state"]
    this.parameters = {
      invertColor: {
        isColorInverted: this.params.invertColor.isColorInverted,
      },
      glitch: {
        isGlitched: this.params.glitch.isGlitched,
        glitch: this.params.glitch.glitch,
      },
    }
    */

    for(let effect in this.params){
      const folder = this.gui.addFolder(effect)
      folder.open()
      for(let name in this.params[effect]){
        // this.gui.add(this.parameters[effect], name).listen().onChange(() => {
        folder.add(this.parameters[effect], name).listen().onChange(() => {
          this.setParameter(effect, name)
        })
      }
    }

    // window.addEventListener('keydown', (e) => { this.keyEventCase(e, true) })
    // window.addEventListener('keyup', (e) => { this.keyEventCase(e, false) })
    window.addEventListener('keydown', (e) => {
      let effect
      let name
      switch (e.key) {
        case 'a':
          effect = 'invertColor'
          name = 'isColorInverted'
          this.keyEvent(effect, name, !this.parameters[effect][name])
          break
        case 's':
          effect = 'glitch'
          name = 'isGlitched'
          this.keyEvent(effect, name, !this.parameters[effect][name])
          break
        case 'w':
          effect = 'glitch'
          name = 'glitch'
          this.keyEvent(effect, name, this.parameters[effect][name]+1)
          break
        case 'x':
          effect = 'glitch'
          name = 'glitch'
          this.keyEvent(effect, name, this.parameters[effect][name]-1)
          break
        default:
          console.log(e.key)
          break
      }
    })
  },
  methods: {
    setParameter (effect, name) {
      this.$store.commit("parameters/set", {effect: effect, name: name, value: this.parameters[effect][name]})
    },
    keyEvent (effect, name, b) {
      this.parameters[effect][name] = b
      this.setParameter(effect, name)
    },
    // keyEventCase (e, b) {
    //   switch (e.key) {
    //     case 'a':
    //       this.keyEvent('isColorInverted', b)
    //       break
    //     default:
    //       console.log(e.key)
    //       break
    //   }
    // },
  }
}
</script>

<style scoped lang="scss">
#guiWrapper {
  position: absolute;
  top: 0;
  right: 0;
}
#guiContainer {
  position: relative;
  z-index: 1;
}
</style>
