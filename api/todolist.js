import localforage from 'localforage'

export const FILTER_ALL = 'all'
export const FILTER_OPEN = 'open'
export const FILTER_CLOSED = 'closed'

const VERSION = 'v7'

const itemStorage = localforage.createInstance({
  name: `items_${VERSION}`
})

export async function save (item) {
  let id = await itemStorage.getItem('id') || 1
  let items = await itemStorage.getItem('items') || {}

  if (!item.id) {
    item.id = id++
  }

  items[item.id] = item

  await itemStorage.setItem('id', id)
  await itemStorage.setItem('items', items)

  return item
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

export async function remove (item) {
  let items = await itemStorage.getItem('items') || {}

  delete items[item.id]

  await itemStorage.setItem('items', items)

  return item
}
