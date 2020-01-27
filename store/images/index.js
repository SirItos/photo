export const actions = {
  async uploadImages({ dispatch }, payload) {
    dispatch('settings/setOverlay', true, { root: true })
    dispatch(
      'settings/setChainAction',
      {
        action: 'images/uploadImages',
        payload: payload
      },
      { root: true }
    )
    let formData = new FormData()
    for (var i = 0; i < payload.upload.length; i++) {
      let file = payload.upload[i]
      formData.append('files[' + i + ']', file)
    }
    await this.$axios
      .post('/upload-images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        console.log(response.data)
      })
  },
  async deleteImages({ dispatch, context }, payload) {
    dispatch(
      'settings/setChainAction',
      {
        action: 'images/deleteImages',
        payload: payload
      },
      { root: true }
    )
    this.$axios.post('/delete-images', { ids: payload })
  }
}
