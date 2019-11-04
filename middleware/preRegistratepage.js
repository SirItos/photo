export default function({ store, from, redirect }) {
  if (!from) redirect('/')

  if (!from.fullPath.startsWith('/registrate')) {
    store.dispatch('settings/setToolbar', true)
    redirect('/')
  }
}
