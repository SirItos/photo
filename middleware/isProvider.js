export default function({ store, redirect }) {
  if (store.state.user.roles !== 'provider') {
    redirect('/')
    return
  }
}
