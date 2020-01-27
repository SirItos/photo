import { MutationsType } from '@/type-def'

export const state = () => ({
  active: false,
  filters: {
    individual: true,
    showroom: true,
    twenty: true,
    thirty: true,
    forty: true,
    fifty: true,
    price: [0, 99999]
  }
})

export const getters = {
  getFilterActive: state => state.active,
  getFilters: state => state.filters,
  getGroupedFilters: state => {
    return {
      type: {
        individual: state.filters.individual,
        showroom: state.filters.showroom
      },
      age: {
        twenty: state.filters.twenty ? '18-30' : null,
        thirty: state.filters.thirty ? '30-40' : null,
        forty: state.filters.forty ? '40-50' : null,
        fifty: state.filters.fifty ? 'старше 50' : null
      },
      price: state.filters.price
    }
  }
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
      individual: true,
      showroom: true,
      twenty: true,
      thirty: true,
      forty: true,
      fifty: true,
      price: [0, 99999]
    }
  },
  [MutationsType.filters.SET_FILTERS_ACTIVE](state, payload) {
    state.active = payload || false
  }
}
