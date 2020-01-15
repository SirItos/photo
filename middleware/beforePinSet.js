export default function({ from, redirect }) {
  if (!from) {
    redirect('/')
    return
  }
  if (from.name !== 'registrate-confirm-type') {
    redirect('/')
  }
}
