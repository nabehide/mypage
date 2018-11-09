export const state = () => ({
  invertColor: {
    isColorInverted: {
      tyle: Boolean,
      isColorInverted: false,
      max: null,
      min: null,
      step: null,
    },
  },
  glitch: {
    isGlitched: {
      tyle: Boolean,
      isGlitched: false,
      max: null,
      min: null,
      step: null,
    },
    glitch: {
      tyle: Number,
      glitch: 127,
      max: 255,
      min: 0,
      step: 1,
    },
  },
  zoom: {
    zoom: {
      tyle: Number,
      zoom: 1.0,
      max: 8.0,
      min: 0.5,
      step: 0.5,
    },
  },
  time: {
    isStopped: {
      tyle: Boolean,
      isStopped: false,
      max: null,
      min: null,
      step: null,
    },
    speed: {
      tyle: Number,
      speed: 1,
      max: 10,
      min: 0,
      step: 0.5,
    },
  },
})

export const mutations = {
  // set (state, {target, value}) {
  //   state.parameters[target] = value
  // },
  set (state, {effect, name, value}) {
    state[effect][name][name] = value
  }
}

export const getters = {
  /*
  parameters: state => {
    return state.parameters
  },
  */
  state: state => {
    return state
  },
}

export const actions = {
}
