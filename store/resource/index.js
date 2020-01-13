export const state = () => ({})

export const actions = {
  async setResourceParams({ commit, dispatch }, payload) {
    dispatch('settings/setOverlay', true, { root: true })
    await this.$axios
      .post('/set-resource-params', {
        params: payload
      })
      .then(response => {})
      .catch(e => {
        console.log(e)
      })
  }
}