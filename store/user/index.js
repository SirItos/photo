import { MutationsType } from '@/type-def'

export const state = () => ({
  id: null,
  roles: null,
  phone: null,
  email: null,
  access_token: null,
  have_res: false,
  have_foto: 0,
  online: true,
  city: null,
  latlng: {
    lat: null,
    lng: null
  }
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

  async enter({ state, commit, dispatch }, payload) {
    dispatch('settings/setOverlay', true, { root: true })
    await this.$axios
      .post('/auth', payload)
      .then(async response => {
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
        await dispatch('getUserParams', [
          'roles',
          'id',
          'resource',
          'userDetails'
        ])
        if (this.roles !== 'provider') return
        if (!state.have_res) {
          dispatch(
            'dialog/setDialogParams',
            {
              visibility: true,
              title: 'Создайте ресурс',
              text:
                'Для продолжения работы в качестве поставщика услуг, необходимо создать ресурс',
              confirm: true,
              okLabel: 'Создать',
              cancelLabel: 'Позже',
              okAction: () => {
                $nuxt.$router.push('/registrate/resource/carinfo')
                dispatch('dialog/setDialogParams', {}, { root: true })
              }
            },
            { root: true }
          )
        }
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

  exit({ commit }) {
    this.$cookies.remove('token')
    commit(MutationsType.user.CLEAR)
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
        commit(MutationsType.user.SET_USER_FIELD, [
          {
            field: 'roles',
            value: response.data.roles
          }
        ])
        $nuxt.$router.push('/registrate/createuser')
      })
      .catch(e => {
        console.log(e)
      })
  },
  async setUserProperties({ commit, dispatch }, payload) {
    dispatch('settings/setOverlay', true, { root: true })
    await this.$axios
      .post('/set-user-details', {
        params: payload
      })
      .then(response => {
        commit(MutationsType.user.SET_USER_FIELD, payload)
      })
      .catch(e => {
        console.log(e)
      })
  },
  async setUserRole({ commit, dispatch }, payload) {
    dispatch('settings/setOverlay', true, { root: true })
    await this.$axios
      .post('/set-role', {
        role: payload.params[0].value
      })
      .then(respinse => {
        commit(MutationsType.user.SET_USER_FIELD, payload.params)
        $nuxt.$router.push(payload.nextRoute)
      })
      .catch(e => {
        dispatch(
          'dialog/setDialogParams',
          {
            visibility: true,
            title: 'Ошибка установки роли',
            text: e.response.data,
            confirm: false,
            okLabel: 'Ок',
            okAction: null
          },
          { root: true }
        )
      })
  },
  setCity({ commit }, payload) {
    commit(MutationsType.user.SET_USER_FIELD, payload)
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
          },
          {
            field: 'have_res',
            value: response.data.resource ? response.data.resource.id : 0
          },
          {
            field: 'have_foto',
            value: response.data.resource
              ? response.data.resource.images.length
              : 0
          },
          {
            field: 'online',
            value: response.data.userDetails.online
          }
        ]
        commit(MutationsType.user.SET_USER_FIELD, data)
      })
      .catch(e => {})
  }
}

export const mutations = {
  [MutationsType.user.SET_USER_FIELD](state, payload) {
    payload.forEach(property => {
      if (!property) return
      const paramName =
        property.field === 'display_phone' ? 'phone' : property.field
      state[paramName] = property.value
    })
  },
  [MutationsType.user.CLEAR](state) {
    ;(state.id = null),
      (state.name = null),
      (state.roles = null),
      (state.phone = null),
      (state.email = null),
      (state.access_token = null),
      (state.have_res = false),
      (state.online = false),
      (state.city = null),
      (state.latlng = {
        lat: null,
        lng: null
      })
  }
}
