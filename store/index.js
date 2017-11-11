import * as api from '~/api/todolist'
import { SET_ITEMS, ADD_ITEM, DONE, UPDATE_ITEM, REMOVE_ITEM, SET_FILTER } from './mutation-types'

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
  [SET_ITEMS] (state, { items }) {
    state.items = items
  },

  [ADD_ITEM] (state, { item }) {
    state.items.push(item)
  },

  [DONE] (state, { item, done }) {
    item.done = done

    // Remove item from the current list if the item is closed and viewing only open items
    // or the item is re-opened and viewing only closed items
    if ((item.done && state.filter === 'open') || (!item.done && state.filter === 'closed')) {
      state.items = state.items.filter((it) => {
        return it !== item
      })
    }
  },

  [UPDATE_ITEM] (state, { item, props }) {
    const items = [...state.items]
    const index = state.items.indexOf(item)
    items[index] = {...item, ...props}

    state.items = items
  },

  [REMOVE_ITEM] (state, { item }) {
    state.items = state.items.filter(it => it !== item)
  },

  [SET_FILTER] (state, { filter }) {
    state.filter = filter
  }
}

export const actions = {
  async refresh ({ commit, state }) {
    const items = await api.findAll({ filter: state.filter })

    commit(SET_ITEMS, { items })
  },

  async addItem ({ commit }, { item }) {
    commit(ADD_ITEM, { item })

    let addedItem = await api.save({
      title: item.title,
      done: false
    })

    commit(UPDATE_ITEM, {item, props: {id: addedItem.id}})
  },

  async removeItem ({ commit }, { item }) {
    commit(REMOVE_ITEM, { item })
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
