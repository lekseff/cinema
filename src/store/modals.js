import {MODAL} from '../../constants'

export const modals = {
  state: () => ({
    modals: {
      [MODAL.addHall]: false,
      [MODAL.addCountry]: false,
      [MODAL.addGenre]: false
    }
  }),
  mutations: {
    openModal(state, payload) {
      state.modals[payload] = true
    },
    closeModal(state, payload) {
      state.modals[payload] = false
    }
  },
  actions: {
    openModal({commit}, payload) {
      commit('openModal', payload)
    },
    closeModal({commit}, payload) {
      commit('closeModal', payload)
    }
  },
  getters: {
    getModalStatus: (state) => (name) => {
      return state.modals[name]
    }
  }
}
