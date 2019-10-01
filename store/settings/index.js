export const state = () => ({
  header: null,
  NavList: {
    unauth: [
      { text: 'Входа', icon: 'mdi-account' },
      { text: 'Регистрация', icon: 'mdi-arrow-right' }
    ],
    customer: [
      { text: 'Профиль', icon: 'mdi-account' },
      { text: 'Избранное', icon: 'mdi-star' },
      { text: 'Выход', icon: 'mdi-close-circle' }
    ],
    provider: [
      { text: 'Профиль', icon: 'mdi-account' },
      { text: 'Статистика', icon: 'mdi-calendar' },
      { text: 'Выход', icon: 'mdi-close-circle' }
    ]
  }
})

export const getters = {
  getNavList: state => index => {
    return state.NavList[index]
  }
}
