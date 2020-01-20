import { MutationsType } from '@/type-def'
export const state = () => ({
  header: null,
  toolbar: false,
  overlay: false,
  lastCenterPosition: null,
  geolocationNotify: false,
  geolocationPremision: true,
  NavList: {
    unauth: [
      { text: 'Вход', icon: 'mdi-account', to: '/signin' },
      { text: 'Регистрация', icon: 'mdi-arrow-right', to: '/registrate' }
    ],
    customer: [
      { text: 'Профиль', icon: 'mdi-account', to: '/profile' },
      { text: 'Избранное', icon: 'mdi-star', to: '/favorite' },
      { text: 'Выход', icon: 'mdi-close-circle', action: 'exit' }
    ],
    provider: [
      { text: 'Профиль', icon: 'mdi-account', to: '/profile' },
      { text: 'Статистика', icon: 'mdi-calendar', to: '/statistic' },
      { text: 'Выход', icon: 'mdi-close-circle', action: 'exit' }
    ]
  }
})

export const getters = {
  getNavList: state => index => {
    return state.NavList[index]
  },
  getGeolocationPermision: state => state.geolocationPremision
}

export const actions = {
  setToolbar({ commit }, payload) {
    commit(MutationsType.settings.SET_TOOLBAR, payload)
  },
  setOverlay({ commit }, payload) {
    commit(MutationsType.settings.SET_OVERLAY, payload)
  },
  setLastCenterPosition({ commit }, payload) {
    commit(MutationsType.settings.SET_LAST_CENTER, payload)
  },
  setGeolocationNotify({ commit }, payload) {
    commit(MutationsType.settings.SET_GEOLOCATION_NOTIFY, payload)
  },
  setGeolocationPremision({ commit }, payload) {
    commit(MutationsType.settings.SET_GEOLOCATION_PREMISION, payload)
  }
}

export const mutations = {
  [MutationsType.settings.SET_TOOLBAR](state, payload) {
    if (!payload) {
      ;(state.header = null), (state.toolbar = false)
      return
    }
    state.header = payload.header
    state.toolbar = payload.toolbar
  },
  [MutationsType.settings.SET_OVERLAY](state, payload) {
    state.overlay = payload || false
  },
  [MutationsType.settings.SET_LAST_CENTER](state, payload) {
    state.lastCenterPosition = payload || null
  },
  [MutationsType.settings.SET_GEOLOCATION_NOTIFY](state, payload) {
    state.geolocationNotify = payload
  },
  [MutationsType.settings.SET_GEOLOCATION_PREMISION](state, payload) {
    state.geolocationPremision = payload
  }
}
