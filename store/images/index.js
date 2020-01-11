export const actions = {
  async uploadImages({ dispatch }, payload) {
    dispatch('settings/setOverlay', true, { root: true })
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
  async deleteImages({ context }, payload) {
    this.$axios.post('/delete-images', { ids: payload })
  }
}
