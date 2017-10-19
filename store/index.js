import * as api from '~/api/todolist'

export const state = () => ({
  items: [],
  filter: api.FILTER_ALL
})

export const getters = {
  openItems (state) {
    return state.items.filter(item => !item.done)
  },

  itemById: (state) => (id) => {
    for (const item of state.items) {
      if (item.id === id) {
        return item
      }
    }
  }
}

export const mutations = {
  setItems (state, { items }) {
    state.items = items
  },

  add (state, { item }) {
    state.items.push(item)
  },

  done (state, { item, done }) {
    item.done = done
  },

  setId (state, { item, id }) {
    item.id = id
  },

  remove (state, { itemToRemove }) {
    state.items = state.items.filter((item) => {
      return item.id !== itemToRemove.id
    })
  },

  setFilter (state, { filter }) {
    state.filter = filter
  }
}

export const actions = {
  async loadAllItems ({ commit, state }) {
    const items = await api.findAll({ filter: state.filter })

    commit('setItems', { items })
  },

  async addItem ({ commit }, { item }) {
    commit('add', { item })

    let addedItem = await api.save({
      title: item.title,
      done: false
    })

    commit('setId', { item, id: addedItem.id })
  },

  async save ({ commit, state }, { item }) {
    return api.save({
      id: item.id,
      title: item.title,
      done: item.done
    })
  }
}
