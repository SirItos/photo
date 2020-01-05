import { MutationsType } from '@/type-def'
export const state = () => ({
  header: null,
  toolbar: false,
  overlay: false,
  NavList: {
    unauth: [
      { text: 'Входа', icon: 'mdi-account', to: '/signin' },
      { text: 'Регистрация', icon: 'mdi-arrow-right', to: '/registrate' }
    ],
    customer: [
      { text: 'Профиль', icon: 'mdi-account', to: '/profile' },
      { text: 'Избранное', icon: 'mdi-star', to: '/favorite' },
      { text: 'Выход', icon: 'mdi-close-circle', action: 'exit' }
    ],
    provider: [
      { text: 'Профиль', icon: 'mdi-account', to: '/profile' },
      // { text: 'Статистика', icon: 'mdi-calendar', to: 'stats' },
      { text: 'Выход', icon: 'mdi-close-circle', action: 'exit' }
    ]
  }
})

export const getters = {
  getNavList: state => index => {
    return state.NavList[index]
  }
}

export const actions = {
  setToolbar({ commit }, payload) {
    commit(MutationsType.settings.SET_TOOLBAR, payload)
  },
  setOverlay({ commit }, payload) {
    commit(MutationsType.settings.SET_OVERLAY, payload)
  }
}

export const mutations = {
  [MutationsType.settings.SET_TOOLBAR](state, payload) {
    state.toolbar = payload
  },
  [MutationsType.settings.SET_OVERLAY](state, payload) {
    state.overlay = payload || false
  }
}
