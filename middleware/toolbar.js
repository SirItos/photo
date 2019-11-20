export default function({ route, store }) {
  if (
    route.path.startsWith('/registrate') ||
    route.path.startsWith('/signin') ||
    route.path.startsWith('/resource') ||
    route.path.startsWith('/terms')
  ) {
    if (store.state.settings.toolbar) {
      store.dispatch('settings/setToolbar', false)
    }
  }
}