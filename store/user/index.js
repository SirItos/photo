import { MutationsType } from '@/type-def'

export const state = () => ({
  id: null,
  name: null,
  roles: null,
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
        $nuxt.$router.push('/registrate/pin')
      })
      .catch(e => {
        dispatch(
          'dialog/setDialogParams',
          {
            visibility: true,
            title: 'Неверный код',
            text: e.response.data,
            confirm: false,
            okLabel: 'Ок',
            okAction: () => {
              this.dispatch('dialog/setDialogParams', {}, { root: true })
            }
          },
          { root: true }
        )
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
        pin: payload
      })
      .then(response => {
        this.$cookies.set('token', {
          access_token: state.access_token.access_token,
          refresh_token: state.access_token.refresh_token
        })
        $nuxt.$router.push('/registrate/createuser')
      })
      .catch(e => {
        console.log(e)
      })
  },

  async getUserParams({ commit }, payload) {
    await this.$axios
      .post('/user-params', {
        params: payload
      })
      .then(response => {
        const data = [
          {
            field: 'id',
            value: response.data.id
          },
          {
            field: 'roles',
            value: response.data.roles[0].name
          }
        ]
        commit(MutationsType.user.SET_USER_FIELD, data)
      })
      .catch(e => {
        console.log(e)
      })
  },

  async enter({ commit, dispatch }, payload) {
    dispatch('settings/setOverlay', true, { root: true })
    await this.$axios
      .post('/auth', payload)
      .then(response => {
        this.$cookies.set('token', {
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token
        })
        commit(MutationsType.user.SET_USER_FIELD, [
          {
            field: 'access_token',
            value: response.data
          }
        ])
        $nuxt.$router.push('/')
        dispatch('getUserParams', ['roles', 'id'])
      })
      .catch(e => {
        dispatch(
          'dialog/setDialogParams',
          {
            visibility: true,
            title: 'Ошибка входа',
            text: e.response.data,
            confirm: false,
            okLabel: e.response.status === 401 ? 'Зарегистрироваться' : 'Ок',
            okAction:
              e.response.status === 401
                ? () => {
                    this.dispatch('dialog/setDialogParams', {})
                    this.dispatch('user/registrateApi', {
                      field: 'phone',
                      value: payload.phone
                    })
                  }
                : null
          },
          { root: true }
        )
      })
  },
  setCity({ commit }, payload) {
    commit(MutationsType.user.SET_CITY, payload)
  }
}

export const mutations = {
  [MutationsType.user.SET_USER_PHONE](state, payload) {
    state.phone = payload
  },
  // [MutationsType.user.SET_USER](state, payload) {
  //   state.phone = payload.phone
  //   state.name = payload.name
  //   state.roles = payload.roles
  // },
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
