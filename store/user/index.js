import { MutationsType } from '@/type-def'

export const state = () => ({
  id: null,
  name: null,
  role: null,
  phone: null,
  email: null,
  ageRange: null,
  access_token: null,
  have_res: false,
  online: false,
  city: null
})

export const actions = {
  async registrateApi({ commit, dispatch }, payload) {
    dispatch('settings/setOverlay', true, { root: true })
    await this.$axios
      .post('/registrate-user', {
        phone: payload.value.replace(/\s+/g, '')
      })
      .then(response => {
        commit(MutationsType.user.SET_USER_FIELD, [
          payload,
          { field: 'id', value: response.data.user_id }
        ])
        $nuxt.$router.push('/registrate/confirm')
      })
      .catch(e => {
        dispatch(
          'dialog/setDialogParams',
          {
            visibility: true,
            title: 'Ошибка регистрации',
            text: e.response.data,
            confirm: false,
            okLabel: 'Войти',
            okAction: () => {
              this.$router.replace('/signin')
            }
          },
          { root: true }
        )
      })
  },

  async smsConfrim({ state, commit, dispatch }, payload) {
    dispatch('settings/setOverlay', true, { root: true })
    await this.$axios
      .post('/confirm-phone', {
        code: payload.code,
        id: state.id
      })
      .then(response => {
        commit(MutationsType.user.SET_USER_FIELD, [
          {
            field: 'access_token',
            value: response.data
          }
        ])
        console.log(state)
        $nuxt.$router.push('/registrate/pin')
      })
      .catch(e => {
        console.log(e)
      })
  },

  async ascNewCode({ state, dispatch }) {
    dispatch('settings/setOverlay', true, { root: true })
    await this.$axios
      .post('/ask-code', {
        id: state.id
      })
      .then(response => {
        console.log(response.data)
      })
      .catch(e => {
        console.log(e)
      })
  },

  async setPin({ state, commit, dispatch }, payload) {
    dispatch('settings/setOverlay', true, { root: true })
    await this.$axios
      .post('/set-pin', {
        pin: payload.pin
      })
      .then(response => {
        Cookie.set('token', {
          access_token: state.access_token.access_token,
          refresh_token: state.access_token.refresh_token
        })
        $nuxt.$router.push('/registrate/createuser')
      })
      .catch(e => {
        console.log(e)
      })
  },

  async getUserParams({ commit }) {
    await this.$axios
      .post('/user-params', {
        params: ['role', 'id']
      })
      .then(response => {
        console.log(response)
      })
      .catch(e => {
        console.log(e)
      })
  },

  async enter({ commit }, payload) {
    commit(MutationsType.user.SET_USER, payload)
  },
  setCity({ commit }, payload) {
    commit(MutationsType.user.SET_CITY, payload)
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
  },
  [MutationsType.user.SET_CITY](state, payload) {
    state.city = payload
  }
}
