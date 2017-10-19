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

    // Remove item from the current list if the item is closed and viewing only open items
    // or the item is re-opened and viewing only closed items
    if ((item.done && state.filter === 'open') || (!item.done && state.filter === 'closed')) {
      state.items = state.items.filter((it) => {
        return it !== item
      })
    }
  },

  update (state, { item, props }) {
    const items = [...state.items]
    const index = state.items.indexOf(item)
    items[index] = {...item, ...props}

    state.items = items
  },

  remove (state, { item }) {
    state.items = state.items.filter(it => it !== item)
  },

  setFilter (state, { filter }) {
    state.filter = filter
  }
}

export const actions = {
  async refresh ({ commit, state }) {
    const items = await api.findAll({ filter: state.filter })

    commit('setItems', { items })
  },

  async addItem ({ commit }, { item }) {
    commit('add', { item })

    let addedItem = await api.save({
      title: item.title,
      done: false
    })

    commit('update', {item, props: {id: addedItem.id}})
  },

  async removeItem ({ commit }, { item }) {
    commit('remove', { item })
    return api.remove(item)
  },

  async saveItem ({ commit, state }, { item }) {
    return api.save({
      id: item.id,
      title: item.title,
      done: item.done
    })
  }
}
