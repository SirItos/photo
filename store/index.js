import { MutationsType } from '@/type-def'

export const actions = {
  async nuxtServerInit({ commit, dispatch }, { app }) {
    const access_token = app.$cookies.get('token')
    if (!access_token) return

    await commit(`user/${MutationsType.user.SET_USER_FIELD}`, [
      {
        field: 'access_token',
        value: access_token
      }
    ])
    if (access_token) {
      app.$axios.setToken(access_token.access_token, 'Bearer')
    }
    await dispatch(
      'user/getUserParams',
      ['roles', 'id', 'resource', 'userDetails'],
      {
        root: true
      }
    )
  }
}
