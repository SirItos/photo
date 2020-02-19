export const state = () => ({
  lastResourceId: null
})

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
      .then(response => {
        commit('setLastResourceId', response.data.id)
      })
      .catch(e => {
        console.log(e)
      })
  },
  async deleteRes({ dispatch }, payload) {
    dispatch('settings/setOverlay', true, { root: true })
    await this.$axios
      .post('/delete-resource', {
        id: payload
      })
      .then(response => {
        dispatch('dialog/setDialogParams', {}, { root: true })
        $nuxt.$router.replace('/')
      })
      .catch(e => {
        console.log(e)
        dispatch('dialog/setDialogParams', {}, { root: true })
      })
  }
}

export const mutations = {
  setLastResourceId(state, payload) {
    state.lastResourceId = payload
  }
}
