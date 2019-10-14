import { MutationsType } from '@/type-def'

export const state = () => ({
  id: null,
  element: {
    stauts: false,
    address: null
  },
  images: []
})

export const getters = {
  getElement: state => state.element,
  getId: state => state.id,
  getImages: state => state.images
}

export const actions = {
  setBottomSheetElement({ commit }, payload) {
    setTimeout(() => {
      commit(MutationsType.bottomSheet.SET_BOTTOM_SHEET_ELEMENT, payload)
    }, 1500)
  },
  setId({ commit }, payload) {
    commit(MutationsType.bottomSheet.SET_ID, payload)
  }
}

export const mutations = {
  [MutationsType.bottomSheet.SET_BOTTOM_SHEET_ELEMENT](state, payload) {
    state.element.stauts = true
    state.element.address = 'Test addres'
  },
  [MutationsType.bottomSheet.SET_ID](state, payload) {
    state.id = payload
  }
}
