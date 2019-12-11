export default function({ $axios, store }) {
  $axios.onRequest(config => {
    if (store.state.user.access_token) {
      config.headers.Authorization = `Bearer ${store.state.user.access_token.access_token}`
    }
    return config
  })
  $axios.onResponse(() => {
    // store.dispatch('settings/setOverlay', false)
  })
  $axios.onError(error => {
    // store.dispatch('settings/setOverlay', false)
  })
}
