<template>
  <div class="container-fluid">
    <h1>Meine Aufgaben</h1>

    <div class="row">
      <div class="col">
        <div class="row align-items-center justify-content-between pb-3">
          <div class="col-auto">
            <h2>
              <small>
                {{ items.length }} <span v-if="items.length == 1">Aufgabe</span><span v-else>Aufgaben</span>
              </small>
            </h2>
          </div>
          <div class="col-auto">
            <ul class="nav nav-pills">
              <li class="nav-item">
                <nuxt-link to="/filter/all" class="nav-link" active-class="active">Alle</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link to="/filter/open" class="nav-link" active-class="active">Offen</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link to="/filter/closed" class="nav-link" active-class="active">Geschlossen</nuxt-link>
              </li>
            </ul>
          </div>
          <div class="col-auto">
            <button class="btn btn-primary btn-sm" @click="add">Neue Aufgabe</button>
          </div>
        </div>

        <ul class="list-unstyled">
          <li v-for="item in items" :key="item.id">
            <todo-item :item="item" @done="done(item)"/>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from '~/components/TodoItem.vue'
import {mapState, mapGetters} from 'vuex'

export default {
  components: {
    TodoItem
  },

  computed: {
    ...mapState(['items', 'filter']),
    ...mapGetters(['openItems'])
  },

  watch: {
    '$route': 'routeChange'
  },

  methods: {
    routeChange () {
      this.setFilter(this.$route.params.filter)
    },

    async setFilter (filter) {
      this.$store.commit('setFilter', { filter })
      return this.$store.dispatch('loadAllItems')
    },

    async done (item) {
      this.$store.commit('done', { item, done: !item.done })

      return this.$store.dispatch('save', { item })
    },

    async add () {
      const item = {
        title: 'Test',
        done: false
      }

      this.$store.commit('add', { item })

      return this.$store.dispatch('save', { item })
    }
  },

  async created () {
    if (process.browser) {
      this.$store.commit('setFilter', { filter: this.$route.params.filter })
      return this.$store.dispatch('loadAllItems')
    }
  }
}
</script>

<style>
</style>
