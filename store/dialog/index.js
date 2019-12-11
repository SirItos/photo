import { MutationsType } from '@/type-def'

export const state = () => ({
  visibility: false,
  title: null,
  text: null,
  buttons: []
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
    state.buttons = payload.buttons
  }
}
