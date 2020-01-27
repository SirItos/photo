export const state = () => ({})

export const actions = {
  async setResourceParams({ commit, dispatch }, payload) {
    dispatch('settings/setOverlay', true, { root: true })
    dispatch(
      'settings/setChainAction',
      {
        action: 'resource/setResourceParams',
        payload: payload
      },
      { root: true }
    )
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
