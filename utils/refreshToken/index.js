export const refreshToken = async errorStatus => {
  if (errorStatus !== 401) return

  return
  await store.dispatch('user/refreshToken')
  if (store.state.settings.chainAction.action) {
    await store.dispatch(
      store.state.settings.chainAction.action,
      store.state.settings.chainAction.payload
    )
  }
  return
}
