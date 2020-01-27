export const state = () => ({
  error: false
})
export const actions = {
  async sendFeedback({ commit, dispatch }, payload) {
    dispatch('settings/setOverlay', true, { root: true })
    await this.$axios
      .post('/feedback', payload)
      .then(response => {
        commit('setError', false)
        $nuxt.$router.back()
      })
      .catch(e => {
        commit('setError', true)
      })
  },
  async sendFeedbackAuth({ commit, dispatch }, payload) {
    dispatch('settings/setOverlay', true, { root: true })
    dispatch(
      'settings/setChainAction',
      {
        action: 'feedback/sendFeedbackAuth',
        payload: payload
      },
      { root: true }
    )
    await this.$axios
      .post('/feedback-auth', payload)
      .then(response => {
        commit('setError', false)
        $nuxt.$router.back()
      })
      .catch(e => {
        commit('setError', true)
      })
  }
}

export const mutations = {
  setError(state, payload) {
    state.error = payload
  }
}
