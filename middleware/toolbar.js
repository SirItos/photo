export default function({ route, store }) {
  if (
    route.path === '/'
    // route.path.startsWith('/signin') ||
    // route.path.startsWith('/resource') ||
    // route.path.startsWith('/terms')
  ) {
    if (store.state.settings.toolbar) {
      store.dispatch('settings/setToolbar', true)
    }
  } else {
    store.dispatch('settings/setToolbar', false)
  }
}
