export default function({ store, redirect }) {
  if (store.state.user.roles !== 'customer') {
    redirect('/')
    return
  }
}
