import { MutationsType } from '@/type-def'

export const state = () => ({
  visibility: false,
  title: null,
  text: null,
  okLabel: null,
  cancelLabel: null,
  okAction: null,
  confirm: false
})

export const actions = {
  setDialogParams({ commit }, payload) {
    commit(MutationsType.dialog.SET_DIALOG_PARAMS, payload)
  }
}

export const mutations = {
  [MutationsType.dialog.SET_DIALOG_PARAMS](state, payload) {
    state.visibility = payload.visibility || false
    state.title = payload.title || null
    state.text = payload.text || null
    state.okLabel = payload.okLabel || null
    state.cancelLabel = payload.cancelLabel || null
    state.confirm = payload.confirm || false
    state.okAction = payload.okAction || null
  }
}
