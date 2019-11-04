import { MutationsType } from '@/type-def'

export const state = () => ({
  name: null,
  role: null,
  phone: null,
  email: null,
  access_token: null,
  have_res: false,
  online: false
})

export const actions = {
  // async registrateRequest({ commit }, payload) {
  //   commit(MutationsType.user.SET_USER_PHONE, payload)
  // },
  async smsConfrim({ commit }, payload) {},
  async setPin(payload) {},
  async setUserProperties({ commit }, payload) {
    commit(MutationsType.user.SET_USER_FIELD, payload)
  },
  async enter({ commit }, payload) {
    commit(MutationsType.user.SET_USER, payload)
  }
}

export const mutations = {
  [MutationsType.user.SET_USER_PHONE](state, payload) {
    state.phone = payload
  },
  [MutationsType.user.SET_USER](state, payload) {
    state.phone = payload.phone
    state.name = payload.name
    state.role = payload.role
  },
  [MutationsType.user.SET_USER_FIELD](state, payload) {
    payload.forEach(property => {
      if (!property) return
      state[property.field] = property.value
    })
  }
}
