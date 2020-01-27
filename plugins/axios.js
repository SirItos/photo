export default function({ $axios, store }) {
  $axios.onRequest(config => {
    if (store.state.user.access_token) {
      config.headers.Authorization = `Bearer ${store.state.user.access_token.access_token}`
    }
    return config
  })
  $axios.onResponse(() => {
    store.dispatch('settings/setChainAction', {})
    store.dispatch('settings/setOverlay', false)
  })
  $axios.onError(error => {
    // if (error.response) {
    //   if (error.response.status === 401) {
    //     await store.dispatch('user/refreshToken')
    //     if (store.state.settings.chainAction.action) {
    //       await store.dispatch(
    //         store.state.settings.chainAction.action,
    //         store.state.settings.chainAction.payload
    //       )
    //     }
    //     return
    //   }
    // }
    // console.log('global error handler')
    store.dispatch('settings/setOverlay', false)
  })
}
