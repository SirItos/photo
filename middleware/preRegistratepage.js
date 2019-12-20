export default function({ store, from, redirect }) {
  if (!from) {
    redirect('/')
    return
  }
  if (
    !from.fullPath.startsWith('/registrate') &&
    !from.fullPath.startsWith('/signin') &&
    !from.fullPath.startsWith('/terms')
  ) {
    redirect('/')
  }
}
