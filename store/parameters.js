export const state = () => ({
  invertColor: {
    isColorInverted: false,
  },
  glitch: {
    isGlitched: false,
    glitch: 127,
  },
  /*
  stop: {
    isStoped: false,
  },
  zoom: {
    zoom: 1.0,
  },
  */
})

export const mutations = {
  // set (state, {target, value}) {
  //   state.parameters[target] = value
  // },
  set (state, {effect, name, value}) {
    state[effect][name] = value
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
