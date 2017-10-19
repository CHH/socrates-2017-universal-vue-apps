import localforage from 'localforage'

export const FILTER_ALL = 'all'
export const FILTER_OPEN = 'open'
export const FILTER_CLOSED = 'closed'

const VERSION = 'v5'

const itemStorage = localforage.createInstance({
  name: `items_${VERSION}`
})

export async function save (item) {
  let id = await itemStorage.getItem('id') || 1
  let items = await itemStorage.getItem('items') || {}

  if (typeof item.id === 'undefined') {
    item.id = id++
  }

  items[item.id] = item

  await itemStorage.setItem('id', id)
  return itemStorage.setItem('items', items)
}

export async function findAll ({ filter }) {
  let items = Object.values(await itemStorage.getItem('items') || {})

  if (filter === 'open') {
    items = items.filter((item) => {
      return !item.done
    })
  } else if (filter === 'closed') {
    items = items.filter((item) => {
      return item.done
    })
  }

  return items
}
