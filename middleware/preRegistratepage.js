export default function({ store, from, redirect }) {
  if (!from) redirect('/')

  if (
    !from.fullPath.startsWith('/registrate') &&
    !from.fullPath.startsWith('/terms')
  ) {
    store.dispatch('settings/setToolbar', true)
    redirect('/')
  }
}
