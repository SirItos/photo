import { MutationsType } from '@/type-def'

export const actions = {
  async nuxtServerInit({ commit, dispatch }, { app }) {
    const access_token = app.$cookies.get('token')
    commit(`user/${MutationsType.user.SET_USER_FIELD}`, [
      {
        field: 'access_token',
        value: access_token
      }
    ])
    await dispatch(
      'user/getUserParams',
      ['roles', 'id', 'resource', 'userDetails'],
      {
        root: true
      }
    )
  }
}
