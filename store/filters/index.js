import { MutationsType } from '@/type-def'

export const state = () => ({
  active: false,
  filters: {
    individual: false,
    showroom: false,
    twenty: false,
    thirty: false,
    forty: false,
    fifty: false,
    priceRange: [1, 3],
    distance: 0
  }
})

export const getters = {
  getFilterActive: state => state.active,
  getFilters: state => state.filters
}

export const actions = {
  changeFilters({ commit }, payload) {
    commit(MutationsType.filters.SET_FILTERS, payload)
  },
  activateFilters({ commit }, payload) {
    commit(MutationsType.filters.SET_FILTERS_ACTIVE, payload)
  }
}

export const mutations = {
  [MutationsType.filters.SET_FILTERS](state, payload) {
    state.filters = payload || {
      individual: false,
      showroom: false,
      twenty: false,
      thirty: false,
      forty: false,
      fifty: false,
      priceRange: [1, 3],
      distance: 0
    }
  },
  [MutationsType.filters.SET_FILTERS_ACTIVE](state, payload) {
    state.active = payload || false
  }
}
